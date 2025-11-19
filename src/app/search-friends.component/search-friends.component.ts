import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {GlobalEnvironmentVariables} from '../auth/global-environment-variables';

export interface SearchedPeople {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  isYourFriend: boolean;
}

@Component({
  selector: 'app-search-friends',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './search-friends.component.html',
  styleUrls: ['./search-friends.component.css']
})
export class SearchFriendsComponent implements OnInit {

  searchedUsername!: string;
  searchedPeopleData: SearchedPeople[] = [];
  username!: string;

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute,
    private global: GlobalEnvironmentVariables
  ) {}

  ngOnInit(): void {
    this.searchedUsername = this.activatedRoute.snapshot.paramMap.get('username') || '';
    this.username = this.global.getGlobalUsernameValue() || '';
    this.fetchUsers();
  }

  fetchUsers() {
    const headers = new HttpHeaders({ 'myUsername': this.username });
    this.httpClient.get<SearchedPeople[]>(`http://localhost:8084/api/friends/${this.searchedUsername}`, { headers })
      .subscribe(posts => this.searchedPeopleData = posts);
  }

  onClickUserFriend(friendUsername: string) {
    const headers = new HttpHeaders({ 'myUsername': this.username, 'friendUsername': friendUsername });
    this.httpClient.delete<void>('http://localhost:8084/api/friends', { headers })
      .subscribe(() => this.fetchUsers());
  }

  onClickUserNotFriend(friendUsername: string) {
    const headers = new HttpHeaders({ 'myUsername': this.username, 'friendUsername': friendUsername });
    this.httpClient.post<void>('http://localhost:8084/api/friends', null, { headers })
      .subscribe(() => this.fetchUsers());
  }
}
