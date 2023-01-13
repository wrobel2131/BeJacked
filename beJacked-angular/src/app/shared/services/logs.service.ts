import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Log } from '../models/log';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(private http: HttpClient) {}

  public LOGS_URL = 'http://localhost:8080/api/v1/logs';
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // console.log("client error");

      return throwError(() => new Error(error.error.error));
    } else {
      // console.log("server error, " + error.error.error);
      return throwError(() => new Error(error.error));
    }
  }

  public addLog(log: Object): Observable<Object> {
    console.log(log);
    return this.http.post<Object>(this.LOGS_URL, log).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleError)
    );
  }

  public getLogsFromDate(
    exerciseId: number,
    workoutId: number,
    date: string
  ): Observable<Log[]> {
    return this.http
      .get<Log[]>(
        this.LOGS_URL + '/' + workoutId + '/' + exerciseId + '/' + date
      )
      .pipe(
        tap((res) => console.log(res)),
        catchError(this.handleError)
      );
  }
}
