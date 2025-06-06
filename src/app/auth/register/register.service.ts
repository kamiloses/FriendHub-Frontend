import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RegistrationModel} from '../../models/registration.model';
import {Observable} from 'rxjs';

@Injectable({providedIn: "root"})
export class RegisterService {

  constructor(private http: HttpClient) {
  }


  signUp(registrationModel: RegistrationModel):Observable<string> {
    return this.http.post<string>("http://localhost:8083", registrationModel)


  }

}
