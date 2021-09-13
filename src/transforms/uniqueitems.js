// Source: https://d2mods.info/forum/kb/viewarticle?a=386
const transform = (row) => {
  const ret = {}

  const flags = []
  
  // meta
  return {
    id: row.index,
    availability: row.version,
    // enabled?
    availableOnLadder: row.ladder === 1,
    canDropMoreThanOncePerGame: !!row.nolimit,
    itemLvl: row.lvl,
    requiredLevel: row["lvl req"],
    type: row.code, // TODO: Map this to Weapons.txt, Armor.txt and Misc.txt
    // ALSO TODO: Maybe make an `/api/items` endpoint, then `/api/items/armor` and so on
    playerCanHoldMoreThanOne: !!row.carry1,
    
    other: {
      Rarity: row.rarity
    }
  }
}

module.exports = transform
