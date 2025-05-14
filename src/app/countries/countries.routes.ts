import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { CountriesPageComponent } from './pages/countries-page/countries-page.component';

const countriesRoutes: Routes = [
  {
    path: 'countries',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: CountriesPageComponent
      }
    ]
  }
];

export default countriesRoutes;
