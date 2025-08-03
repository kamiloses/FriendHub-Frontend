import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from './login-service';
import {LoginModel} from './loginModel';
import {take} from 'rxjs';

const loginValidation = /^(?!\s*$)[a-zA-Z0-9_]{7,}$/;


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class LoginComponent {


  serverError = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  constructor(private loginService: LoginService) {
  }

  public loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.pattern(loginValidation)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(loginValidation)
    ])
  });

  get usernameInvalid(): boolean {
    const usernameInput = this.loginForm.get('username');
    return !!(usernameInput?.touched && usernameInput.invalid);
  }

  get passwordInvalid(): boolean {
    const passwordInput = this.loginForm.get('password');
    return !!(passwordInput?.touched && passwordInput.invalid);
  }


  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.serverError.set('Please correct the form errors');
      this.loginForm.markAllAsTouched();
      return;
    }
    this.serverError.set(null);
    this.isLoading.set(true);

    const login: LoginModel = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };

    this.loginService.login(login).pipe(take(1)).subscribe({ //todo ogarnij take 1
      next: (response: LoginResponse) => {
        this.isLoading.set(false);
        if (response.token) {
          // this.authService.login(response.token);
          // this.router.navigate(['/']);
        } else {
          this.serverError.set('Unexpected server response')
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.isLoading.set(false);
        if (err.status === 401) {
          this.serverError.set("Your credentials are invalid");
        } else {
          this.serverError.set('Server error, please try again later')
        }

      }
    });


  }

}
