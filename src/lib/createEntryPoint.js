import raw from 'lib/raw'

const createEntryPointHandler = (v1key, transform) => {
  const file = raw[v1key]
  return async function handler(req, res) {
    const [ id ] = req.query?.slug || []

    try {
      if (id) {
        return res.status(200).json(transform(id, file[id]))
      } else {
        res.status(200).json(Object.entries(file).reduce((all, row) => {
          const [ id, value ] = row
          all.push(transform(id, value))
          return all
        }), [])
      }
    } catch (err) {
      res.status(404).json({ error: 'Not Found' })
    }
  }
}

export default createEntryPointHandler
