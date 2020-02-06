import axios from "axios";
import { ParamsDictionary } from "express-serve-static-core";

interface City {
  name: string;
  country: string;
  c: string;
  zmw: string;
  tz: string;
  tzs: string;
  l: string;
  ll: string;
  lat: string;
  lon: string;
}

interface CitiesResponse {
  data: {
    Results: City[];
  };
}

interface ICityRequestParams extends ParamsDictionary {
  name: string;
}

export default ({ name }: ICityRequestParams) => {
  return axios
    .get(process.env.CITY_ENDPOINT as string, {
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": process.env.CITY_HOST,
        "x-rapidapi-key": process.env.CITY_KEY
      },
      params: {
        location: name
      }
    })
    .then((response: CitiesResponse) =>
      response.data.Results.map((item: City) => {
        const [name, country] = item.name.split(/,\s/);

        return { ...item, name, country };
      })
    )
    .catch((error: Error) => {
      console.log(error);
    });
};