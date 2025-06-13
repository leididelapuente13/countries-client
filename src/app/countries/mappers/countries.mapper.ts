import { RESTCountry } from "../interfaces/rest-countries.interface";
import { Country } from '../interfaces/country.interface';

export class CountryMapper {
  static restCountrytoCountry(restCountry: RESTCountry): Country {
    const { name, area, capital, subregion, region, population, currencies, languages, borders, flags, tld } = restCountry;

    const currency: string = currencies ? Object.values(currencies)[0]?.name || '' : '';

    const language: string = languages ? Object.values(languages)[0] : ''

    const nativeName : string = name.nativeName ? Object.values(name.nativeName)[0]?.official : '';

    return {
      name: name.common,
      capital: capital?.[0] ?? 'Not found',
      languages: language,
      borderCountries: borders,
      topLevelDomain: tld,
      flag: flags.svg,
      currency,
      nativeName,
      subregion,
      region,
      population,
      area
    }
  }

  static restCountriesToCountries(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(restCountry => this.restCountrytoCountry(restCountry));
  }
}
