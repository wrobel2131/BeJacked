import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';

@Component({
  selector: 'app-home-app',
  templateUrl: './home-app.component.html',
  styleUrls: ['./home-app.component.css'],
})
export class HomeAppComponent implements OnInit, AfterViewInit {
  constructor(
    private authService: AuthService,
    private ngxService: NgxUiLoaderService
  ) {
    console.log(ngxService);
  }
  ngAfterViewInit(): void {
    this.stop();
  }

  start() {
    console.log('start the spinner');
    this.ngxService.start(); // start the spinner
  }

  stop() {
    console.log('stop the spinner');
    this.ngxService.stop();
  }

  ngOnInit(): void {
    this.start();
  }

  public logout() {
    this.authService.logout();
  }

  click() {
    console.log(this.authService.getUsernameFromToken());
  }
}
