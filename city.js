const axios = require("axios");

module.exports = async (req, res) => {
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
};
