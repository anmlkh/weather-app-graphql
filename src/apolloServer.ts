import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema';
import CityResolver from './resolvers/city';
import CityAutocompleteResolver from './resolvers/cityAutocomplete';
import WeatherResolver from './resolvers/weather';

const resolvers = {
  Query: {
    city:
      async (_: any, { name }: any, { dataSources }: any) => dataSources.city.findCity(name),
    cityAutocomplete:
      async (_: any, { name }: any, { dataSources }: any) => dataSources.cityAutocomplete.getCitiesList(name),
    weather5days: async (_: any, { id }: any, { dataSources }: any) => dataSources.weather.get5DayWeather(id),
  },
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  introspection: process.env.NODE_ENV === 'development' || Boolean(process.env.DEBUG_MODE),
  playground: process.env.NODE_ENV === 'development' || Boolean(process.env.DEBUG_MODE),
  dataSources: () => ({
    city: new CityResolver(),
    cityAutocomplete: new CityAutocompleteResolver(),
    weather: new WeatherResolver(),
  }),
  context: () => (
    {
      CITY_AUTOCOMPLETE_HOST: process.env.CITY_AUTOCOMPLETE_HOST as string,
      CITY_AUTOCOMPLETE_KEY: process.env.CITY_AUTOCOMPLETE_KEY as string,
    }
  ),
});
