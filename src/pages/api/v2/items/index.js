import fetch from 'lib/fetch'
import { itemify } from 'lib/transforms'

export default async function handler(req, res) {
  // all items
  const weapons = await fetch(`/api/v1/weapons`)
  const armor = await fetch(`/api/v1/armor`)
  const misc = await fetch(`/api/v1/misc`)

  const json = [
    ...weapons,
    ...armor,
    ...misc
  ].map(row => itemify(row))

  res.status(200).json(json)
}
