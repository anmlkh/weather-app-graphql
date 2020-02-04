const express_graphql = require("express-graphql");
const { buildSchema } = require("graphql");

const city = require("./city");

const schema = buildSchema(`
    type City {
        name: String!
    }
    type Query {
        city(name: String): [City]
    }
`);

const rootValue = {
  city
};

module.exports = express_graphql({
  schema,
  rootValue,
  graphiql: true
});
