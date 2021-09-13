// TODO: Move to environment variables
const GITHUB_URL = 'https://api.github.com';

export const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await fetch(`${GITHUB_URL}/users`).then(res => res.json())
        return users.map(({ id, login, avatar_url }) => ({
          id,
          login,
          avatar_url,
        }))
      } catch (e) {
        throw e;
      }
    },
    getUser: async (_, args) => {
      try {
        const {
          data: {
            id,
            login,
            avatar_url,
          } = {},
        } = await fetch(`${GITHUB_URL}/users/${args.name}`).then(res => res.json())
        return { id, login, avatar_url };
      } catch (e) {
        throw e;
      }
    },
  },
};
