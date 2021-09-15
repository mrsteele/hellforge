import apiCharacters from 'pages/api/v2/characters/[[...slug]]'
import apiItemTypes from 'pages/api/v2/items/types/[[...slug]]'
import apiItemUniques from 'pages/api/v2/items/uniques/[[...slug]]'
import apiGetColors from 'pages/api/v2/colors/[[...slug]]'

const getUniques = () => apiItemUniques.getAll()
const getUnique = (_, args) => apiItemUniques.get(args.id)

const getItemTypes = () => apiItemTypes.getAll()
const getItemType = (_, args) => apiItemTypes.get(args.id)

const getCharacters = () => apiCharacters.getAll()
const getCharacter = (_, args) => apiCharacters.get(args.id)

const getColors = () => apiGetColors.getAll()
const getColor = (_, args) => apiGetColors.get(args.id)

const createHandler = (fn, field) => {
  return (data) => data[field] ? fn(data[field]) : null
}

export const resolvers = {
  Query: {
    getUniques,
    getUnique,
    getItemTypes,
    getCharacters,
    getCharacter,
    getItemType,
    getColors,
    getColor
  },

  ItemType: {
    classSpecific: createHandler(apiCharacters.get, 'classSpecific'),
    characterMods: createHandler(apiCharacters.get, 'characterMods')
  }
}
