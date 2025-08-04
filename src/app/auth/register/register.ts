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
  styleUrl: './register.css'
})
export class Register {


  serverError = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  constructor(private registerService: RegisterService) {
  }


  public registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern("^[A-Za-z]{2,20}$")
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern("^[A-Za-z]{2,30}$")
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9_]{5,20}$")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$")
    ])
  });


  get firstNameInvalid(): boolean {
    const firstNameInput = this.registerForm.get('firstName');
    return !!(firstNameInput?.touched && firstNameInput.invalid);
  }


  get lastNameInvalid(): boolean {
    const lastNameInput = this.registerForm.get('lastName');
    return !!(lastNameInput?.touched && lastNameInput.invalid);
  }


  get usernameInvalid(): boolean {
    const usernameInput = this.registerForm.get('username');
    return !!(usernameInput?.touched && usernameInput.invalid);
  }


  get passwordInvalid(): boolean {
    const passwordInput = this.registerForm.get('password');
    return !!(passwordInput?.touched && passwordInput.invalid);
  }


  onSubmit() {
    if (this.registerForm.valid) {
      this.serverError.set('Please correct the form errors');
      this.registerForm.markAllAsTouched();
      return;
    }
    this.serverError.set(null);
    this.isLoading.set(true);
    const registrationModel:RegistrationModel={
      firstName:this.registerForm.value.firstName!,
      lastName:this.registerForm.value.lastName!,
      username:this.registerForm.value.username!,
      password:this.registerForm.value.password!
    }



  }
}
