import { ApolloServer } from "apollo-server-micro"
import { typeDefs } from "./schemas"
import { resolvers } from "./resolvers"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers
// })

export const config = {
  api: {
    bodyParser: false
  }
}

// export default apolloServer.createHandler({ path: "/api/graphql" })
// export default async function handler(req, res) {
//   await apolloServer.start()
//   await apolloServer.createHandler({
//     path: "/api/graphql"
//   })(req, res)
// }
const handler = apolloServer.createHandler({ path: '/api/graphql'})

export default handler
