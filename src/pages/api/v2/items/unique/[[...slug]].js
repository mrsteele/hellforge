// import raw from 'lib/raw'
// import { transform } from '.'

// export default async function handler(req, res) {
//   const { id } = req.query
//   const file = raw[`uniqueitems`]

//   res.status(200).json(transform(file[id]))
// }

import createEntryPointHandler from "lib/createEntryPoint"

export const transform = (id, row) => {
  // meta
  return {
    id,
    name: row.index,
    availability: row.version,
    // enabled?
    availableOnLadder: row.ladder === 1,
    canDropMoreThanOncePerGame: !!row.nolimit,
    itemLvl: row.lvl || null,
    requiredLevel: row["lvl req"] || null,
    type: row.code, // TODO: Map this to Weapons.txt, Armor.txt and Misc.txt
    // ALSO TODO: Maybe make an `/api/items` endpoint, then `/api/items/armor` and so on
    playerCanHoldMoreThanOne: !!row.carry1,
    price: (row['cost mult'] * 10) + row['cost add'], // TODO: Make this actually look up the price...
    colors: {
      character: row.chrtransform,
      inventory: row.invtransform
    },
    graphics: {
      ground: row.flippyfile,
      inventory: row.invfile
    },
    sound: {
      drop: row.dropsound,
      dropframe: row.dropsfxframe,
      use: row.usesound
    },

    // TODO:
    // props, par, min and max
    
    other: {
      Rarity: row.rarity
    }
  }
}

export default createEntryPointHandler('uniqueitems', transform)
