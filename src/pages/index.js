import PageData from 'mdcontent/homepage.md'
import Markdown from 'components/Markdown'
import { Note, Text } from '@geist-ui/react'

const Page = () => (
  <>
    <Note type='warning'>
      This is currently in an <Text b>alpha</Text> state. I am working actively to try and get the database settled as my main priority.
      There are many changes happening so the data is not stable yet. It might be best to export data you need for now.</Note>
    <Markdown>
      {PageData}
    </Markdown>
  </>
)

export default Page
