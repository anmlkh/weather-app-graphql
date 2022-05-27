import { gql } from 'apollo-server-express';

export default gql`
  type City {
    name: String!
    country: String!
    placeId: String!
  }

  type Location {
    lat: Float!
    lng: Float!
  }

  type Query {
    cities(name: String): [City]
    cityLocation(placeId: String): Location
  }
`;
