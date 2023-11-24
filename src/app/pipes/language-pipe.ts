import { Pipe, PipeTransform } from '@angular/core';
import { Language } from "../enums/Language";
import { LanguageResource } from "../interfaces/LanguageResource";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: 'langParse'
})
export class LanguagePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: Array<LanguageResource>, ...args: unknown[]): SafeHtml {
    let result: string = "";
    if (value instanceof Array) {
      value.forEach((resource) => {
        result += `<span>${resource.name} <img src=${resource.flagUrl} height="20" width="30"></span> `;
      })
    }
    return this.sanitizer.bypassSecurityTrustHtml(result);
  }

}
