import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  contactForm!: FormGroup;
  faFacebook = faFacebook;
  faGithub = faGithub;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      email: this.fb.control(null, [Validators.required]),
      message: this.fb.control(null, [Validators.required]),
    });
  }
}
