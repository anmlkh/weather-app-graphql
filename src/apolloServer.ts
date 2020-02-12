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
  dataSources: () => ({
    city: new CityResolver(),
  }),
  context: () => (
    {
      CITY_HOST: process.env.CITY_HOST as string,
      CITY_KEY: process.env.CITY_KEY as string,
    }
  ),
});
