import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {SearchedUser} from './searched-user.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'})
export class SearchUserService {
  constructor(private http: HttpClient) {
  }
  //todo zmien nazwe z friendsMOdel
  searchPeople(): Observable<SearchedUser[]> {

    const headers = new HttpHeaders({
      'myUsername': 'kamiloses1'
    });
    return this.http.get<SearchedUser[]>("http://localhost:8084/api/friends/dsadadsaddsadsa",{headers});
  }
}
