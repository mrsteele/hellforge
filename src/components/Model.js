import { Snippet, Fieldset, Table, Text } from '@geist-ui/react'

const Model = ({ title, description, route, properties, graphql }) => {
  return (
    <Fieldset.Group value="Model" mb={3}>
      <Fieldset label="Model">
        <Fieldset.Content>
          <Text h4>{title}</Text>
          <Text p>{description}</Text>
          {route && (
            <>
              <Text h5>Endpoint</Text>
              <Snippet symbol='' mb={2} text={`https://d2api.vercel.com/api/v2${route}`} />
            </>
          )}
          <h5>Properties</h5>
          <Table hover={false} data={properties}>
            <Table.Column prop="name" label="Name" />
            <Table.Column prop="type" label="type" />
            <Table.Column prop="description" label="description" />
          </Table>
        </Fieldset.Content>
      </Fieldset>
      {graphql && (
        <Fieldset label="GraphQL">
          <Fieldset.Content>
            <Text p>Use the following query to fetch real data</Text>
            <Snippet symbol='' text={graphql.split('\n')} block />
          </Fieldset.Content>
        </Fieldset>
      )}
    </Fieldset.Group>
  )
}

export default Model