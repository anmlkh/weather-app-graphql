import { gql } from 'apollo-server-express';

export default gql`
  type City {
    id: ID!
    name: String!
    country: String!
  }

  type CityAutocomplete {
    name: String!
    country: String!
    c: String!
  }

  type MainWeatherInfo {
    temp: Float
    feels_like: Float
    temp_min: Float
    temp_max: Float
    pressure: Int
    grnd_level: Int
    humidity: Int
  }

  type WeatherCondition {
    id: ID
    main: String
    description: String
    icon: String
  }

  type WindInfo {
    speed: Int
    deg: Int
  }

  type CloudsInfo {
    all: Int
  }

  type Weather {
    dt_txt: String
    main: MainWeatherInfo
    weather: [WeatherCondition]
    wind: WindInfo
    clouds: CloudsInfo
  }
  type Query {
    city(name: String): [City]
    cityAutocomplete(name: String): [CityAutocomplete]
    weather5days(id: ID): [Weather]
  }
`;
