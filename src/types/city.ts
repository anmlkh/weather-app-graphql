export interface City {
  name: string;
  country: string;
  placeId: string;
}

/* eslint-disable camelcase */
export interface GoogleCity {
  description: string;
  place_id: string;
  terms: { offset: number; value: string }[];
}
/* eslint-enable camelcase */

export interface CitiesResponse {
  predictions: GoogleCity[];
}

export interface Location {
  lat: number;
  lng: number;
}

interface CityDetails {
  geometry: {
    location: Location;
  };
}

export interface CityResponse {
  result: CityDetails;
}
