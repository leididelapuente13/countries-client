export interface Country {
  name: string;
  nativeName: string;
  capital?: string;
  subregion: string;
  region: string;
  population: number;
  topLevelDomain: string[];
  area?: number;
  currencies?: Currency[];
  languages?: Language[];
  borderCountries?: string[];
  flag: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface Language {
  iso639_1?: string;
  iso639_2?: string;
  name?: string;
  nativeName?: string;
}

interface Flag {
  svg: string;
  png: string;
}
