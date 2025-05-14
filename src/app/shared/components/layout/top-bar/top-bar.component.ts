import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMoonSolid } from '@ng-icons/heroicons/solid';
@Component({
  selector: 'app-top-bar',
  imports: [NgIcon],
  templateUrl: './top-bar.component.html',
  viewProviders: provideIcons({ heroMoonSolid }),
})
export class TopBarComponent { }
