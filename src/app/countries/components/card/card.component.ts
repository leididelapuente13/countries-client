import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { InformationComponent } from "./information/information.component";

@Component({
  selector: 'country-card',
  imports: [InformationComponent],
  templateUrl: './card.component.html',
})
export class CardComponent {
  country = input.required<Country>();
}
