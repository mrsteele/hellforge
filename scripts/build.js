import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import csv from 'async-csv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const getDir = (relative) => path.resolve(__dirname, relative)

const idsByFile = {
  charstats: 'class'
}

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
    await fs.rmdir(getDir('../dist'), {
      recursive: true
    })
  } catch (err) {
    console.log('err', err)
    // first time
  }

  // setup directory
  await mkdir('../dist')
  await mkdir('../dist/api')

  // dump the data
  const allFileNames = []
  const filenames = Object.keys(db)
  for (let i = 0; i < filenames.length; i++) {
    const filename = filenames[i]
    const data = db[filename]
    allFileNames.push(filename)
    await mkdir(`../dist/api/${filename}`)
    await fs.writeFile(getDir(`../dist/api/${filename}/index.json`), JSON.stringify(data, null, 2))

    const id = idsByFile[filename]
    if (id) {
      await mkdir(`../dist/api/${filename}`)
      for (let j = 0; j < data.length; j++) {
        const subfile = `${filename}/${data[j][id].toLowerCase()}`
        allFileNames.push(subfile)
        await fs.writeFile(getDir(`../dist/api/${subfile}`), JSON.stringify(data[j], null, 2))
      }
    }
  }

  // copy files...
  const htmlFileList = allFileNames.sort().map(filename => `
  <li>
    <a href='/api/${filename}' target='_blank'>/api/${filename}</a>
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
}

run()
