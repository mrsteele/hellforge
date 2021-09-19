import { useEffect } from 'react'
import Head from 'next/head'
import { GeistProvider, CssBaseline } from '@geist-ui/react'
import Container from 'components/Container'
import GlobalHeader from 'components/GlobalHeader'
import Script from 'next/script'
import { useRouter } from 'next/router'
import GlobalFooter from 'components/GlobalFooter'
import './global.scss'

function MyApp({ Component, pageProps }) {
  const title = (pageProps.title || 'Stay a while and listen') + ' - Diablo 2 Hellforge API'
  const router = useRouter()

  const isProduction = process.env.NODE_ENV === 'production'

  useEffect(() => {
    if (isProduction) {
      const handleRouteChange = (url) => {
        window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
          page_path: url,
        })
      }
      //When the component is mounted, subscribe to router changes
      //and log those page views
      router.events.on('routeChangeComplete', handleRouteChange)
  
      // If the component is unmounted, unsubscribe
      // from the event with the `off` method
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [router.events])

  return (
    <GeistProvider themeType='dark'>
      <CssBaseline />
      <div>
        <Script src="https://kit.fontawesome.com/c0cb21dcb7.js" crossOrigin="anonymous" />
        {isProduction && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `,
              }}
            />
          </>
        )}
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
