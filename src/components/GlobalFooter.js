import Container from 'components/Container'
import { Divider, Text, Link } from '@geist-ui/react'

const GlobalFooter = () => (
  <>
    <Divider />
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Text type='secondary' mr={3} small>Copyright &copy; {new Date().getFullYear()} Matthew Steele.</Text>
        <div>
          <Link href='https://github.com/mrsteele/hellforge' target='_blank' rel="noreferrer">
            <i className="fab fa-github"></i>
          </Link>
          <Link ml={1} href='https://twitter.com/matt_r_steele' target='_blank' rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </Link>
        </div>
      </div>
    </Container>
  </>
)

export default GlobalFooter
