import { Snippet, Card, Table, Text, Link, Button } from '@geist-ui/react'

const nameify = (name) => name

const basicTypes = [
  'ID',
  'Boolean',
  'String',
  'Int'
]

const renderType = (value, rowData, index) => {
  const [open, close] = rowData.manyResults ? ['[', ']'] : ['', '']

  const ret = !value || basicTypes.indexOf(value) !== -1 ? value : (
    <Link color href={`#${nameify(value)}`}>{value}</Link>
  )

  return (
    <>
      {open}
      {ret}
      {close}
    </>
  )
}

const Model = ({ name, description, route, fields, query }) => {
  const renderName = (value, rowData, index) => {
    if (query && rowData.manyResults) {
      return <Link color underline icon title='Try it now!' onClick={(e) => {
        e.preventDefault()
        query(rowData.name, rowData.type)
      }}>{value}</Link>
    } else {
      return value
    }
  }

  return (
    <Card mb={3}>
      <a name={nameify(name)} style={{position: 'relative', top: '-80px'}} />
      <Link name={nameify(name)} href={`#${nameify(name)}`}>{name}</Link>
      <Text p>{description}</Text>
      {route && (
        <>
          <Text h5>Endpoint</Text>
          <Snippet symbol='' mb={2} text={`https://d2api.vercel.com/api/v2${route}`} />
        </>
      )}
      <h5>Properties</h5>
      <Table hover={false} data={fields}>
        <Table.Column width={200} prop="name" label="Name" render={renderName} />
        <Table.Column width={100} prop="type" label="type" render={renderType} />
        <Table.Column prop="description" label="description" />
      </Table>
    </Card>
  )
}

export default Model