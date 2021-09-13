import fetch from 'lib/fetch'

const getUniques = async () => {
  try {
    const data = await fetch(`/api/v2/items/unique`)
    return data
  } catch (e) {
    throw e
  }
}

const getUnique = async (_, args) => {
  try {
    const data = await fetch(`/api/v2/items/unique/${args.id}`)
    return data
  } catch (e) {
    throw e
  }
}

export const resolvers = {
  Query: {
    getUniques,
    getUnique
  }
}
