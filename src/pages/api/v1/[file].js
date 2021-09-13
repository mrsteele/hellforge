import csv from 'async-csv'
import raw from 'lib/raw'

export default async function handler(req, res) {
  const { file } = req.query

  const data = await csv.parse(raw[file], {
    delimiter: '\t',
    columns: true
  })

  res.status(200).json(data)
}
