import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
// import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}
  public URL = 'http://localhost:8080/api/v1/auth';

  public handleError(error: HttpErrorResponse) {
    // console.log(error);
    if (error.status === 0) {
      // console.log("client error");
      return throwError(() => new Error(error.message));
    } else {
      // console.log("server error");
      return throwError(() => new Error(error.message));
    }
  }

  public setSession(res: any) {
    localStorage.setItem('access_token', res.access_token);
    localStorage.setItem('refresh_token', res.refresh_token);
    localStorage.setItem('username', res.username);
    // console.log('ref: ' + res.refresh_token);
    // console.log('acc: ' + res.access_token);

    // console.log('Set in local storage');
  }

  public login(credentials: Object): Observable<Object> {
    return this.http.post<Object>(this.URL + '/login', credentials).pipe(
      tap((res) => this.setSession(res)),
      catchError(this.handleError)
    );
  }

  public register(data: Object): Observable<Object> {
    // console.log(data);
    return this.http.post<Object>(this.URL + '/register', data).pipe(
      tap((res) => console.log(res)),
      catchError(this.handleError)
    );
  }

  public removeTokens() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
  }
  public logout() {
    this.removeTokens();
    this.dialog.closeAll();
    this.router.navigate(['']);
    // console.log('logged out');
  }

  public refreshToken() {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .set('Authorization', `Bearer ${this.getRefreshToken()}`);
    return this.http.get(this.URL + '/token', { headers: headers });
  }

  public isLoggedIn(): boolean {
    if (
      localStorage.getItem('access_token') !== null &&
      localStorage.getItem('refresh_token') !== null &&
      localStorage.getItem('username') !== null &&
      this.getUsernameFromToken() === localStorage.getItem('username')
    ) {
      return true;
    } else {
      return false;
    }
  }

  public isTokenExpired(token: string): boolean | Promise<boolean> {
    return helper.isTokenExpired(token);
  }

  public decodeToken(token: string) {
    return helper.decodeToken(token);
  }

  public getUsernameFromToken() {
    let token = this.getAccessToken();
    return helper.decodeToken(token).sub;
  }

  public getAccessToken(): string {
    return localStorage.getItem('access_token') as string;
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refresh_token') as string;
  }

  public hasRole(role: string): boolean {
    if (this.isTokenExpired(this.getAccessToken())) {
      // console.log("token was expired")
      this.refreshToken()
        .pipe(
          tap((res) => {
            // console.log("refreshing")
            this.setSession(res);
          }),
          catchError((err) => this.handleError(err))
        )
        .subscribe();
    }
    const token = this.decodeToken(this.getAccessToken());
    const roles = token['roles'];
    return roles.includes(role);
  }
}
