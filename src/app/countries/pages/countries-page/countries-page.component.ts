import { Component } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { ListComponent } from "../../components/list/list.component";

import countriesData from '../../../shared/utils/data.json';

@Component({
  selector: 'app-countries-page',
  imports: [SearchBarComponent, ListComponent],
  templateUrl: './countries-page.component.html',
})
export class CountriesPageComponent {
  countries = countriesData;
}
