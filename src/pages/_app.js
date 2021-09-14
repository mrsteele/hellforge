import Head from 'next/head'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import Container from 'components/Container'
import GlobalHeader from 'components/GlobalHeader'
import GlobalFooter from 'components/GlobalFooter'
import './global.scss'

function MyApp({ Component, pageProps }) {
  return (
    <GeistProvider themeType='dark'>
      <CssBaseline />
      <div>
        <Head>
          <script src="https://kit.fontawesome.com/c0cb21dcb7.js" crossOrigin="anonymous" />
        </Head>
        <GlobalHeader />
        <main>
          <Container>
            <Component {...pageProps} />
          </Container>
        </main>
        <GlobalFooter />
      </div>
    </GeistProvider>
  )
}

export default MyApp
