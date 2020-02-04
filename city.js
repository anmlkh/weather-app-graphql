const axios = require("axios");

module.exports = ({ name }) => {
  return axios
    .get(process.env.CITY_ENDPOINT, {
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": process.env.CITY_HOST,
        "x-rapidapi-key": process.env.CITY_KEY
      },
      params: {
        location: name
      }
    })
    .then(response => response.data.Results)
    .catch(error => {
      console.log(error);
    });
};
