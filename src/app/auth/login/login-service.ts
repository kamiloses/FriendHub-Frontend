import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginModel} from './loginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

constructor(private http: HttpClient) {}


  login(loginData:LoginModel):Observable<LoginResponse> {
   return  this.http.post<LoginResponse>("http://localhost:7070/api/login", loginData)
  }


}
