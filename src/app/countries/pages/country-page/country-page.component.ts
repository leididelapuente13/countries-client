import { Component, inject, input, resource } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common'

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeftSolid } from '@ng-icons/heroicons/solid';
import { InformationComponent } from "../../components/card/information/information.component";
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CountriesService } from '../../services/countries.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [NgOptimizedImage, DecimalPipe, NgIcon, InformationComponent],
  templateUrl: './country-page.component.html',
  viewProviders: provideIcons({ heroArrowLeftSolid }),
})
export class CountryPageComponent {

  private route = inject(ActivatedRoute);
  private countriesService = inject(CountriesService);
  private countryCode = this.route.snapshot.paramMap.get('code');

  countryByCodeResource = resource({
    request: () => ({ code: this.countryCode }),
    loader: async ({ request }) => {
      if (!request.code) return;
      return await firstValueFrom(this.countriesService.getCountryByCode(request.code));
    },
  })
}
