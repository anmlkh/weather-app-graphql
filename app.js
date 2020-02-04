const express = require("express");
const cors = require("cors");

const graphql = require("./graphql");

const app = express();

if (app.get("env") === "development") {
  require("dotenv").config();
}

app.use(cors());

app.get("/", (req, res) => {
  res.send(
    `weatherApi server is running in ${process.env.NODE_ENV ||
      "development"} mode`
  );
});

app.use("/graphql", graphql);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening on port ${port}!`));
