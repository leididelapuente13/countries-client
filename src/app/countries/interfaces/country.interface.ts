export interface Country {
  name: string;
  nativeName: string;
  capital: string;
  subregion: string;
  region: string;
  population: number;

  alpha3Code: string,
  topLevelDomain: string[];
  area: number;
  currency: string[];
  languages: string[];
  borderCountries: string[];
  flag: string;
}

export type Region =
    | 'Africa'
    | 'Americas'
    | 'Asia'
    | 'Europe'
    | 'Oceania'
    | 'Antarctic';
