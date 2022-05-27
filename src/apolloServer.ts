import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { Server } from 'http';

import typeDefs from './schema';
import CityResolver from './resolvers/city';

const resolvers = {
  Query: {
    cities: async (_source: any, { name }: any, { dataSources }: any) =>
      dataSources.city.getCitiesList(name),
    cityLocation: async (
      _source: any,
      { placeId }: any,
      { dataSources }: any,
    ) => dataSources.city.getCityLocation(placeId),
  },
};

export const createServer = (httpServer: Server) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    introspection:
      process.env.NODE_ENV === 'development' || Boolean(process.env.DEBUG_MODE),
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      process.env.NODE_ENV === 'development' || Boolean(process.env.DEBUG_MODE)
        ? ApolloServerPluginLandingPageGraphQLPlayground()
        : ApolloServerPluginLandingPageDisabled(),
    ],
    dataSources: () => ({
      city: new CityResolver(
        process.env.CITY_AUTOCOMPLETE_HOST as string,
        process.env.CITY_AUTOCOMPLETE_KEY as string,
      ),
    }),
    context: () => ({}),
  });
