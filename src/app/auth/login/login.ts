import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {LoginService} from './login.service';
import {LoginModel} from './login.model';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.html',
  standalone: true,
  styleUrls: ['./login.css']
})
export class Login {

  loginError: string = "";

  public loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern("^(?!\\s*$)[a-zA-Z0-9_]{7,}$")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern("^(?!\\s*$)[a-zA-Z0-9_]{7,}$")
    ])
  });

  constructor(private loginService: LoginService, private router: Router,private authService:AuthService) {}

  onSubmit(): void {


    const login: LoginModel = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };

    this.loginService.login({loginData: login}).subscribe({
      next: (response: LoginResponse) => {
        console.log("response ",response)
        if (response.token) {
         this.authService.login(response.token);
         this.router.navigate(['/']);


        }
      },
      error: () => {
        this.loginError = 'Your credentials are invalid';
      }
    });
  }

  get usernameInvalid(): boolean {
    const usernameInput = this.loginForm.get('username');
    return !!(usernameInput?.touched && (usernameInput.errors?.['pattern'] || usernameInput.errors?.['required']));
  }

  get passwordInvalid(): boolean {
    const passwordInput = this.loginForm.get('password');
    return !!(passwordInput?.touched && (passwordInput.errors?.['pattern'] || passwordInput.errors?.['required']));
  }

}
