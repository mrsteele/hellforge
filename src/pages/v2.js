import ListApi from 'components/ListApi'
import Markdown from 'components/Markdown'
import PageContent from 'mdcontent/v2.md'
import { typeDefs } from 'pages/api/v2/graphql/schemas'
import { convertTypesToModels } from 'lib/transforms'
import { Text } from '@geist-ui/react'
import Docs from 'components/Docs'

const Page = ({ files, types }) => (
  <div>
    <Markdown>{PageContent}</Markdown>

    <Text h3>GraphQL Types</Text>
    <Docs types={types} graphqEndpoint='/api/v2/graphql' />

    <h3>REST Routes</h3>
    <ListApi items={files} />

  </div>
)

export default Page

export async function getStaticProps(context) {
  return {
    props: {
      title: 'v2 API',
      types: convertTypesToModels(typeDefs),
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
