import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {GlobalEnvironmentVariables} from '../../auth/global-environment-variables';
import {SearchedPeople} from './searched-people.model';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private apiUrl = 'http://localhost:8084/api/friends';

  constructor(private http: HttpClient, private global: GlobalEnvironmentVariables) {}

  getSearchedPeople(searchedUsername: string): Observable<SearchedPeople[]> {
    const username = this.global.getGlobalUsernameValue() || '';
    const headers = new HttpHeaders({ 'myUsername': username });
    return this.http.get<SearchedPeople[]>(`${this.apiUrl}/${searchedUsername}`, { headers });
  }

  addFriend(friendUsername: string): Observable<void> {
    const username = this.global.getGlobalUsernameValue() || '';
    const headers = new HttpHeaders({ 'myUsername': username, 'friendUsername': friendUsername });
    return this.http.post<void>(this.apiUrl, null, { headers });
  }

  removeFriend(friendUsername: string): Observable<void> {
    const username = this.global.getGlobalUsernameValue() || '';
    const headers = new HttpHeaders({ 'myUsername': username, 'friendUsername': friendUsername });
    return this.http.delete<void>(this.apiUrl, { headers });
  }
}
