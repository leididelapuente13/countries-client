import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString',
})
export class ArrayToStringPipe implements PipeTransform {

  transform(value: string[]): string {
    return value.toString();
  }

}
