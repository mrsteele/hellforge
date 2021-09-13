import Link from 'components/Link'

const Page = () => (
  <div>
    <h2>Routes</h2>
  
    <p>
      The following route exist and should provide information regarding the current patch (currently we are using v1.13).
    </p>

    <h3>v1 API</h3>

    <p>The v1 API is the first pass at converting the data files to JSON. The API Docs can be found <Link href='/docs/api'>here</Link>.</p>
  
    <h3>v2 API</h3>

    <p>This is a cleaner version, which is still a WIP and subject to change. The v2 API Docs can be found <Link href='/docs/v2'>here</Link>.</p>
  </div>
)

export default Page
