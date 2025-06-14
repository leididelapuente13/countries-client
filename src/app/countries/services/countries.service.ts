import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country, Region } from '../interfaces/country.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CountryMapper } from '../mappers/countries.mapper';
import { RESTCountry } from '../interfaces/rest-countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private http = inject(HttpClient);
  private BASE_URL = environment.API_URL;

  cacheFoundCountriesByName = new Map<string, Country[]>;
  cacheCountriesByRegion = new Map<string, Country[]>;
  cacheCountryByCode = new Map<string, Country>();

  getCountriesByName(query: string): Observable<Country[]> {
    if (this.cacheFoundCountriesByName.has(query)) {
      return of(this.cacheFoundCountriesByName.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${this.BASE_URL}/name/${query}`).pipe(
      map((restCountries) => CountryMapper.restCountriesToCountries(restCountries)),
      tap(countries => this.cacheFoundCountriesByName.set(query, countries)),
      catchError(
        (error) => {
          console.log(error)
          return throwError(() => new Error("There has been an error when trying to get the countries"));
        }
      )
    )
  }

  getCountriesByRegion(query: Region): Observable<Country[]> {
    if (this.cacheCountriesByRegion.has(query)) {
      return of(this.cacheCountriesByRegion.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${this.BASE_URL}/region/${query}`).pipe(
      map(restCountries => CountryMapper.restCountriesToCountries(restCountries)),
      tap(countries => this.cacheCountriesByRegion.set(query, countries)),
      catchError((error) => {
        console.log(`Error fetching countries by region ${query}`, error)
        return throwError(()=>new Error(`There has been an error trying to fetch countries by region ${query}`));
      })
    )
  }

  getCountryByCode(code: string): Observable<Country | null>{
    if(this.cacheCountryByCode.has(code)){
      return of(this.cacheCountryByCode.get(code) ?? null)
    }

    return this.http.get<RESTCountry>(`${this.BASE_URL}/alpha/${code}`).pipe(
      map(restCountry => CountryMapper.restCountrytoCountry(restCountry)),
      tap(country => this.cacheCountryByCode.set(code, country)),
      catchError((error)=>{
        console.error(`There has been an error when looking for a country by the code ${code}`, error);
        return throwError(()=> new Error(`There has been an error when looking for a country by the code ${code}`))
      } )
    )
  }
}
