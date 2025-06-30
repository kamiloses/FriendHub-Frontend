import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SearchedUserModel} from './searched-user.model';
import {Injectable} from '@angular/core';
import {AuthService} from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'})
export class SearchUserService {
  constructor(private http: HttpClient,private authService:AuthService) {
  }
  //todo zmien nazwe z friendsMOdel
  searchPeople(username:string): Observable<SearchedUserModel[]> {

    const headers = new HttpHeaders({
      'myUsername': 'kamiloses1'
    });
    return this.http.get<SearchedUserModel[]>("http://localhost:8084/api/friends/"+username,{headers});
  }

  addFriend(friendUsername:string){
    const headers = new HttpHeaders({
      'friendUsername': friendUsername,
      'myUsername': this.authService.getUsername()||''//todo popraw to '' potem
    });

    return this.http.post("http://localhost:8084/api/friends",{headers})

  }

  removeFriend(friendUsername:string){
    const headers = new HttpHeaders({
      'friendUsername': friendUsername,
      'myUsername': this.authService.getUsername()||''//todo popraw to '' potem
    });

    return this.http.delete("http://localhost:8084/api/friends",{headers})

  }


}
