import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '..//login/login.component';
import { RegisterComponent } from '../register/register.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public dialog: MatDialog) {}


  scrollToSection(id: string) {
   const element = document.getElementById(id);
   element?.scrollIntoView({ block: 'center',  behavior: 'smooth' });
  }
  

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      height: '700px',
      width: '600px',
      // closeOnNavigation: true
    });
  }

  openRegisterDialog(): void {
    this.dialog.open(RegisterComponent, {
      height: '900px',
      width: '1000px',
      // closeOnNavigation: true
      
    });
  }

  ngOnInit(): void {
  }

}
