import axios from 'axios';

interface ICity {
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

interface ICitiesResponse {
  data: {
    Results: ICity[];
  };
}

interface ICityRootResolver {
  name: string;
}

export default async (
  root: ICityRootResolver,
): Promise<ICity[]> => {
  try {
    const response: ICitiesResponse = await axios.get(
      process.env.CITY_ENDPOINT as string,
      {
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': process.env.CITY_HOST,
          'x-rapidapi-key': process.env.CITY_KEY,
        },
        params: {
          location: root.name,
        },
      },
    );

    return response.data.Results.map((item: ICity) => {
      const [name, country] = item.name.split(/,\s/);

      return { ...item, name, country };
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }

  return [];
};
