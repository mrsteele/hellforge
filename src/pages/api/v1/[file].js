import csv from 'async-csv'
import raw from 'lib/compileTxt'
// let cache = {}

// const getFromCache = async (file) => {
//   if (!cache[file]) {
//     if (!raw[file]) {
//       console.log('HERE!')
//       throw 'File not available'
//     }
//     const data = await csv.parse(raw[file], {
//       delimiter: '\t',
//       columns: true
//     })

//     cache[file] = data
//   }

//   return cache[file]
// }

export default async function handler(req, res) {
  const { file } = req.query

  console.log('Object.keys', Object.keys(raw))

  try {
    const data = raw[file]
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ err })
  }
}
