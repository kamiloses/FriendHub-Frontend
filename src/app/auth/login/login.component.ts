import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { LoginRequestModel } from './login-request.model';
import { take } from 'rxjs';
import { AuthService } from '../auth.service';
import { GlobalEnvironmentVariables } from '../global-environment-variables';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  serverError = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  loginForm = new FormGroup({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });

  constructor(
    private loginService: LoginService,
    private authService: AuthService,
    private global: GlobalEnvironmentVariables,
    private router: Router
  ) {}

  // funkcja sprawdzająca walidację kontrolki
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

    this.loginService.login(login).pipe(take(1)).subscribe({
      next: (response: LoginResponseModel) => {
        this.isLoading.set(false);

        // zapis tokenu tylko na login
        this.authService.login(response.token);
        this.global.setGlobalToken(response.token);

        // zapis username z formularza
        this.global.setGlobalUsername(login.username);

        // oznaczamy sesję jako aktywną
        this.global.setGlobalSession(true);

        // redirect do home
        this.router.navigate(['home']);
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 401) {
          this.serverError.set("Your credentials are invalid");
        } else {
          this.serverError.set('Server error, please try again later');
        }
      }
    });
  }
}
