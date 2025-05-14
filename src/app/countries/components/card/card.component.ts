import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'country-card',
  imports: [],
  templateUrl: './card.component.html',
})
export class CardComponent {
  country = input<Country>();
}
