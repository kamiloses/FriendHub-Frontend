import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {SearchedPeople} from './searched-people.model';
import {FriendsService} from './search-friends.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private friendsService: FriendsService
  ) {}

  ngOnInit(): void {
    this.searchedUsername = this.activatedRoute.snapshot.paramMap.get('username') || '';
    this.fetchUsers();
  }

  fetchUsers() {
    this.friendsService.getSearchedPeople(this.searchedUsername)
      .subscribe(users => this.searchedPeopleData = users);
  }

  onClickUserFriend(friendUsername: string) {
    this.friendsService.removeFriend(friendUsername).subscribe(() => this.fetchUsers());
  }

  onClickUserNotFriend(friendUsername: string) {
    this.friendsService.addFriend(friendUsername).subscribe(() => this.fetchUsers());
  }
}
