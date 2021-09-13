import './styles.css'
import styles from './_app.module.scss'
import Head from 'next/head'
import Link from 'components/Link'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <script src="https://kit.fontawesome.com/c0cb21dcb7.js" crossorigin="anonymous" />
      </Head>
      <header>
        <div className={`container flex`} style={{justifyContent: 'space-between'}}>
          <h1><Link href='/'>D2(R) API</Link> <small>(Unofficial) <span style={{color: 'red'}}>(alpha)</span></small></h1>
          <nav>
            <Link href='/docs'>Docs</Link>
          </nav>
        </div>
      </header>
      <main className={`${styles.wrapper} container`}>
        <Component {...pageProps} />
      </main>
      <footer>
        <div className={styles.social}>
            <a href='https://github.com/mrsteele/d2api' target='_blank'>
              <i className="fab fa-github"></i>
            </a>
            <a href='https://twitter.com/matt_r_steele' target='_blank'>
              <i className="fab fa-twitter"></i>
            </a>
          </div>
      </footer>
    </div>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
