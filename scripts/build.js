import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import csv from 'async-csv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const getDir = (relative) => path.resolve(__dirname, relative)

const idsByFile = {
  charstats: 'class',
  difficultylevels: 'Name',
  elemtypes: 'Code',
  events: 'event',
  expansionstring: 'A4Q2ExpansionSuccessTyrael',
  experience: 'Level',
  gems: 'code',
  inventory: 'class',
  itemstatcost: 'Stat', // ['Stat', ID'] : can we do an array here? That way we can have multiples...
  levels: 'Id',

}

const fileNameCleaner = (name) => (name || 'BLANK')
  .split(' ').join('-')
  .split('/').join('-')
  .toLowerCase()

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

      db[fileNameCleaner(path.parse(file.name).name)] = data
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
    allFileNames.push(`${filename}.json`)
    await fs.writeFile(getDir(`../dist/api/${filename}.json`), JSON.stringify(data, null, 2))

    const id = idsByFile[filename]
    if (id) {
      await mkdir(`../dist/api/${filename}`)
      for (let j = 0; j < data.length; j++) {
        const subfile = `${filename}/${fileNameCleaner(data[j][id])}`
        allFileNames.push(`${subfile}.json`)
        await fs.writeFile(getDir(`../dist/api/${subfile}.json`), JSON.stringify(data[j], null, 2))
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
