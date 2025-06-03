import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {LoginModel} from '../../models/login.model';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

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

  constructor(private httpClient: HttpClient) {
  }

  loginError:string=""


  public loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern("^(?!\\s*$)[a-zA-Z0-9_]{7,}$")
      ]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern("^(?!\\s*$)[a-zA-Z0-9_]{7,}$")
      ]
    })
  });

  get usernameInvalid(): boolean {
    const usernameInput = this.loginForm.get('username');
    //&& usernameInput.dirty
    if (usernameInput?.touched &&  usernameInput.errors?.['pattern'])
      return true;
    else {
      return false}

  }


  onSubmit(): void {
    const login: LoginModel = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };

    this.httpClient.post<any>("http://localhost:7070/api/login", login).subscribe(
      {next:(response:string)=>{
        if (response.startsWith("token")){
          console.log("poprawnie")
        }},
        error:(error)=>{
          console.error('Error while trying to log in', error);
          this.loginError = 'Your credentials are invalid';

        }



      }

    )


  }
}
