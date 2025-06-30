import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchedUserModel} from './searched-user.model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'})
export class SearchUserService {
  constructor(private http: HttpClient) {
  }
  //todo zmien nazwe z friendsMOdel
  searchPeople(username:string): Observable<SearchedUserModel[]> {

    const headers = new HttpHeaders({
      'myUsername': 'kamiloses1'
    });
    return this.http.get<SearchedUserModel[]>("http://localhost:8084/api/friends/"+username,{headers});
  }
}
