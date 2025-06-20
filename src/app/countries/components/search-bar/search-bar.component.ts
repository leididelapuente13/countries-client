import { Component, effect, output, signal } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMagnifyingGlassSolid } from '@ng-icons/heroicons/solid';

import { Region } from '../../interfaces/country.interface';

@Component({
  selector: 'country-search-bar',
  imports: [NgIcon],
  templateUrl: './search-bar.component.html',
  viewProviders: provideIcons({ heroMagnifyingGlassSolid }),
})
export class SearchBarComponent {
  regions: Region[] = [
    'Africa',
    'Americas',
    'Antarctic',
    'Asia',
    'Europe',
    'Oceania'
  ]
  countryToSearchByName = output<string>();
  countryToSearchByRegion = output<Region>();

  inputValue = signal<string>('');

  debounceEffect = effect((onCleanUp) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.countryToSearchByName.emit(value);
    }, 500);

    onCleanUp(() => {
      clearTimeout(1000)
    })
  });

  onRegionChange(value: string) {
    this.countryToSearchByName.emit('');
    this.countryToSearchByRegion.emit(value as Region);
  }
}
