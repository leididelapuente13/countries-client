import { Component, inject, Query, resource, signal } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { ListComponent } from "../../components/list/list.component";

import { CountriesService } from '../../services/countries.service';
import { firstValueFrom } from 'rxjs';
import { Region } from '../../interfaces/country.interface';

@Component({
  selector: 'app-countries-page',
  imports: [SearchBarComponent, ListComponent],
  templateUrl: './countries-page.component.html',
})
export class CountriesPageComponent {
  countryService = inject(CountriesService);
  countryNameQuery = signal<string>('');
  countryRegionQuery = signal<Region | null>(null);

  countryByNameResource = resource({
    request: () => ({ query: this.countryNameQuery() }),
    loader: async ({ request }) => {
      if (request.query === '') return [];
      return await firstValueFrom(this.countryService.getCountriesByName(request.query));
    }
  });

  countryByRegionResource = resource({
    request: () => ({ query: this.countryRegionQuery() }),
    loader: async ({ request }) => {
      if (!request.query) return [];
      return await firstValueFrom(this.countryService.getCountriesByRegion(request.query));
    }
  })
}
