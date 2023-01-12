import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private ngxService: NgxUiLoaderService
  ) {}
  ngAfterViewInit(): void {
    this.ngxService.stop();
  }

  ngOnInit(): void {
    this.ngxService.start();
    //   if (this.authService.isLoggedIn()) {
    //     this.router.navigate(['app']);
    //  }
  }
}
