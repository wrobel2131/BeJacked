import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorMessageComponent } from 'src/app/shared/dialogs/error-message/error-message.component';
import { SuccessMessageComponent } from 'src/app/shared/dialogs/success-message/success-message.component';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  getRequiredErrorMessage(control: string) {
    return control.charAt(0).toUpperCase() + control.slice(1) + ' is required';
  }

  getEmailErrorMessage() {
    if (this.registerForm.controls.email.hasError('required')) {
      return this.getRequiredErrorMessage('email');
    }
    return this.registerForm.controls.email.hasError('email')
      ? 'Wrong email format'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.registerForm.controls.password.hasError('required')) {
      return this.getRequiredErrorMessage('password');
    }
    return this.registerForm.controls.password.hasError('pattern')
      ? 'Password need have minimum 8 characters, at least 1 upper case and lower case later, 1 special character and 1 number'
      : '';
  }
  getConfirmErrorMessage() {
    if (this.registerForm.controls.password.hasError('required')) {
      return this.getRequiredErrorMessage('password');
    }

    return (
      this.registerForm.controls.confirmPassword.value ===
      this.registerForm.controls.confirmPassword.value
    );
  }

  isValid(): boolean {
    return this.registerForm.valid && this.roleForm.valid;
  }

  registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\.@$!%*#?&^_-]).{8,}/
        ),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
    },
    { validators: passwordMatchingValidatior }
  );

  roleForm = new FormGroup({
    role: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    let user = {
      username: this.registerForm.controls.username.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
      confirmPassword: this.registerForm.controls.confirmPassword.value,
      name: this.registerForm.controls.name.value,
      surname: this.registerForm.controls.surname.value,
      role: this.roleForm.controls.role.value,
    };

    if (this.isValid()) {
      console.log(user);
      this.authService.register(user).subscribe(
        (data) => {
          this.dialogRef.close();
          this.router.navigate(['']);
          let succ = 'You account has been created successfully!';
          this.openSuccessDialog(succ);
        },
        (error) => {
          console.log(error);
          this.openErrorDialog(error);
        }
      );
    }
  }

  openErrorDialog(error: string): void {
    const errorRef = this.dialog.open(ErrorMessageComponent, {
      height: '400px',
      width: '400px',
      data: error,
    });
  }

  openSuccessDialog(success: string): void {
    const successRef = this.dialog.open(SuccessMessageComponent, {
      height: '400px',
      width: '400px',
      data: success,
    });
  }

  ngOnInit(): void {}
}

export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value === confirmPassword?.value
    ? null
    : { notmatched: true };
};
