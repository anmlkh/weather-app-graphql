import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

interface ICity {
  name: string;
  country: string;
}

/* eslint-disable camelcase */
interface IGoogleCity {
  description: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: any;
    secondary_text: string;
  },
  terms: { offset: number, value: string; }[],
  types: string[];
}
/* eslint-enable camelcase */

interface ICitiesResponse {
  predictions: IGoogleCity[];
}

export default class CityResolver extends RESTDataSource {
  public baseURL = process.env.CITY_ENDPOINT;

  protected willSendRequest(request: RequestOptions) {
    request.params.set('key', this.context.GOOGLE_API_KEY);
  }

  public async getCity(
    cityName: string,
  ): Promise<ICity[]> {
    try {
      const response: ICitiesResponse = await this.get(
        '',
        {
          input: cityName,
        },
      );

      return response.predictions.map((item: IGoogleCity) => {
        const temsCount = item.terms.length;
        const name = item.terms[0].value;
        const country = item.terms[temsCount - 1].value;

        return {
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
}
