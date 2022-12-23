import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}  
  isRefreshing = false;
  static counter = 0

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // console.log("interceptor start")
    const accessToken = this.authService.getAccessToken();
    const refreshToken = this.authService.getRefreshToken();
    AuthInterceptor.counter = AuthInterceptor.counter + 1;
    console.log(AuthInterceptor.counter)

    // console.log("intercept, is token expired?: " + this.authService.isTokenExpired(accessToken));
    // console.log("is logged in?: " + this.authService.isLoggedIn())

    //sprawdzenie czy tokeny sa na miejscu w local storage
    console.log(request.url)
    if(this.authService.isLoggedIn() && !this.authService.isTokenExpired(accessToken) && !this.isRefreshing) {
      console.log("user logged in")

      request = request.clone({
        setHeaders: {Authorization: `Bearer ${accessToken}`}
      })

    } else if(!this.authService.isLoggedIn()){
      console.log("user not logged in, before logout")
      
      this.authService.logout()
    
    } else if(this.authService.isTokenExpired(accessToken)){
      console.log('refreshing false')
      this.isRefreshing = false;

    }

    console.log("dalej")
   
    
    
    return next.handle(request).pipe(
      // tap(_ => console.log("handle request tapp")),
      //request nie siadl, zwracany jest blad
      //trzeba sprawdzic, czy token jest niewazny, jezeli jest niewazny, to lecimy z refreshem
      //jezeli access jest wazny i blad zostal rzucony (403) to znaczy, ze nie ma dostepu i konczymy
      catchError((err: HttpErrorResponse) => {
        //sprawdzenie, czy refrestoken jest wazny, jezeli nie, to logout
        console.log("HTTP error response caught")
        if(this.authService.isTokenExpired(refreshToken) || !this.authService.isLoggedIn()) {
          console.log("refresh token expired, before logout")
          //user nie ma waznego refresh tokenu, wylogowanie
          this.authService.logout()
        } else {
          //user ma wazny refresh token
          console.log("refresh token is up to date")
          if(this.authService.isTokenExpired(accessToken) && !this.isRefreshing) {
            console.log("access token expired")
            this.isRefreshing = true;
            //user jest zalogowany, ale ma przedawniony acces token
            return this.authService.refreshToken().pipe(
               
              //ponawiany jest request z pierwszym requestem
              switchMap((response: any) => {
                console.log("refreshed the token, resnding first request")
                // Update the headers with the new access token
                console.log("new access token: " + response.access_token)
                this.authService.setSession(response)
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${response.access_token}`
                  }
                });
                // Retry the original request with the new headers
                return next.handle(request);
              }),
              catchError((refreshError: HttpErrorResponse) => {
                console.log("error while refreshing the token")
                //jezeli po zrefreshowaniu dostaniemy 403, to rzucamy blad
                return throwError(() => refreshError);
              })
            );
            
          } else {
            console.log("Token is not expired, but error occured: " + err.status)
            //user jest zalogowany, nie ma przedawnionego tokenu ale leci blad, prawdopodobnie nie ma roli do tego
            return throwError(() => err)
          }
        }
        console.log("other error")
        return throwError(() => err);
      })
    );

}



  
}




