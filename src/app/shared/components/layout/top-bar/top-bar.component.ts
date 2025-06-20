import { Component, Inject, output, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroMoonSolid } from '@ng-icons/heroicons/solid';
import { DOCUMENT, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

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

  private document = inject(DOCUMENT);
  private router = inject(Router);

  private THEME_KEY: string = 'countries-app-theme'
  currentMode: Mode = this.getTheme();

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
    this.storeThemeInLocalStorage(this.currentMode);
  }

  navigateToMainPage() {
    this.router.navigate(['/countries']);
  }

  private getDeviceDefaultTheme(): Mode {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? Mode.DARK : Mode.LIGHT
  }

  private storeThemeInLocalStorage(theme: Mode) {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  private getThemeStoreInLocalStorage(): Mode | undefined {
    const theme = localStorage.getItem(this.THEME_KEY);
    console.log(theme);
    return theme ? theme as Mode : undefined;
  }

  private getTheme(): Mode {
    const storedTheme = this.getThemeStoreInLocalStorage();
    return storedTheme ?? this.getDeviceDefaultTheme();
  }

  ngOnInit() {
    this.toggleDarkModeClass(this.currentMode);
  }
}
