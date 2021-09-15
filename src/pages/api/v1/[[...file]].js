import raw from 'lib/raw'

export default async function handler(req, res) {
  const [file, id, bad] = req.query?.file || []

  if (bad) {
    res.status(400).json({ error: 'Not Found' })
  }

  if (!file) {
    res.json({
      subdirectories: Object.keys(raw)
    })
  }

  try {
    const data = raw[file]
    const ret = id ? data[id] : data
    return res.status(200).json(ret)
  } catch (err) {
    console.log('err', err)
    return res.status(404).json({ err })
  }
}
