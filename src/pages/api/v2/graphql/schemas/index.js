import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
  type Query {
    getUniques: [Unique]
    getUnique(id: ID!): Unique!
    getItemTypes: [ItemType]
    getCharacters: [Character]
    getCharacter(id: ID!): Character!
  }

  type UniqueColors {
    character: String
    inventory: String
  }

  type UniqueGraphics {
    ground: String
    inventory: String
  }

  type UniqueSounds {
    drop: String
    dropframe: Int
    use: String
  }

  type UniqueOther {
    Rarity: String
  }

  type Unique {
    id: ID
    name: String
    availability: Int
    availableOnLadder: Boolean
    canDropMoreThanOncePerGame: Boolean
    itemLvl: Int
    requiredLevel: Int
    type: String
    playerCanHoldMoreThanOne: Boolean
    price: Int
    colors: UniqueColors
    graphics: UniqueGraphics
    sounds: UniqueSounds
    other: UniqueOther
  }

  "Any base item. This model is inherited by every item in the game."
  type ItemType {
    "A unique identifier."
    id: ID
    name: String
    isRepairable: Boolean
    isWearable: [String]
    isShootable: Boolean
    quiver: Boolean
    isThrowable: Boolean
    isStackable: Boolean
    autoReloads: Boolean
    autoStacks: Boolean
    sockets: [Int]
    isInTreasureClass: Boolean
    characterMods: Character
    useSpecialCostFormula: Boolean
    classSpecific: Character
    inventoryGraphics: [String]
    storePage: String
  }

  type CharacterStats {
    str: Int
    dex: Int
    int: Int
    vit: Int
  }

  type Character {
    id: ID
    name: String
    stats: CharacterStats
    stamina: Int
  }
`

const transform = (i) => ({
  id: ids[i.class],
  stats: {
    str: i.str,
    dex: i.dex,
    int: i.int,
    vit: i.vit
  },
  stamina: i.stamina
  // TODO: FINISH!
})
