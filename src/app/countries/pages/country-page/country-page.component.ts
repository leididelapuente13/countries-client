import { Component, inject, input, resource, signal } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common'

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeftSolid } from '@ng-icons/heroicons/solid';
import { InformationComponent } from "../../components/card/information/information.component";
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { firstValueFrom, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CountryButtonComponent } from "./country-button/country-button.component";

@Component({
  selector: 'app-country-page',
  imports: [NgOptimizedImage, DecimalPipe, NgIcon, InformationComponent, CountryButtonComponent],
  templateUrl: './country-page.component.html',
  viewProviders: provideIcons({ heroArrowLeftSolid }),
})
export class CountryPageComponent {

  private route = inject(ActivatedRoute);
  private countriesService = inject(CountriesService);
  private countryCode = toSignal<string>(this.route.params.pipe(map(params => params['code'])));

  countryByCodeResource = resource({
    request: () => ({ code: this.countryCode() }),
    loader: async ({ request }) => {
      if (!request.code || typeof(request.code) !== 'string') return;
      return await firstValueFrom(this.countriesService.getCountryByCode(request.code));
    },
  });

  countriesByCodeResource = resource({
    request: () => ({ codes: this.countryByCodeResource.value()?.borderCountries }),
    loader: async ({ request }) => {
      if (!request.codes) return;
      return await firstValueFrom(this.countriesService.getCountriesByCode(request.codes));
    }
  })
}
