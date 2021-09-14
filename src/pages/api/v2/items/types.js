import fetch from 'lib/fetch'

const clean = (arr = []) => ([...new Set(arr.filter(a => !a))])

const getBodyLocale = (l) => l || null

const getClass = (id) => id || null

const transform = (i) => ({
  id: i.Code,
  name: i.ItemType,
  // parents: clean([i.Equiv1, i.Equiv2]),
  isRepairable: i.Repair === "1",
  isWearable: i.Body === "1" ? clean([
    getBodyLocale(i.BodyLoc1),
    getBodyLocale(i.BodyLoc2)
  ]) : [],
  isShootable: i.Shoots === "1", // knives
  quiver: i.Quiver === "1",
  isThrowable: i.Throwable === "1",
  isStackable: i.Reload === "1",
  autoReloads: i.ReEquip === "1",
  autoStacks: i.AutoStack === "1",
  spawnTypes: clean([
    i.Magic === '1' ? 'magic' : '',
    i.Rare === '1' ? 'rare' : ''
  ]),
  isCharm: i.Charm === '1',
  isInsertable: i.Gem === '1',
  isBeltable: i.Beltable === '1',
  sockets: [
    parseInt(i.MaxSock1),
    parseInt(i.MaxSock25),
    parseInt(i.MaxSock40)
  ],
  isInTreasureClass: i.TreasureClass === '1',
  characterMods: getClass(i.StaffMods),
  useSpecialCostFormula: i.CostFormula === '1',
  classSpecific: getClass(i.Class),
  // inventoryImageVariantsCount: parseInt(i.VarInvGfx) || 0,
  inventoryGraphics: clean([
    i.InvGfx1,
    i.InvGfx2,
    i.InvGfx3,
    i.InvGfx4,
    i.InvGfx5,
    i.InvGfx6
  ]),
  storePage: i.StorePage
})

const resolve = (items = []) => {
  // iterate over everyone and look for parents...
  // if a parent is found, spread over it maybe?
  return items
}

export default async function handler(req, res) {
  // all items
  const data = await fetch(`/api/v1/itemtypes`)

  res.status(200).json(resolve(data.map(transform)))
}
