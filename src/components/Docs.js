import { useState, useEffect } from 'react'
import Model from 'components/Model'
import { Drawer, Textarea, Button } from '@geist-ui/react'
import { graphql } from 'lib/fetch'

const safeVals = [
  'Int',
  'String',
  'Boolean',
  'ID'
]

const Docs = ({ types, graphqEndpoint }) => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [textarea, setTextarea] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState('')

  useEffect(() => {
    setResults('')
  }, [textarea])

  const handler = (e) => {
    setResults('')
    setTextarea(e.target.value)
  }

  const testGraphql = (val, name) => {
    const findType = types.find(type => type.name === name)
    setTextarea(`{
      ${val} {${findType.fields.filter(v => safeVals.indexOf(v.type) !== -1).map(v => `
        ${v.name}`).join('')}
      }
}`)
    setShowDrawer(true)
  }

  const startRequest = async () => {
    setLoading(true)
    const data = await graphql(graphqEndpoint, textarea)
    setResults(JSON.stringify(data, null, 2))
    setLoading(false)
  }

  return (
    <div>
      {types.map((type, idx) => <Model query={idx === 0 && testGraphql} key={type.name} {...type} />)}
      <Drawer visible={showDrawer} onClose={() => setShowDrawer(false)} placement="right">
        <Drawer.Title>GraphQL Test</Drawer.Title>
        <Drawer.Subtitle>Use this to test GraphQL requests</Drawer.Subtitle>
        <Drawer.Content>
          <Textarea
            value={textarea}
            onChange={handler}
            placeholder="Please enter a description."
            height={10}
            width='100%'
          />
          <Button type='success' width='100%' block loading={loading} onClick={startRequest}>Go!</Button>
          {results && (
            <Textarea width='100%' height={10} readOnly value={results} />
          )}
        </Drawer.Content>
      </Drawer>
    </div>
  )
}

export default Docs
