import { Snippet, Card, Table, Text, Link } from '@geist-ui/react'

const nameify = (name) => name

const basicTypes = [
  'ID',
  'Boolean',
  'String',
  'Int'
]

const renderAction = (value, rowData, index) => {
  if (!value || basicTypes.indexOf(value) !== -1) {
    return value
  } else {
    return (
      <Link color href={`#${nameify(value)}`}>{value}</Link>
    )
  }
}

const Model = ({ name, description, route, fields, graphql }) => {
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
        <Table.Column width={200} prop="name" label="Name" />
        <Table.Column width={100} prop="type" label="type" render={renderAction} />
        <Table.Column prop="description" label="description" />
      </Table>
    </Card>
  )
}

export default Model