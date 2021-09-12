import styles from './index.module.scss'
import Head from 'next/head'
import fs from 'fs/promises'
import path from 'path'

export default ({ files }) => (
  <div className={styles.wrapper}>
    <Head>
      <script src="https://kit.fontawesome.com/c0cb21dcb7.js" crossorigin="anonymous" />
    </Head>
    <header>
      <div className={`${styles.container} ${styles.flex}`} style={{justifyContent: 'space-between'}}>
        <h1>D2(R) API <small>(Unofficial)</small></h1>
        <div>
          <a href='https://github.com/mrsteele/d2api' target='_blank'>
            <i className="fab fa-github"></i>
          </a>
          <a href='https://twitter.com/matt_r_steele' target='_blank'>
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </header>
    <main className={styles.container}>

      <h2>About</h2>
  
      <p>This is a fan-made Diablo 2 API. It should be mostly compatible with D2R, however we are currently a patch behind.</p>
  
      <h2>Inspiration</h2>
  
      <p>Looking all over the web, there are plenty of D2 databases, wikis and fan sites that have information about the game, but with Blizzard pushing D2R out soon and with patches on the way I imagine the data on those sites will soon be out of date.</p>
  
      <p>I'm hopeful that we can create a service that would be easy to maintain and thorough to provice these other websites with information that is centralized to what the latest patch information displays.</p>
  
      <p>If you have any ideas, comments or suggestions feel free to contact me on <a href='https://twitter.com/matt_r_steele' target='_blank'>Twitter</a> or check out this repository on <a href='https://github.com/mrsteele/d2api' target='_blank'>Github</a>.</p>
      
      <h2>Routes</h2>
  
      <p>
        The following route exist and should provide information regarding the current patch (currently we are using v1.13).
      </p>

      <h3>raw</h3>
      
      <p>These are raw from the tables provided by Blizzard.</p>
      <ul>
        {files.map(file => (
        <li>
          <a href={`/api/${file}`} target='_blank'>/api/{file}</a>
        </li>
        ))}
      </ul>

      <h3>v2</h3>

      <p>These have been translated into something more human-readable.</p>
      <ul>
        <li>links 2 here</li>
      </ul>
  
      <h2>Legal/Disclaimer</h2>
  
      <p>All the data comes from <em>Blizzard Entertainment</em> and belongs to them. I just wrote the script that scrubs that data.</p>
  
      <p>Code is from me and anyone who desires to <a href='https://github.com/mrsteele/d2api' target='_blank'>contribute</a>. The code is currently just using v1.13, and it is not complete but wouldn't mind a few more contributors.</p>
    </main>
  </div>
)

export async function getServerSideProps(context) {
  const root = __dirname.split('.next')[0]
  console.log('root', root)
  const files = await fs.readdir(path.resolve(root, 'public/api'))
  console.log('files', files)

  return {
    props: {
      files
    }, // will be passed to the page component as props
  }
}
