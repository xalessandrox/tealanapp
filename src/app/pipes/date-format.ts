import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  constructor() {
  }

  transform(value: string): string {
    return new Intl.DateTimeFormat(navigator.language).format(new Date(value));
  }

}
