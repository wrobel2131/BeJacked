import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    public dialogRef: MatDialogRef<UserInfoComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  profileForm!: FormGroup;
  editing = false;

  editingControls: boolean[] = [];

  toggleEditingControl(controlName: string, index: number) {
    let control = this.profileForm.controls[controlName];
    this.editingControls[index] = !this.editingControls[index];
    if (this.editingControls[index]) {
      control.enable();
    } else {
      control.disable();
    }
  }

  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      this.editingControls.push(false);
    }
    this.profileForm = this.fb.group({
      username: this.fb.control(
        { value: this.user.username, disabled: !this.editingControls[0] },
        []
      ),
      email: this.fb.control(
        { value: this.user.email, disabled: !this.editingControls[1] },
        []
      ),
      password: this.fb.control(
        { value: '', disabled: !this.editingControls[2] },
        []
      ),
      // confirmPassword: this.fb.control(
      //   { value: '', disabled: !this.editingControls[3] },
      //   []
      // ),
      name: this.fb.control(
        { value: this.user.name, disabled: !this.editingControls[3] },
        []
      ),
      surname: this.fb.control(
        { value: this.user.surname, disabled: !this.editingControls[4] },
        []
      ),
    });
  }

  onSubmit() {
    let user = {
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      // confirmPassword: this.confirmPassword.value,
      name: this.name.value,
      surname: this.surname.value,
    };
    console.log(user);
  }

  get id() {
    return this.profileForm.controls['id'];
  }
  get email() {
    return this.profileForm.controls['email'];
  }
  get username() {
    return this.profileForm.controls['username'];
  }
  get password() {
    return this.profileForm.controls['password'];
  }
  // get confirmPassword() {
  //   return this.profileForm.controls['confirmPassword'];
  // }
  get name() {
    return this.profileForm.controls['name'];
  }
  get surname() {
    return this.profileForm.controls['surname'];
  }
}
