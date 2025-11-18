import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchedPeople} from './searched-people.model';
import {WebSocketService} from '../websocket.service';


@Component({
  selector: 'app-search-friends',
  standalone: true,
  imports: [],
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.css']
})
export class SearchFriendsComponent implements OnInit {


  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute
    ,private websocketService:WebSocketService
  ) {
  }

  private searchedUsername!: string
  private currentRoute!: string
  protected searchedPeopleData!:SearchedPeople[]
  protected username: string |null = null
  ngOnInit(): void {
    this.username=sessionStorage.getItem('username');
    console.log("username "+this.username)
    this.currentRoute = this.router.url;

    const lastSlashIndex = this.currentRoute.lastIndexOf('/');
    this.searchedUsername = this.currentRoute.substring(lastSlashIndex + 1);

    console.log("Searched Username: " + this.searchedUsername)
    this.fetchUsers()
  }

  fetchUsers() {

    const headers = new HttpHeaders({
      'myUsername': this.username ?? '',
    });


    this.httpClient.get<SearchedPeople[]>(`http://localhost:8084/api/friends/`+this.searchedUsername,{headers}).subscribe({
      next: (posts) => {
        this.searchedPeopleData = posts;
      },

    });
  }




  onClickUserFriend(friendUsername: string): void {



    const headers = {
      friendUsername: friendUsername,
      myUsername: this.username ?? '',

    };

    this.httpClient.delete<void>('http://localhost:8084/api/friends', {headers})
      .subscribe();
    window.location.reload();
    this.websocketService.sendFriendInvitationNotification()

  }




  onClickUserNotFriend(friendUsername: string): void {



    const headers = {
      friendUsername: friendUsername,
      myUsername: this.username ?? '',

    };

    this.httpClient.post<void>('http://localhost:8084/api/friends',null, {headers})
      .subscribe();
    window.location.reload();

    this.websocketService.sendFriendInvitationNotification()


  }





}
