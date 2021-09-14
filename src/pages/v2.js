import ListApi from 'components/ListApi'
import Model from 'components/Model'
import fetch from 'lib/fetch'
import Markdown from 'components/Markdown'
import PageContent from 'markdown/v2.md'
// import { typeDefs } from 'pages/api/v2/graphql/schemas'

const models = [{
  title: 'Range',
  description: 'A simple way to represent a range of values',
  route: false,
  properties: [{
    name: 'min',
    type: 'Number',
    description: 'The lower value.'
  }, {
    name: 'max',
    type: 'Number',
    description: 'The higher value.'
  }]
}, {
  title: 'ItemProperty',
  description: 'An individual property that can be added to magical items.',
  route: '/items/properties(/:id)',
  properties: [{
    name: 'id',
    type: 'String',
    description: 'The unique identifier to represent the item property.'
  }, {
    name: 'display',
    type: 'String',
    description: 'The label as it shows up on the item. Underscore is replaced with the value'
  }, {
    name: 'num1',
    type: 'Range',
    description: 'The first value for the property.'
  }, {
    name: 'num2',
    type: 'Range',
    description: 'The second value for the property'
  }]
}]

const Page = ({ files }) => (
  <div>
    <Markdown>{PageContent}</Markdown>

    {models.map((model, idx) => <Model key={idx} {...model} />)}

    <h3>Routes</h3>
    <ListApi items={files} />

  </div>
)

export default Page

export async function getServerSideProps(context) {
  const uniqueitems = await fetch('/api/v2/items/unique')

  // USE THIS TO DO THE GRAPHQL!
  // console.log('typeDefs', typeDefs.definitions)
  
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
      files: [{
        path: '/v2/items/unique',
        items: uniqueitems.map(item => ({
          path: `/v2/items/unique/${item.id}`
        }))
      }]
    }, // will be passed to the page component as props
  }
}
