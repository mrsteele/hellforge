import ListApi from 'components/ListApi'
import Model from 'components/Model'
import Markdown from 'components/Markdown'
import PageContent from 'mdcontent/v2.md'
import { typeDefs } from 'pages/api/v2/graphql/schemas'
import { convertTypesToModels } from 'lib/transforms'
import { Text } from '@geist-ui/react'

const Page = ({ files, types }) => (
  <div>
    <Markdown>{PageContent}</Markdown>

    <Text h3>GraphQL Types</Text>
    {types.map(type => <Model key={type.name} {...type} />)}

    <h3>REST Routes</h3>
    <ListApi items={files} />

  </div>
)

export default Page

export async function getServerSideProps(context) {
  // const uniqueitems = await fetch('/api/v2/items/unique')
  // const itemtypes = await fetch('/api/v2/items/types')
  // const characters = await fetch('/api/v2/characters')

  // USE THIS TO DO THE GRAPHQL!
  // console.log('typeDefs', typeDefs.definitions)

  // console.log('TEST', typeDefs.definitions[1])
  // console.log('getType', getTypeType(typeDefs.definitions[0].fields[0].type))

  const types = convertTypesToModels(typeDefs)
  
  /*
typeDefs [ { kind: 'ObjectTypeDefinition',
    description: undefined,
    name: { kind: 'Name', value: 'Query' },
    interfaces: [],
    directives: [],
    fields: [ [Object], [Object], [Object], [Object], [Object] ] },
  { kind: 'ObjectTypeDefinition',
    description: undefined,
    name: { kind: 'Name', value: 'UniqueColors' },
    interfaces: [],
    directives: [],
    fields: [ [Object], [Object] ] },
  { kind: 'ObjectTypeDefinition',
    description: undefined,
    name: { kind: 'Name', value: 'UniqueGraphics' },
    interfaces: [],
    directives: [],
    fields: [ [Object], [Object] ] },
  */

  return {
    props: {
      types,
      files: [{
        path: '/v2/items/uniques'
      }, {
        path: '/v2/items/types'
      }, {
        path: '/v2/characters'
      }]
    }, // will be passed to the page component as props
  }
}
