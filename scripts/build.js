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
  await fs.copy(
    path.resolve(__dirname, '../copy'),
    path.resolve(__dirname, '../dist')
  )

  // dump the data
  const files = Object.keys(db)
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    await fs.writeFile(getDir(`../dist/api/${file}.json`), JSON.stringify(db[file]))
  }
}

run()
