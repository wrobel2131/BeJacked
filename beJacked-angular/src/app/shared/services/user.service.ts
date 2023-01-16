import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}
  public URL = 'http://localhost:8080/api/v1/users';

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // console.log("client error");

      return throwError(() => new Error(error.error.error));
    } else {
      // console.log("server error, " + error.error.error);
      return throwError(() => new Error(error.error.error));
    }
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(this.URL + '/' + username).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleError)
    );
  }
  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.URL + '/email/' + email).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleError)
    );
  }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleError)
    );
  }
}
