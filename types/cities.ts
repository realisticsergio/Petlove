export interface City {
  _id: string;
  stateEn: string;
  cityEn: string;
  countyEn?: string;
  useCounty?: string;
}

export interface CityOption {
  value: string;
  label: string;
  city: City;
}
