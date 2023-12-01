import { Component, OnInit, signal } from '@angular/core';
import { StudentService } from "../../services/student.service";
import { BehaviorSubject, catchError, map, Observable, of, startWith } from "rxjs";
import { AppState } from "../../interfaces/AppState";
import { CustomHttpResponse } from "../../interfaces/CustomHttpResponse";
import { Student } from "../../interfaces/Student";
import { Page } from "../../interfaces/Page";
import { DataState } from "../../enums/DataState";
import { Language } from "../../enums/Language";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component( {
	selector : 'app-students',
	templateUrl : './students.component.html',
	styleUrl : './students.component.scss'
} )
export class StudentsComponent implements OnInit {
	studentsState$: Observable<AppState<CustomHttpResponse<Page<Student>>>>;
	dataSubject = new BehaviorSubject<CustomHttpResponse<Page<Student>>>( null );
	protected readonly DataState = DataState;

	constructor(
		private studentService: StudentService,
		private domSanitizer: DomSanitizer,
		private router: Router) {
	}

	ngOnInit(): void {
		this.studentsState$ = this.studentService.students$()
		.pipe(
			map( getXHRResponse => {
				console.log( getXHRResponse );
				this.dataSubject.next( getXHRResponse );
				return {
					dataState : DataState.Loaded,
					appData : getXHRResponse
				};
			} ),
			startWith( { dataState : DataState.Loading } ),
			catchError( error => {
				return of( {
					dataState : DataState.Error,
					error
				} );
			} )
		);
	}

	getHtml(html: string) {
		return this.domSanitizer.bypassSecurityTrustHtml(html);
	}

	getStudent(id: number) {
		this.router.navigate([ `/students/${ id }` ]);
	}

}
