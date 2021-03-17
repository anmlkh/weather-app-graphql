import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

interface ICityData {
  id: number;
  name: string;
  sys: {
    country: string;
  };
}

interface ICity {
  id: number;
  name: string;
  country: string;
}

interface ICitiesResponse {
  Results: ICity[];
}

export default class CityResolver extends RESTDataSource {
  public baseURL = process.env.CITY_AUTOCOMPLETE_ENDPOINT;

  protected willSendRequest(request: RequestOptions) {
    request.headers.set('content-type', 'application/octet-stream');
    request.headers.set('x-rapidapi-host', this.context.CITY_HOST);
    request.headers.set('x-rapidapi-key', this.context.CITY_KEY);
  }

  public async findCity(cityName: string): Promise<ICity[]> {
    try {
      const response: ICitiesResponse = await this.get(
        '',
        {
          location: cityName,
        },
      );

      return response.Results.map((item: ICity) => {
        const [name, country] = item.name.split(/,\s/);

        return { ...item, name, country };
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return [];
  }
}
