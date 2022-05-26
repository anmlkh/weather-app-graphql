import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from './apolloServer';

const app = express();
const httpServer = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

app.use(cors());

app.get('/', (_req, res) => {
  res.send(
    `weatherApi server is running in ${
      process.env.NODE_ENV || 'development'
    } mode`,
  );
});
const apolloServer = createServer(httpServer);

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app, path: '/' });

  const port = process.env.PORT || 5000;

  // eslint-disable-next-line no-console
  httpServer.listen(port, () => console.log(`App listening on port ${port}!`));
});
