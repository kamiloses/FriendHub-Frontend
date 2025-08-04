import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegistrationModel} from './registration-model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private constructor(private http: HttpClient) { }


  signUp(registrationModel: RegistrationModel):Observable<{message:string}> {
    return this.http.post<{message:string}>("http://localhost:8081/api/user/signup", registrationModel) //todo sprawdz to message:string

  }


}
