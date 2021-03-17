import { RESTDataSource } from 'apollo-datasource-rest';

interface IMainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  grnd_level: number;
  humidity: number;
}

interface IWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IWindInfo {
  speed: number;
  deg: number;
}

interface ICloudsInfo {
  all: number;
}

interface IWeather {
  dt_txt: string;
  main: IMainWeatherInfo;
  weather: IWeatherCondition[];
  wind: IWindInfo;
  clouds: ICloudsInfo;
}

interface ICitiesResponse {
  list: IWeather[];
}

export default class WeatherResolver extends RESTDataSource {
  public baseURL = process.env.ENDPOINT;

  public async get5DayWeather(
    id: string,
  ): Promise<IWeather[]> {
    try {
      const response: ICitiesResponse = await this.get(
        '/forecast',
        {
          id,
          appid: process.env.KEY,
          units: 'metric',
        },
      );

      return response.list.map((item: IWeather) => {
        console.log(item);

        return item;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return [];
  }
}
