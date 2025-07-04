import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterService} from './register.service';
import {RegistrationModel} from './registration.model';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  constructor(private registerService: RegisterService) {
  }

  protected readonly onsubmit = onsubmit;

  registrationError: string = "";

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


  onSubmit() {
    const registrationModel: RegistrationModel = {
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      username: this.registerForm.value.username!,
      password: this.registerForm.value.password!};

    this.registerService.signUp(registrationModel)
      .subscribe({next:(response)=> {
          console.log('HTTP request successful:', response);
         // this.router.navigate(['/login']);
        },
        error:(err)=>{
        console.warn("There was some error while singing up: ",err )

        }
      })

  }


  get usernameInvalid(): boolean {
    const usernameInput = this.registerForm.get('username');
    return !!(usernameInput?.touched && (usernameInput.errors?.['pattern'] || usernameInput.errors?.['required']));
  }


}
