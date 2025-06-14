import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'country-button',
  imports: [],
  templateUrl: './country-button.component.html',
})
export class CountryButtonComponent {
  router = inject(Router);
  countryName = input<string>('');
  countryCode = input<string>('');

  navigateToCountryDetails(code: string) {
    this.router.navigate(['/countries', code]);
  }
}
