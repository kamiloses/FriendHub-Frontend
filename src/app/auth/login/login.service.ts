import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginRequestModel} from './login-request.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = 'http://localhost:7070/api/login';

constructor(private http: HttpClient) {}


  login(loginData:LoginRequestModel):Observable<LoginResponseModel> {
   return  this.http.post<LoginResponseModel>(this.apiUrl, loginData)
  }


}
