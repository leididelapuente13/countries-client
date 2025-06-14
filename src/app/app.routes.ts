import { Routes } from '@angular/router';
import { LayoutComponent } from './countries/layout/layout.component';
import { CountriesPageComponent } from './countries/pages/countries-page/countries-page.component';
import { CountryPageComponent } from './countries/pages/country-page/country-page.component';

export const routes: Routes = [
  {
    path: 'countries',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CountriesPageComponent
      },
      {
        path: ':code',
        component: CountryPageComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'countries'
  }
];
