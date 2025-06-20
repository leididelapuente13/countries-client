import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from "../../shared/components/layout/top-bar/top-bar.component";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, TopBarComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  theme = signal('');
}
