import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'country-information',
  imports: [],
  templateUrl: './information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  @Input() key: string = '';
  @Input() value: string | number | Date | null = 'No se encontró información';
}
