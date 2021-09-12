const fs = require('fs/promises')
const path = require('path')
const csv = require('async-csv')

const getDir = (relative) => path.resolve(__dirname, relative)

const buildDir = '../public'

// disabling for now...
const idsByFile = {
  // charstats: 'class',
  // difficultylevels: 'Name',
  // elemtypes: 'Code',
  // events: 'event',
  // experience: 'Level',
  // gems: 'code',
  // inventory: 'class',
  // itemstatcost: 'Stat', // ['Stat', ID'] : can we do an array here? That way we can have multiples...
  // levels: 'Id',
}

const fileNameCleaner = (name) => (name || 'BLANK')
  .split(' ').join('-')
  .split('/').join('-')
  .split('?').join('-')
  .split('#').join('-')
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
    const files = await fs.readdir(getDir('../d2files'))

    for (const file of files) {
      const rawContents = await fs.readFile(getDir(`../d2files/${file}`), 'utf8')
      const data = await csv.parse(rawContents, {
        delimiter: '\t',
        columns: true
      })

      db[fileNameCleaner(path.parse(file).name)] = data
    }
  } catch (err) {
    console.error(err)
  }

  // delete everything to start...
  try {
    await fs.rmdir(getDir(buildDir), {
      recursive: true
    })
  } catch (err) {
    console.log('err', err)
    // first time
  }

  // setup directory
  await mkdir(buildDir)
  await mkdir(`${buildDir}/api`)

  // dump the data
  const allFileNames = []
  const filenames = Object.keys(db)
  for (let i = 0; i < filenames.length; i++) {
    const filename = filenames[i]
    const data = db[filename]
    allFileNames.push(`${filename}.json`)
    await fs.writeFile(getDir(`${buildDir}/api/${filename}.json`), JSON.stringify(data, null, 2))

    const id = idsByFile[filename]
    if (id) {
      await mkdir(`${buildDir}/api/${filename}`)
      for (let j = 0; j < data.length; j++) {
        const subfile = `${filename}/${fileNameCleaner(data[j][id])}`
        allFileNames.push(`${subfile}.json`)
        await fs.writeFile(getDir(`${buildDir}/api/${subfile}.json`), JSON.stringify(data[j], null, 2))
      }
    }
  }

  // copy files...
  try {
    await fs.writeFile(path.resolve(__dirname, buildDir, '../', 'next.config.js'), `module.exports = {
      serverRuntimeConfig: {
        files: ${JSON.stringify(allFileNames)}
      }
    }
`)
  } catch (err) {
    console.error(err)
  }
}

run()
