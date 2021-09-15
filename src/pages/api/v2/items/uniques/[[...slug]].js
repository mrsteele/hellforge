// import raw from 'lib/raw'
// import { transform } from '.'

// export default async function handler(req, res) {
//   const { id } = req.query
//   const file = raw[`uniqueitems`]

//   res.status(200).json(transform(file[id]))
// }

import createEntryPointHandler from "lib/createEntryPoint"

export const transform = (row) => ({
  name: row.index,
  availability: row.version,
  // enabled?
  ladderOnly: row.ladder === 1,
  dropOnce: !row.nolimit,
  itemLvl: row.lvl || null,
  requiredLevel: row["lvl req"] || null,
  type: row.code, // TODO: Map this to Weapons.txt, Armor.txt and Misc.txt
  // ALSO TODO: Maybe make an `/api/items` endpoint, then `/api/items/armor` and so on
  onlyCarryOne: !!row.carry1,
  price: (row['cost mult'] * 10) + row['cost add'], // TODO: Make this actually look up the price...
  colorCharacter: row.chrtransform,
  colorInventory: row.invtransform,
  gfxGround: row.flippyfile,
  gfxInventory: row.invfile,
  soundDrop: row.dropsound,
  soundDropframe: row.dropsfxframe,
  soundUse: row.usesound,

  // TODO:
  // props, par, min and max
  
  Rarity: row.Rarity
})

export default createEntryPointHandler('uniqueitems', transform)
