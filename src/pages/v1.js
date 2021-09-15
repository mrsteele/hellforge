import raw from 'lib/raw'
import ListApi from 'components/ListApi'
import Markdown from 'components/Markdown'
import PageMarkdown from 'mdcontent/v1.md'
import { typeDefs } from 'pages/api/v1/graphql'
import { convertTypesToModels } from 'lib/transforms'
import Model from 'components/Model'
import { Note, Text } from '@geist-ui/react'
import Link from 'components/Link'

const Page = ({ files, types }) => (
  <div>
    <Note type='error'>These are raw values from Blizzard. Please use the <Link href='/v2'>v2 api</Link> for a more advanced API.</Note>
    <Markdown>{PageMarkdown}</Markdown>
    <Text h3>GraphQL Models</Text>
    {types.map(type => <Model key={type.name} {...type} />)}
    <Text h3>REST routes</Text>
    <ListApi items={files} />
  </div>
)

export default Page

export async function getStaticProps(context) {

  const types = convertTypesToModels(typeDefs)
  
  return {
    props: {
      types,
      files: Object.keys(raw).map(r => ({
        path: `/v1/${r}`
      }))
    }, // will be passed to the page component as props
  }
}
