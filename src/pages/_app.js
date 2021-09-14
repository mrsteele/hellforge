import './styles.css'
import styles from './_app.module.scss'
import Head from 'next/head'
import Link from 'components/Link'

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <script src="https://kit.fontawesome.com/c0cb21dcb7.js" crossOrigin="anonymous" />
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
            <a href='https://github.com/mrsteele/d2api' target='_blank' rel="noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href='https://twitter.com/matt_r_steele' target='_blank' rel="noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
      </footer>
    </div>
  )
}

export default MyApp
