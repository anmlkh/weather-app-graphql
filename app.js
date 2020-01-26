const express = require("express");
const axios = require("axios");

const app = express();

if (app.get('env') === "development") {
  require("dotenv").config();
}

app.get("/", async (req, res) => {
  res.send("weatherApi server");
});

app.get("/city", async (req, res) => {
  axios
    .get(process.env.CITY_ENDPOINT, {
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": process.env.CITY_HOST,
        "x-rapidapi-key": process.env.CITY_KEY
      },
      params: {
        location: req.query.name
      }
    })
    .then(response => {
      res.json(response.data.Results);
    })
    .catch(error => {
      console.log(error);
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening on port ${port}!`));
