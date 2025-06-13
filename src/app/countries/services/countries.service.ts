import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interfaces/country.interface';
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

  getCountriesByName(query: string): Observable<Country[]> {
    if (this.cacheFoundCountriesByName.has(query)) {
      return of(this.cacheFoundCountriesByName.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${this.BASE_URL}/name/${query}`).pipe(
      map((restCountries)=>CountryMapper.restCountriesToCountries(restCountries)),
      tap(countries => this.cacheFoundCountriesByName.set(query, countries)),
      catchError(
        (error)=>{
          console.log(error)
          return throwError(()=> new Error( "There has been an error when trying to get the countries"));
        }
      )
    )
  }
}
