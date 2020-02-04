const express = require("express");
const cors = require("cors");

const city = require("./city");

const app = express();

if (app.get("env") === "development") {
  require("dotenv").config();
}

app.use(cors());

app.get("/", async (req, res) => {
  res.send(
    `weatherApi server is running in ${process.env.NODE_ENV ||
      "development"} mode`
  );
});

app.get("/city", city);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening on port ${port}!`));
