import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FriendsModel} from '../search-friends/friends.model';

@Injectable({
  providedIn: 'root'
})
export class SearchUsersService {

  constructor(private http:HttpClient) { }


    //todo zmien nazwe z friendsMOdel
  searchPeople(): Observable<FriendsModel[]> {

    const headers = new HttpHeaders({
      'myUsername': 'kamiloses1'
    });
    return this.http.get<FriendsModel[]>("http://localhost:8084/api/friends/dsadadsaddsadsa",{headers});
  }

}
