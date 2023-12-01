import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { CustomHttpResponse } from "../interfaces/CustomHttpResponse";
import { Page } from "../interfaces/Page";
import { Student } from "../interfaces/Student";

@Injectable( {
	providedIn : 'root'
} )
export class StudentService {
	constructor( private httpClient: HttpClient ) {
	}

	students$ = ( pageNumber: number = 0 ) => <Observable<CustomHttpResponse<Page<Student>>>>
		this.httpClient.get<CustomHttpResponse<Page<Student>>>
		( `http://localhost:8080/students/getAll` )
		.pipe(
			catchError( this.handleError )
		);

	studentDetail$ = (id: number) => <Observable<CustomHttpResponse<Student>>>
		this.httpClient.get<CustomHttpResponse<Page<Student>>>
		( `http://localhost:8080/students/${id}` )
		.pipe(
			catchError( this.handleError )
		);


	private handleError( response: HttpErrorResponse ): Observable<never> {
		console.log( response );
		let errorMessage: string;
		if (response.error instanceof ErrorEvent) {
			errorMessage = `A client error occurred - ${ response.error.message }`;
		} else {
			if (response.error.reason) {
				errorMessage = response.error.reason;
				console.log( errorMessage );
			} else {
				errorMessage = `An error occurred - Error status ${ response.status }`;
			}
		}
		return throwError( () => errorMessage );
	}


}