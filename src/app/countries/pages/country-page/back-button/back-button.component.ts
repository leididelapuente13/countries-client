import { Component, inject } from '@angular/core';
import { Location } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeftSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'country-back-button',
  imports: [NgIcon],
  templateUrl: './back-button.component.html',
  viewProviders: provideIcons({ heroArrowLeftSolid }),
})
export class BackButtonComponent {
  private location = inject(Location);

   goBack(){
    this.location.back();
  }
}
