import axios from 'axios';

// TODO: Move to environment variables
const GITHUB_URL = 'https://api.github.com';

export const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const users = await axios.get(`${GITHUB_URL}/users`);
        return users.data.map(({ id, login, avatar_url }) => ({
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
        } = await axios.get(`${GITHUB_URL}/users/${args.name}`);
        return { id, login, avatar_url };
      } catch (e) {
        throw e;
      }
    },
  },
};
