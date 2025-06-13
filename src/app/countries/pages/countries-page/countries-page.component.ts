import { Component, inject, resource, signal } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { ListComponent } from "../../components/list/list.component";

import countriesData from '../../../shared/utils/data.json';
import { CountriesService } from '../../services/countries.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-countries-page',
  imports: [SearchBarComponent, ListComponent],
  templateUrl: './countries-page.component.html',
})
export class CountriesPageComponent {
  countryService = inject(CountriesService);
  countries = countriesData;
  countryNameQuery = signal<string>('');

  countryByNameResource = resource({
    request: ()=>({query: this.countryNameQuery()}),
    loader: async ({request})=>{
      if(request.query === '') return []
      return await firstValueFrom(this.countryService.getCountriesByName(request.query))
    }
  })
}
