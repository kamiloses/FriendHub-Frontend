import {Component, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterService} from './register-service';
import {RegistrationModel} from './registration-model';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class RegisterComponent {


  serverError = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  constructor(private registerService: RegisterService) {
  }


  public registerForm = new FormGroup({
    firstName: new FormControl<string>('', [Validators.required, Validators.pattern("^[A-Za-z]{2,20}$")]),
    lastName: new FormControl<string>('', [Validators.required, Validators.pattern("^[A-Za-z]{2,30}$")]),
    username: new FormControl<string>('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_]{5,20}$")]),
    password: new FormControl<string>('', [Validators.required, Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$")])
  });

  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!(control?.touched && control.invalid);
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      this.serverError.set('Please correct the form errors');
      this.registerForm.markAllAsTouched();
      return;
    }
    this.serverError.set(null);
    this.isLoading.set(true);
    const registrationModel: RegistrationModel = {
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      username: this.registerForm.value.username!,
      password: this.registerForm.value.password!
    }

    this.registerService.signUp(registrationModel).subscribe({
      next: (response) => {
        this.isLoading.set(false);

        if (response === 'User signed up successfully') {
          this.registerForm.reset();
          // TODO: navigate to /login
        } else if (response === 'this Username already exists') {
          this.serverError.set('This username already exists');
        } else {
          this.serverError.set('There was some error on the server side');
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.serverError.set('There was some error on the server side');
      }
    })
  }
}
