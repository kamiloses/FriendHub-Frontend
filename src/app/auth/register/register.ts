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
    lastName: new FormControl<string>('', [Validators.required, Validators.pattern("^[A-Za-z]{2,30}$")]),//todo dodac generyki w login
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
        this.registerForm.reset();
        console.info(response);
        // TODO: navigate to /login


      },
      error: (err) => {
        this.isLoading.set(false);

        if (Array.isArray(err.error)) {
          this.serverError.set(err.error.join(', '));
          console.error(err.error);
        }
        else if (err.error?.status === 'USER_ALREADY_EXISTS') {
          this.serverError.set('This username already exists');
          console.error(err.error);
        }
        else {
          this.serverError.set('Unexpected error occurred');
          console.error(err.error);
        }
      }
    })
  }
}
