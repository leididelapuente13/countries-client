import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { InformationComponent } from "./information/information.component";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-card',
  imports: [InformationComponent, DecimalPipe],
  templateUrl: './card.component.html',
})
export class CardComponent {
  country = input.required<Country>();
}
