import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { LoginRequestModel } from './login-request.model';
import { take } from 'rxjs';
import { AuthService } from '../auth.service';
import { GlobalEnvironmentVariables } from '../global-environment-variables';

interface LoginResponseModel {
  token: string;
}

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

        this.authService.login(response.token, login.username);

        this.global.setGlobalToken(response.token);
        this.global.setGlobalUsername(login.username);
        this.global.setGlobalSession(true);

        this.router.navigate(['home']);
      },
      error: () => {
        this.isLoading.set(false);
        this.serverError.set("Your credentials are invalid");
      }
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control?.touched && control.invalid);
  }
}
