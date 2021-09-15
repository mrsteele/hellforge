import createEntryPointHandler from "lib/createEntryPoint"
import { charIdsFromCode } from 'lib/lookups'

const clean = (arr = []) => ([...new Set(arr.filter(a => !a))])

const getBodyLocale = (l) => l || null

const transform = (i) => ({
  name: i.ItemType,
  // parents: clean([i.Equiv1, i.Equiv2]),
  isRepairable: i.Repair === 1,
  isWearable: i.Body === 1 ? clean([
    getBodyLocale(i.BodyLoc1),
    getBodyLocale(i.BodyLoc2)
  ]) : [],
  isShootable: i.Shoots === 1, // knives
  quiver: i.Quiver === 1,
  isThrowable: i.Throwable === 1,
  isStackable: i.Reload === 1,
  autoReloads: i.ReEquip === 1,
  autoStacks: i.AutoStack === 1,
  spawnTypes: clean([
    i.Magic === 1 ? 'magic' : '',
    i.Rare === 1 ? 'rare' : ''
  ]),
  isCharm: i.Charm === 1,
  isInsertable: i.Gem === 1,
  isBeltable: i.Beltable === 1,
  sockets: [
    i.MaxSock1,
    i.MaxSock25,
    i.MaxSock40
  ],
  isInTreasureClass: i.TreasureClass === 1,
  characterMods: charIdsFromCode[i.StaffMods],
  useSpecialCostFormula: i.CostFormula === 1,
  classSpecific: charIdsFromCode[i.Class],
  // inventoryImageVariantsCount: i.VarInvGfx || 0,
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

export default createEntryPointHandler('itemtypes', transform)
