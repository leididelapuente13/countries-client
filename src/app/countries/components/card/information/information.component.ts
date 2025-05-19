import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'card-information',
  imports: [],
  templateUrl: './information.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationComponent {
  @Input() key: string = '';
  @Input() value: string | number | Date = 'No se encontró información';
}
