import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

interface ICity {
  name: string;
  country?: string;
  c: string;
}

interface ICitiesResponse {
  Results: ICity[];
}

export default class CityAutocompleteResolver extends RESTDataSource {
  public baseURL = process.env.CITY_AUTOCOMPLETE_ENDPOINT;

  protected willSendRequest(request: RequestOptions) {
    request.headers.set('content-type', 'application/octet-stream');
    request.headers.set('x-rapidapi-host', this.context.CITY_AUTOCOMPLETE_HOST);
    request.headers.set('x-rapidapi-key', this.context.CITY_AUTOCOMPLETE_KEY);
  }

  public async getCitiesList(
    cityName: string,
  ): Promise<ICity[]> {
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
