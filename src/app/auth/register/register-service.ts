import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegistrationModel} from './registration-model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private constructor(private http: HttpClient) { }


  signUp(registrationModel: RegistrationModel):Observable<string> {
    return this.http.post<string>("http://localhost:8081/api/user/signup", registrationModel)

  }


}
