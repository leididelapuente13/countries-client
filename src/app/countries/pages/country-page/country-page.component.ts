import { Component, inject, input, resource, signal } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common'

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeftSolid } from '@ng-icons/heroicons/solid';
import { InformationComponent } from "../../components/card/information/information.component";
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountriesService } from '../../services/countries.service';
import { firstValueFrom, map, Observable } from 'rxjs';
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
  countryCode = toSignal(this.route.paramMap.pipe(
    map(params => params.get('code'))
  ));
  countryByCodeResource = resource({
    request: () => ({ code: this.countryCode }),
    loader: async ({ request }) => {
      if (!request.code) return;
      return await firstValueFrom(this.countriesService.getCountryByCode(String(request.code)));
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
