import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
  type Query {
    getUniques: [Unique]
    getUnique(id: ID!): Unique!
    getItemTypes: [ItemType]
    getItemType(id: ID!): ItemType!
    getCharacters: [Character]
    getCharacter(id: ID!): Character!
    getColors: [Color]
    getColor(id: ID!): Color!
  }

  type Color {
    id: ID
    name: String
    code: String
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
    colorCharacter: Color
    colorInventory: Color
    gfxGround: String
    gfxInventory: String
    soundDrop: String
    soundDropframe: Int
    soundUse: String
    Rarity: String
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

  type Character {
    id: ID
    name: String
    str: Int
    dex: Int
    int: Int
    vit: Int
    stamina: Int
  }
`
