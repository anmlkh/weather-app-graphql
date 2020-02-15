import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apolloServer from './apolloServer';

const app = express();

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

app.use(cors());

app.get('/', (_req, res) => {
  res.send(
    `weatherApi server is running in ${process.env.NODE_ENV
      || 'development'} mode`,
  );
});

apolloServer.applyMiddleware({ app });

const port = process.env.PORT || 5000;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening on port ${port}!`));
