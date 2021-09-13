import getConfig from 'next/config'
import ListApi from 'components/ListApi'
import raw from 'lib/raw'

const Page = ({ files, files2 }) => (
  <div>
    <h2>v1 API</h2>
    
    <p>These are raw from the tables provided by Blizzard.</p>
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
