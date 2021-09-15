import PageData from 'mdcontent/homepage.md'
import Markdown from 'components/Markdown'
import { Note, Text } from '@geist-ui/react'

const Page = () => (
  <>
    <Text h1>Welcome to the first unnoficial Diablo 2 API!</Text>
    <Text>
      I have been working on creating this service to better centralize all the moving parts of the Diablo 2 database.
      With Diablo 2 Resurrected release on the horizon, I am hopeful that updates can be maintained here and propogated out to other web services.
    </Text>
    <Note type='warning' mb={3}>
      This is currently in an <Text b>alpha</Text> state. I am working actively to try and get the database settled as my main priority.
      There are many changes happening so the data is not stable yet. It might be best to export data you need for now.</Note>
    <Markdown>
      {PageData}
    </Markdown>
  </>
)

export default Page
