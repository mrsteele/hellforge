import fetch from 'lib/fetch'

export default async function handler(req, res) {
  const { id } = req.query
  console.log('getting specific id', id)
  const file = await fetch(`/api/v2/characters`)

  const find = file.find(item => item.id === id)

  res.status(200).json(find)
}
