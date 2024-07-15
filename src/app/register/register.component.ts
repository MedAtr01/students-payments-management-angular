import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../services/services/authentication.service";
import {Router} from "@angular/router";
import {RegistrationRequest} from "../services/models/registration-request";
import {exhaustMap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  hide = true;
  registrationRequest: RegistrationRequest = {
    email: '',
    fullName: '',
    password: '',
    program: '',
    studentCode: '',
    username: ''
  };
  errorMessage: Array<String> = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      studentCode: ['', Validators.required],
      program: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      username: ['']
    });
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }


  onSubmit() {
    this.errorMessage = [];
    if (this.registrationForm.valid) {
      this.registrationRequest.email = this.registrationForm.get('email')?.value;
      this.registrationRequest.fullName = this.registrationForm.get('fullName')?.value;
      this.registrationRequest.password = this.registrationForm.get('password')?.value;
      this.registrationRequest.program = this.registrationForm.get('program')?.value;
      this.registrationRequest.studentCode = this.registrationForm.get('studentCode')?.value;
      this.registrationRequest.username = this.registrationForm.get('email')?.value;


      this.authService.register({body: this.registrationRequest}).subscribe({
        next: (value => {
          this.router.navigate(['activate-account']);
        }),
        error: err => {
          console.log(err);
          this.errorMessage.push(err.error.error);
        }
      });

    }
  }

  protected readonly exhaustMap = exhaustMap;
}
