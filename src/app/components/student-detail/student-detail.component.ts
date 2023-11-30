import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, catchError, map, Observable, of, startWith, switchMap } from "rxjs";
import { AppState } from "../../interfaces/AppState";
import { CustomHttpResponse } from "../../interfaces/CustomHttpResponse";
import { Page } from "../../interfaces/Page";
import { Student } from "../../interfaces/Student";
import { ActivatedRoute, ParamMap, RouterLink } from "@angular/router";
import { StudentService } from "../../services/student.service";
import { DataState } from "../../enums/DataState";

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports : [ CommonModule, RouterLink ],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent implements OnInit {
  studentDetailState$: Observable<AppState<CustomHttpResponse<Student>>>;
  dataSubject = new BehaviorSubject<CustomHttpResponse<Student>>( null );
  protected readonly DataState = DataState;

constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService) {
}
  ngOnInit(): void {
    this.studentDetailState$ = this.activatedRoute.paramMap.pipe(
      switchMap( ( params: ParamMap ) => {
          return this.studentService.studentDetail$( +params.get( 'customerId' ) )
          .pipe(
            map( response => {
              this.dataSubject.next( response );
              return {
                dataState : DataState.Loaded,
                appData : response
              };
            } ),
            startWith( { dataState : DataState.Loading } ),
            catchError( ( error: string ) => {
              return of( {
                dataState : DataState.Error,
                error
              } )
            } )
          )
        }
      ) );
  }



}
