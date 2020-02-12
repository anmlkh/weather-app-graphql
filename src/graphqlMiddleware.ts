import expressGraphql from 'express-graphql';
import { buildSchema } from 'graphql';
import schema from './schema';
import city from './resolvers/city';

export default expressGraphql({
  schema: buildSchema(schema),
  rootValue: {
    city,
  },
  graphiql: true,
});
