import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Exercise } from '../models/exercise';
import { ExerciseCategory } from '../models/exercise-category';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  constructor(private http: HttpClient) {}

  public EXERCISES_URL = 'http://localhost:8080/api/v1/exercises';

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // console.log("client error");

      return throwError(() => new Error(error.error.error));
    } else {
      // console.log("server error, " + error.error.error);
      return throwError(() => new Error(error.error.error));
    }
  }

  public getExerciseCategories(): Observable<ExerciseCategory[]> {
    return this.http
      .get<ExerciseCategory[]>(this.EXERCISES_URL + '/category')
      .pipe(
        tap((res) => console.log(res)),
        catchError(this.handleError)
      );
  }

  public getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.EXERCISES_URL).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleError)
    );
  }
}
