import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {LoginModel} from '../../models/login.model';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  standalone: true,
  styleUrls: ['./login.css']
})
export class Login {

  //private httpClient = inject(HttpClient);

  public loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [
        Validators.required,
        // Validators.pattern("^(?!\\s*$)[a-zA-Z0-9_]+$")
      ]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        //  Validators.pattern("^(?!\\s*$).{6,}$")
      ]
    })
  });

  get usernameInvalid(): boolean {
    const usernameInput = this.loginForm.get('username');
    if (usernameInput?.touched && usernameInput.dirty && usernameInput.value == '')
      return true;
    else {

      usernameInput?.reset()
      return false}

  }


  onSubmit(): void {
    const login: LoginModel = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    };

    // this.httpClient.post("http://localhost:7070/login", login).subscribe(value =>
    //   console.log("DZIAŁAAA " + login)
    // );

    console.log("DZIAŁAAA ", login);
  }
}
