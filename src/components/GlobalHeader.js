import { Divider, Text, Badge, Tabs } from '@geist-ui/react'
import Container from './Container'
import { useRouter } from 'next/router'
import Image from 'next/image'

const GlobalHeader = () => {
  const router = useRouter()
  return (
    <>
      <Container>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Image height={50} width={50} src='/img/logo-red-transparent.png' alt="D2(R) API Logo" />
          <Text style={{ fontSize: '1.75em', margin: '0 0.5em 0 0.5em' }}>
            Hellforge
            <Badge ml={1} type='error' >alpha</Badge>
          </Text>
        </div>
      </Container>
      <div style={{ backgroundColor: '#000', position: 'sticky', top: '0', zIndex: '1' }}>
        <Container style={{backgroundColor: 'transparent'}}>
          <Tabs pb={0} style={{backgroundColor: 'transparent'}} hideDivider initialValue={router.route} onChange={val => router.push(val)}>
            <Tabs.Item label='Home' value='/' />
            <Tabs.Item label='Raw API (v1)' value='/v1' />
            <Tabs.Item label='Advanced API (v2)' value='/v2' />
          </Tabs>
        </Container>
        <Divider style={{marginTop: '-1.75em'}} />
      </div>
    </>
  )
}

export default GlobalHeader
