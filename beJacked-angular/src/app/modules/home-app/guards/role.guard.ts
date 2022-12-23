import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { reference } from '@popperjs/core';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(route.data['roles']) {
      // console.log("Sa role")
      if(this.authService.isTokenExpired(this.authService.getAccessToken())) {
        // console.log("token was expired")
        const refresh = this.authService.refreshToken().pipe(
          tap(res => {
            console.log("refreshing")
            this.authService.setSession(res)
          }),
          catchError(err => this.authService.handleError(err))
        )
        
        
        

      }

      
    
      if(this.authService.getAccessToken()) {
        const decodedToken = this.authService.decodeToken(this.authService.getAccessToken())
        // const rolesFromToken = decodedToken.getItem('roles');
        const roles = decodedToken['roles'];
        console.log(roles)

        if(route.data['roles'].some((role: string) => roles.includes(role))) {
          // console.log(route.data['roles'].some((role: string) => roles.includes(role)))
          return true;
        }
        

        // console.log(decodedToken['exp'])
        // let date = new Date(unixTimestamp * 1000).toLocaleTimeString('default');
        // console.log(date);
        
      }
      
      
    }
    


    this.router.navigate(['/app'])
    return false;
  }
  
}
