import expressGraphql from "express-graphql";
import { buildSchema } from "graphql";
import city from "./city";

const schema = buildSchema(`
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
`);

const rootValue = {
  city
};

export default expressGraphql({
  schema,
  rootValue,
  graphiql: true
});
