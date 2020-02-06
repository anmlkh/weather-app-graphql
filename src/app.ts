import express, { Request, Response } from "express";
import cors from "cors";
import graphqlMiddleware from "./graphqlMiddleware";
import dotenv from "dotenv";

const app = express();

if (app.get("env") === "development") {
  dotenv.config();
}

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send(
    `weatherApi server is running in ${process.env.NODE_ENV ||
      "development"} mode`
  );
});

app.use("/graphql", graphqlMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening on port ${port}!`));
