import { RESTCountry } from "../interfaces/rest-countries.interface";
import { Country } from '../interfaces/country.interface';

export class CountryMapper {
  static restCountrytoCountry(restCountry: RESTCountry): Country {
    const { name, area, capital, subregion, region, population, currencies, languages, borders, flags, tld, cca2 } = restCountry;

    const formattedCurrencies: string[] = currencies
      ? Object.values(currencies).map((currency: any) => currency.name)
      : [];

    const formattedLanguages: string[] = languages ? Object.values(languages).map(String) : [];

    const nativeName: string = name.nativeName ? Object.values(name.nativeName)[0]?.official : '';

    console.log(formattedCurrencies)
    return {
      name: name.common,
      capital: capital?.[0] ?? 'Not found',
      languages: formattedLanguages,
      borderCountries: borders,
      topLevelDomain: tld,
      flag: flags.svg,
      alpha3Code: cca2,
      currency: formattedCurrencies,
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
