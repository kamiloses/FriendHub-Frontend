import {Component, Injectable} from '@angular/core';
import { LoginModel } from '../../models/login.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) {}

  login(loginData: LoginModel): Observable<string> {
    return this.httpClient.post<string>("http://localhost:7070/api/login", loginData);
  }

}
