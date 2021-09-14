import fetch from 'lib/fetch'

const getUniques = async () =>
  await fetch(`/api/v2/items/unique`)

const getUnique = async (_, args) =>
  await fetch(`/api/v2/items/unique/${args.id}`)

const getItemTypes = async () =>
  await fetch(`/api/v2/items/types`)

const getCharacters = async () =>
  await fetch(`/api/v2/characters`)

const getCharacter = async (_, args) =>
  await fetch(`/api/v2/characters/${args.id}`)

const createHandler = async (allData, field, fn) => {
  if (!allData[field]) {
    return null
  }
  const data = await fn(null, { id: allData[field] })
  return data
}

export const resolvers = {
  Query: {
    getUniques,
    getUnique,
    getItemTypes,
    getCharacters,
    getCharacter
  },

  ItemType: {
    classSpecific: async (data) => await createHandler(data, 'classSpecific', getCharacter),
    characterMods: async (data) => await createHandler(data, 'characterMods', getCharacter)
  }
}
