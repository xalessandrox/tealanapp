import { Pipe, PipeTransform } from '@angular/core';
import { Language } from "../enums/Language";

@Pipe({
  name: 'sumArray'
})
export class LanguagePipe implements PipeTransform {

  transform(value: Array<Language>, ...args: unknown[]): number | any {
    if (value instanceof Array) {

      value.forEach(lang => {

      })
    }

  }

}
