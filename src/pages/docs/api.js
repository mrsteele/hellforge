import getConfig from 'next/config'
import ListApi from 'components/ListApi'

export default ({ files, files2 }) => (
  <div>
    <h2>v1 API</h2>
    
    <p>These are raw from the tables provided by Blizzard.</p>
    <ListApi items={files} />
  </div>
)

export async function getServerSideProps(context) {
  return {
    props: {
      files: getConfig().serverRuntimeConfig.files.map(path => ({
        path: `/${path}`
      }))
    }, // will be passed to the page component as props
  }
}
