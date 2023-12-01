import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Student } from "../interfaces/Student";

@Pipe( {
	name : 'langParse'
} )
export class LanguagePipe implements PipeTransform {

	constructor( private sanitizer: DomSanitizer ) {
	}

	transform( student: Student, ...args: unknown[] ): SafeHtml {
		let result: string = "";

		student.languageLevel.forEach( ( level ) => {
			let languageResource = student.languageResources
			.filter( resource => {
				return resource.name === level.language
			} )
			.map( ( a ) => {
				return a.flagUrl
			} );
			result += `<span><img src=${ languageResource } height="18" width="24"> ${ level.language }  / ${ level.level }</span> ~ `;

		} );

		return this.sanitizer.bypassSecurityTrustHtml( result.substring( 0, result.length - 2 ) );
	}

}
