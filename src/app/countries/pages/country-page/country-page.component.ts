import { Component, inject, resource } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common'

import { InformationComponent } from "../../components/card/information/information.component";
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { firstValueFrom, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { CountryButtonComponent } from "./country-button/country-button.component";
import { BackButtonComponent } from "./back-button/back-button.component";

@Component({
  selector: 'app-country-page',
  imports: [NgOptimizedImage, DecimalPipe, InformationComponent, CountryButtonComponent, BackButtonComponent],
  templateUrl: './country-page.component.html'
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
