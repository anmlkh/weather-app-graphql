import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import {
  City, CitiesResponse, GoogleCity, CityResponse, Location,
} from '../types/city';

export default class CityResolver extends RESTDataSource {
  private key: string;

  constructor(host: string, key: string) {
    super();

    this.baseURL = host;
    this.key = key;
  }

  protected willSendRequest(request: RequestOptions) {
    request.params.set('key', this.key);
    request.params.set('language', 'en');
  }

  public async getCitiesList(cityName: string): Promise<City[]> {
    try {
      const response: CitiesResponse = await this.get('/autocomplete/json', {
        input: cityName,
        types: '(cities)',
      });

      return response.predictions.map((item: GoogleCity) => {
        const termsCount = item.terms.length;
        const name = item.terms[0].value;
        const country = item.terms[termsCount - 1].value;

        return {
          placeId: item.place_id,
          name,
          country,
        };
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return [];
  }

  public async getCityLocation(placeId: string): Promise<Location | null> {
    try {
      const response: CityResponse = await this.get('/details/json', {
        place_id: placeId,
        fields: 'geometry',
      });

      return response.result.geometry.location;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    return null;
  }
}
