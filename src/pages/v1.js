import raw from 'lib/raw'
import ListApi from 'components/ListApi'
import Markdown from 'components/Markdown'
import PageMarkdown from 'mdcontent/v1.md'
import { typeDefs } from 'pages/api/v1/graphql'
import { convertTypesToModels } from 'lib/transforms'
import { Note, Text } from '@geist-ui/react'
import Link from 'components/Link'
import Docs from 'components/Docs'

const Page = ({ files, types }) => (
  <div>
    <Note type='error'>These are raw values from Blizzard. Please use the <Link href='/v2'>v2 api</Link> for a more advanced API.</Note>
    <Markdown>{PageMarkdown}</Markdown>
    <Text h3>GraphQL Models</Text>
    <Docs types={types} graphqEndpoint='/api/v1/graphql' />
    <Text h3>REST routes</Text>
    <ListApi items={files} />
  </div>
)

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'v1 API',
      types: convertTypesToModels(typeDefs),
      files: Object.keys(raw).map(r => ({
        path: `/v1/${r}`
      }))
    }, // will be passed to the page component as props
  }
}
