import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import CityResolver from './resolvers/city';

const resolvers = {
  Query: {
    city:
      async (_source: any, { name }: any, { dataSources }: any) => dataSources.city.getCity(name),
  },
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV === 'development' || Boolean(process.env.DEBUG_MODE),
  playground: process.env.NODE_ENV === 'development' || Boolean(process.env.DEBUG_MODE),
  dataSources: () => ({
    city: new CityResolver(),
  }),
  context: () => (
    {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY as string,
    }
  ),
});
