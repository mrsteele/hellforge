import { gql } from 'apollo-server-micro'

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

  "A table of colors"
  type Color {
    "The unique identifier"
    id: ID
    "The regular name"
    name: String
    "A short code used as a unique identifier"
    code: String
  }

  "Any unique item in the item database. Inherits from other tables."
  type Unique {
    "Unique Identifier"
    id: ID
    "The name of the unique item"
    name: String
    "Based on what the number is determines when the item became available (which patch)"
    availability: Int
    "If true, the item is a ladder-only item"
    ladderOnly: Boolean
    "Some items can only fall one time. If true, the item can only drop once per game."
    dropOnce: Boolean
    "The base item level."
    itemLvl: Int
    "If set, the item has a fixed required level for use"
    requiredLevel: Int
    "The type of item, such as weapon or armor"
    type: String
    "If true, the player can only hold one of this item"
    carryOnlyOne: Boolean
    "Determines the base price of the item"
    price: Int
    "The color when the character is wearing the item"
    colorCharacter: Color
    "The color of the item in the inventory"
    colorInventory: Color
    "When on the ground, what graphic should display"
    gfxGround: String
    "The default graphic in the inventory"
    gfxInventory: String
    "The sound effect when the item hits the ground"
    soundDrop: String
    "The frame the drop sound effect plays"
    soundDropframe: Int
    "When the item is used, the sound effect played"
    soundUse: String
    "???????"
    Rarity: String
  }

  "Any base item. This model is inherited by every item in the game."
  type ItemType {
    "A unique identifier."
    id: ID
    "The item name"
    name: String
    "Used to determine if a shop can repair the item"
    isRepairable: Boolean
    "This defines the locations an item can be worn by the player"
    isWearable: [String]
    "This represents things that are project from the item istelf (such as throwing knives)"
    isShootable: Boolean
    "Dictates whether or not the item can be used as ammo (arrows or quiver)"
    quiver: Boolean
    "The item can be thrown such as poison potions."
    isThrowable: Boolean
    "If true, the item can back stacked"
    isStackable: Boolean
    "If true, this item will automatically reload as ammo"
    autoReloads: Boolean
    "When added to your inventory, this item automatically stacks on itself"
    autoStacks: Boolean
    "The amount of sockets available between itel levels 1, 25 and 40"
    sockets: [Int]
    "A lookup for if this particular file has a record in the Treasure Class"
    inTreasureClass: Boolean
    "Whether or not special midifiers can be added to the item for class-specific items"
    characterMods: Character
    "A flag to use an alternative forumla for determining store cost"
    useCostFormula: Boolean
    "If the item is class specific, this will be set"
    classSpecific: Character
    "The graphics to use when then item is rendered in the inventory"
    inventoryGfx: [String]
    "Dictates what page the items show up on in the store"
    storePage: String
  }

  "The character class table"
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
