import fetch from 'lib/fetch'

const createId = (str) => str.toLowerCase()
  .split(' ').join('')

// Source: https://d2mods.info/forum/kb/viewarticle?a=386
const transform = (row) => {
  // meta
  return {
    id: createId(row.index),
    name: row.index,
    availability: row.version,
    // enabled?
    availableOnLadder: row.ladder === 1,
    canDropMoreThanOncePerGame: !!row.nolimit,
    itemLvl: row.lvl || null,
    requiredLevel: row["lvl req"],
    type: row.code, // TODO: Map this to Weapons.txt, Armor.txt and Misc.txt
    // ALSO TODO: Maybe make an `/api/items` endpoint, then `/api/items/armor` and so on
    playerCanHoldMoreThanOne: !!row.carry1,
    price: (parseInt(row['cost mult']) * 10) + parseInt(row['cost add']), // TODO: Make this actually look up the price...
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

export default async function handler(req, res) {
  const file = await fetch(`/api/uniqueitems.json`)
  res.status(200).json(file.map(row => transform(row)))
}
