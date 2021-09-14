import ListApi from 'components/ListApi'
import Model from 'components/Model'
import fetch from 'lib/fetch'
import Markdown from 'components/Markdown'
import PageContent from 'mdcontent/v2.md'
import { typeDefs } from 'pages/api/v2/graphql/schemas'

const Page = ({ files, types }) => (
  <div>
    <Markdown>{PageContent}</Markdown>

    {types.map(type => <Model key={type.name} {...type} />)}

    <h3>Routes</h3>
    <ListApi items={files} />

  </div>
)

export default Page

// HELPERS
const getTypeDescription = (description) => description?.value || null
const getTypeType = (type) => {
  const t = type?.name?.value

  if (t?.kind === 'ObjectTypeDefinition') {
    return t.name.value
  }

  return t || null
}

export async function getStaticProps(context) {
  const uniqueitems = await fetch('/api/v2/items/unique')

  // USE THIS TO DO THE GRAPHQL!
  // console.log('typeDefs', typeDefs.definitions)

  // console.log('TEST', typeDefs.definitions[1])
  // console.log('getType', getTypeType(typeDefs.definitions[0].fields[0].type))

  const types = typeDefs.definitions.reduce((all, type) => {
    // console.log(getTypeType(type.fields.map(field => field.type)).filter(field => field.toString() !== field))
    all.push({
      description: getTypeDescription(type.description),
      name: type.name.value,
      fields: type.fields.map(field => ({
        name: field.name.value,
        description: getTypeDescription(field.description),
        type: getTypeType(field.type)
      }))
    })

    return all
  }, [])
  
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
        path: '/v2/items/unique',
        items: uniqueitems.map(item => ({
          path: `/v2/items/unique/${item.id}`
        }))
      }]
    }, // will be passed to the page component as props
  }
}
