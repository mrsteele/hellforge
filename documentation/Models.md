# Models

Just wanted to document some ideas on models and abstraction

## Item Types

Item Types
- White (Normal)
- Blue (Magiclal)
- Yellow (Rare)
- Green (Set)
- Gold (Unique)
- Orange (Crafted)

## Breaking it down
 
Starting at the highest level for an item database, lets break up as much as we can. Using Hero-Editor to maybe make some sense of structure

ItemProperty
- ID: ID
- label: String
- value: Int

Range
- min: Int
- max: Int

Item (Fragment)
- ID: ID
- type (ring, armor, etc...)
- name: String
- class: (amazon)?
- throwable: Boolean
- stackable: Boolean - keys, knives, etc...
- ethereal: Boolean
- socketable: Boolean
- lvl: Int
- defense: Range
- durability: Range
- graphics: {
  - inventory: [String] (maybe more than one like rings?)
}
- properties: [ItemProperty]

Weapon
- ...Item,
- 

SetItemProperty
- properties: [SetItemProperty]

UniqueItem
- ID
- Item: Item

SetItem
- ID
- Item: Item
- setProperties: [SetItemProperty]
