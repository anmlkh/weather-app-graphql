import { gql } from 'apollo-server-express';

export default gql`
type City {
    name: String!
    country: String!
    c: String!
    zmw: String!
    tz: String!
    tzs: String!
    l: String!
    ll: String!
    lat: String!
    lon: String!
}
type Query {
    city(name: String): [City]
}
`;
