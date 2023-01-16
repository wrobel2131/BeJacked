import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { UserInfoComponent } from '../components/user-info/user-info.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  user!: User;

  openUserInfoDialog(user: User): void {
    const dialogRef = this.dialog.open(UserInfoComponent, {
      height: '900px',
      width: '700px',
      data: user,
    });
  }

  hasRole(role: string): boolean {
    if (role === 'admin') {
      return this.authService.hasRole('ROLE_ADMIN');
    }
    return this.authService.hasRole(role);
  }

  username() {
    return this.authService.getUsernameFromToken();
  }

  getUser() {
    this.userService.getUserByUsername(this.username()).subscribe(
      (data) => {
        this.user = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
