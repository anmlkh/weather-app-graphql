import { gql } from 'apollo-server-express';

export default gql`
type City {
    name: String!
    country: String!
}
type Query {
    city(name: String): [City]
}
`;
