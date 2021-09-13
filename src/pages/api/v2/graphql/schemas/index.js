import {gql} from 'apollo-server-micro'

export const typeDefs = gql`
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
  
  type Query {
    getUniques: [Unique]
    getUnique(id: ID!): Unique!
  }
`
