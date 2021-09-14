import raw from 'lib/raw'
import ListApi from 'components/ListApi'
import Markdown from 'components/Markdown'
import PageMarkdown from 'mdcontent/v1.md'

const Page = ({ files }) => (
  <div>
    <Markdown>{PageMarkdown}</Markdown>
    <ListApi items={files} />
  </div>
)

export default Page

export async function getServerSideProps(context) {
  return {
    props: {
      files: Object.keys(raw).map(r => ({
        path: `/v1/${r}`
      }))
    }, // will be passed to the page component as props
  }
}
