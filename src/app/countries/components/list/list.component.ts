import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'country-list',
  imports: [CardComponent],
  templateUrl: './list.component.html',
})
export class ListComponent {
  countries = input<Country[]>([]);
}
