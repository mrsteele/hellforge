import { Card } from '@geist-ui/react'

const Container = ({ style, ...props} ) => (
  <Card type='lite' style={{
    maxWidth: '1024px',
    marginLeft: 'auto',
    marginRight: 'auto',
    ...(style || {})
  }} {...props} />
)

export default Container
