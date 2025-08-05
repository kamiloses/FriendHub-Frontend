import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegisterRequestModel} from './register-request.model';
import {RegisterResponseModel} from './register-response.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly apiUrl = 'http://localhost:8081/api/user/signup';
   constructor(private http: HttpClient) { }


  signUp(registrationModel: RegisterRequestModel):Observable<RegisterResponseModel> {
    return this.http.post<RegisterResponseModel>(this.apiUrl, registrationModel) //todo sprawdz to {message:string}

  }


}
