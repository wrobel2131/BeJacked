import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isTokenExpired(this.authService.getRefreshToken())) {
      // this.authService.removeTokens()
      this.authService.logout();
      return false;
    }
    if (this.authService.isLoggedIn()) {
      console.log('logged in true');
      return true;
    }

    console.log('can activate, logged out, redirect');
    this.authService.logout();
    // this.router.navigate([''])
    return false;
  }
}
