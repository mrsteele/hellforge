import fetch from 'lib/fetch'

export const resolvers = {
  Query: {
    getUniques: async () => {
      try {
        const data = await fetch(`/api/v2/items/unique`)
        return data
      } catch (e) {
        throw e
      }
    },
    getUnique: async (_, args) => {
      try {
        const data = await fetch(`/api/v2/items/unique/${args.id}`)
        return data
      } catch (e) {
        throw e
      }
    }
  }
}
