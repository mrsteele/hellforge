import Head from 'next/head'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import Container from 'components/Container'
import GlobalHeader from 'components/GlobalHeader'
import Script from 'next/script'
import GlobalFooter from 'components/GlobalFooter'
import './global.scss'

function MyApp({ Component, pageProps }) {
  const title = (pageProps.title || 'Stay a while and listen') + ' - Diablo 2 Hellforge API'

  return (
    <GeistProvider themeType='dark'>
      <CssBaseline />
      <div>
        <Script src="https://kit.fontawesome.com/c0cb21dcb7.js" crossOrigin="anonymous" />
        <GlobalHeader />
        <main>
          <Head>
            <title>{title}</title>
            <meta property="og:title" content={title} key="title" />
          </Head>
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
