import { Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'country-search-bar',
  imports: [NgIcon],
  templateUrl: './search-bar.component.html',
  viewProviders: provideIcons({ heroMagnifyingGlassSolid }),

})
export class SearchBarComponent { }
