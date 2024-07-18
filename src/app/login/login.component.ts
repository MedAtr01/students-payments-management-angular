import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthenticationRequest} from "../services/models/authentication-request";
import {AuthenticationService} from "../services/services/authentication.service";
import {Router} from "@angular/router";
import {register} from "../services/fn/authentication/register";
import {TokenService} from "../services/token/token.service";
import {StudentRestControllerService} from "../services/services/student-rest-controller.service";
import {StudentDataService} from "../student/services/student-data.service";
import {Student} from "../services/models/student";
import jwt_decode, {jwtDecode} from 'jwt-decode';
import {LoadUser$Params} from "../services/fn/authentication/load-user";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  errorMsg: Array<String> = [];
  authRequest: AuthenticationRequest = {username: "", password: ""};
  formLogin: any;
  student!: Student;
  token!: string;
  private jwtHelper = new JwtHelperService();

  constructor(
    private studentService: StudentRestControllerService,
    private studentDataService: StudentDataService,
    private authService: AuthenticationService,
    private router: Router,
    private tokenService: TokenService
  ) {
  }


  ngOnInit(): void {
    this.token = this.tokenService.getToken();
    if (this.token && this.tokenService.isTokenExpired(this.token)) {
      this.tokenService.clearToken();
    }
    this.formLogin = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
    });
  }

  login() {

    this.errorMsg = [];

    this.authRequest.username = this.formLogin.get('username')?.value ?? '';
    this.authRequest.password = this.formLogin.get('password')?.value ?? '';

    this.authService
      .authenticate({body: this.authRequest})
      .subscribe({
        next: (response) => {
          const token = response.token;
          this.tokenService.setToken(token as string);
          const decodedToken = this.jwtHelper.decodeToken(token as string);

          const roles = decodedToken.authorities;
          if (roles.includes('USER')) {
            this.loadStudent();
            this.router.navigate(['student']);
          } else if (roles.includes('ADMIN')) {
            this.router.navigate(['admin']);
          }
        },
        error: (err) => {
          console.log(err);
          this.errorMsg.push(err.error.businessErrorDescription);
        },
      });
  }

  loadUser() {
    const token = this.tokenService.getToken();
    const decodedJwt = jwtDecode(token) as LoadUser$Params;

    this.authService.loadUser(decodedJwt).subscribe({
      next: value => {
        console.log(value);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  loadStudent(): void {
    const token = this.tokenService.getToken();
    this.studentService.getStudentByUser(token).subscribe({
      next: (response) => {
        sessionStorage.setItem('student', JSON.stringify(response));
        this.studentDataService.changeStudent(response); // Share the student data
        this.router.navigate(['student']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  togglePasswordVisibility(event: MouseEvent) {
    event.preventDefault();
    this.hide = !this.hide;
  }


  protected readonly register = register;

  handleRegister() {
    this.router.navigateByUrl("register");
  }
}
