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
    city:
      async (_source: any, { name }: any, { dataSources }: any) => dataSources.city.getCity(name),
  },
};

export const createServer = (httpServer: Server) => new ApolloServer({
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
    city: new CityResolver(),
  }),
  context: () => ({
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY as string,
  }),
});
