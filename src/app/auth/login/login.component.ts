import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {LoginRequestModel} from './login-request.model';
import {take} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

const loginValidation = /^(?!\s*$)[a-zA-Z0-9_]{7,}$/;


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  serverError = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  constructor(private loginService: LoginService,private authService:AuthService,private router: Router) {
  }

  public loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required, Validators.pattern(loginValidation)]),
    password: new FormControl<string>('', [Validators.required, Validators.pattern(loginValidation)])
  });
  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control?.touched && control.invalid);
  }


  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.serverError.set('Please correct the form errors');
      this.loginForm.markAllAsTouched();
      return;
    }
    this.serverError.set(null);
    this.isLoading.set(true);

    const login: LoginRequestModel = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };
//todo cały komponent
    this.loginService.login(login).pipe(take(1)).subscribe({
      next: (response: LoginResponseModel) => {
        this.isLoading.set(false);

           this.authService.login(response.token);
           this.router.navigate(['home']);
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
