import { Component, Inject, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMoonSolid } from '@ng-icons/heroicons/solid';
import { DOCUMENT, TitleCasePipe } from '@angular/common';

enum Mode {
  LIGHT = 'light',
  DARK = 'dark'
}

@Component({
  selector: 'app-top-bar',
  imports: [NgIcon, TitleCasePipe],
  templateUrl: './top-bar.component.html',
  viewProviders: provideIcons({ heroMoonSolid }),
})
export class TopBarComponent {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  private getDefaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Mode.DARK : Mode.LIGHT;
  currentMode: Mode = this.getDefaultTheme;

  toggleDarkModeClass(mode: Mode) {
    mode === Mode.DARK ?
      this.document.body.classList.add('dark')
      :
      this.document.body.classList.remove('dark');
  }

  handleToggleMode() {
    const newMode = this.currentMode === Mode.LIGHT ? Mode.DARK : Mode.LIGHT;
    this.toggleDarkModeClass(newMode);
    this.currentMode = newMode;
  }

  ngOnInit() {
    this.toggleDarkModeClass(this.currentMode);
  }
}
