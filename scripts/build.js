import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import csv from 'async-csv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const getDir = (relative) => path.resolve(__dirname, relative)

const mkdir = async (path) => {
  try {
    await fs.mkdir(getDir(path))
  } catch (err) {
    // already exists 🤷‍♂️
  }
}
const run = async () => {
  // all files...
  const db = {}

  try {
    const files = await fs.opendir(getDir('../d2files'))
    for await (const file of files) {
      const rawContents = await fs.readFile(getDir(`../d2files/${file.name}`), 'utf8')
      const data = await csv.parse(rawContents, {
        delimiter: '\t',
        columns: true
      })

      db[path.parse(file.name).name.toLowerCase()] = data
    }
  } catch (err) {
    console.error(err)
  }

  // delete everything to start...
  try {
    await rmdir(getDir('../dist', {
      recursive: true
    }))
  } catch (err) {
    // first time
  }

  // setup directory
  await mkdir('../dist')
  await mkdir('../dist/api')

  // copy files...
  const filenames = Object.keys(db)
  const htmlFileList = filenames.map(filename => `
  <li>
    <a href='/api/${filename}' target='_blank'></a>
  </li>`).join('\n')
  try {
    const files = await fs.opendir(getDir('../copy'))
    for await (const file of files) {
      const rawContents = await fs.readFile(getDir(`../copy/${file.name}`), 'utf8')
      const newRawContents = rawContents.replace('{{LINKS}}', htmlFileList)

      await fs.writeFile(getDir(`../dist/${file.name}`), newRawContents)
    }
  } catch (err) {
    console.error(err)
  }

  // dump the data
  for (let i = 0; i < filenames.length; i++) {
    const file = filenames[i]
    await fs.writeFile(getDir(`../dist/api/${file}`), JSON.stringify(db[file]))
  }
}

run()
