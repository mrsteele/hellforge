import { ApolloServer } from 'apollo-server-micro'
import {gql} from 'apollo-server-micro'
import raw from 'lib/raw'

// TODO: These ones just... wont work...
const nonCompatible = [
  'chartemplate', // "Total Skills"
  'elemtypes', // "Elemental Type"
  'hitclass', // "Hit Class"
  'itemstatcost', // a few fields with spaces
  'lvlmaze', // parenthesis
  'monlvl', // TONS of bad fields
  'monname', // number field names
  'monplace', // number field names
  'monprop', // parenthesis
  'overlay', // 1ofN field
  'playerclass', // "Player Class"
  'properties', // *done
  'runes', // "Rune Name" (sad)
  'setitems', // *item and others
  'storepage', // "Store Page"
  'superuniques', // parenthesis
  'treasureclass', // "Treasure Class"
  'treasureclassex', // "Treasure Class"
  'uniqueappellation', // number field names
  'uniqueitems', // *type and other fields
  'uniqueprefix', // number field names
  'uniquesuffix', // numnber field names
  'uniquetitle', // number field names
  'weaponclass', // "gamble cost"
  'armor', // space
  'bodylocs', // "Body Location"
  'charstats', // # and numbers
  'colors', // "Transform Color"
  'cubemain', // numbers
  'cubemod', // "cube modifier type"
  'cubetype', // "cube item class"
  'events', // *
  'hiredesc', // "Hireling Description"
  'hireling', // slashes
  'lowqualityitems', // numbers
  'misc', // *
  'misscalc', // *
  'monstats', // ()
  'monstats2', // -
  'monumod', // *
  'npc', // ()
  'objects', // -
  'pettype', // space
  'shrines', // spaces
  'skillcalc', // *
  'skilldesc', // spaces
  'soundenviron', // spaces
  'sounds', // numbers
  'weapons' // spaces
]

const rawSimplified = Object.keys(raw).filter(key => nonCompatible.indexOf(key) === -1).reduce((all, key) => {
  all[key] = raw[key]
  return all
}, {})

const capitalize = (str) => str[0].toUpperCase() + str.substring(1)

const getTypeFromField = (value) => {
  if (value === true || value === false) {
    return 'Bool'
  } else if (value === value.toString()) {
    return 'String'
  } else if (value === parseInt(value)) {
    return 'Int'
  }
}

const getQueries = () => `
  ${Object.keys(rawSimplified).map(capitalize).map(key => `
  get${key}s: [${key}]
  get${key} (id: String!): ${key}!`).join('\n')}`

const getTypes = () => {

  const Types = Object.keys(rawSimplified).map(capitalize).reduce((all, Type) => {
    const sample = Object.values(rawSimplified[Type.toLowerCase()])[0]

    const ret = `type ${Type} {
      id: ID!
      ${Object.keys(sample).map(key => `
      ${key}: ${getTypeFromField(sample[key])}`).join('')}
    }
`

    return [
      ...all,
      ret
    ]
  }, [])

  return Types.join('\n\n')
}

// console.log('TTTTTTTT', `
// type Query {
//   ${getQueries()}
// }

// ${getTypes()}
// `)

export const typeDefs = gql`
type Query {
  ${getQueries()}
}

  ${getTypes()}
`

const Query = Object.keys(rawSimplified).map(capitalize).reduce((all, r) => {
  all[`get${r}s`] = () => {
    const allData = Object.keys(rawSimplified[r.toLowerCase()])
    allData.map(key => ({id: key, ...allData}))
  }
  all[`get${r}`] = (_, args) => rawSimplified[r][args.id]
  return all
}, {})

const resolvers = { Query }

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true // force graphiql
})


export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({ path: '/api/v1/graphql' })
