import { Text, Progress, Card } from '@geist-ui/react'

const ProgressBlock = ({ value }) => (
  <Card mb={2}>
    <Text>Progress</Text>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Progress value={value} />
      <Text small ml={1}>Complete</Text>
    </div>
  </Card>
)

export default ProgressBlock
