import raw from 'lib/raw'

const createEntryPointHandler = (v1key, transform) => {
  // the file to use
  const file = raw[v1key]

  // get all
  const getAll = () => Object.entries(file).reduce((all, row) => {
    const [ id, value ] = row
    all.push({
      id,
      ...transform(value)
    })
    return all
  }, [])

  // get one
  const get = (id) => ({
    id,
    ...transform(file[id])
  })

  // the actual function
  const ret = async function handler(req, res) {
    const [ id ] = req.query?.slug || []

    try {
      if (id) {
        return res.status(200).json(get(id))
      } else {
        return res.status(200).json(getAll())
      }
    } catch (err) {
      console.log('err', err)
      res.status(404).json({ error: 'Not Found' })
    }
  }

  // stash them here for use elsewhere
  ret.getAll = getAll
  ret.get = get

  return ret
}

export default createEntryPointHandler
