import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private spinner: NgxUiLoaderService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.nullValidator]),
    password: new FormControl('', [Validators.nullValidator]),
  });

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      (data) => {
        this.dialogRef.close();
        this.router.navigate(['app']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
