import { gql } from 'apollo-server-express';

export default gql`
interface ICity {
    name: String!
    country: String
}

type City implements ICity {
    id: ID!
}

type CityAutocomplete implements ICity {
    c: String
}
`;
