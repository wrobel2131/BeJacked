import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    // this.ngxService.start(); // start foreground loading with 'default' id
    // // Stop the foreground loading after 5s
    // setTimeout(() => {
    //   this.ngxService.stop(); // stop foreground loading with 'default' id
    // }, 2000);
  }

  hasRole(role: string): boolean {
    if (role === 'admin') {
      return this.authService.hasRole('ROLE_ADMIN');
    }
    return this.authService.hasRole(role);
  }

  logout() {
    this.authService.logout();
  }
}
