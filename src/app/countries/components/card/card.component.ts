import { Component, inject, input } from '@angular/core';
import { DecimalPipe, NgOptimizedImage } from '@angular/common';

import { Country } from '../../interfaces/country.interface';
import { InformationComponent } from "./information/information.component";
import { Router } from '@angular/router';

@Component({
  selector: 'country-card',
  imports: [InformationComponent, DecimalPipe, NgOptimizedImage],
  templateUrl: './card.component.html',
})
export class CardComponent {
  router = inject(Router);
  country = input.required<Country>();

  navigateToCountryDetails(code: string){
    this.router.navigate(['/countries', code]);
  }

}
