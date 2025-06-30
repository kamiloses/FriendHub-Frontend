import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginModel} from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  login({loginData}: { loginData: LoginModel }): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>("http://localhost:7070/api/login", loginData);
  }

}
