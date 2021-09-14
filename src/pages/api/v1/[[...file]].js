import raw from 'lib/raw'

export default async function handler(req, res) {
  const [file, bad] = req.query?.file || []

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
    res.status(200).json(Object.values(data))
  } catch (err) {
    return res.status(404).json({ err })
  }
}
