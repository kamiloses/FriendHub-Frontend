import {Component, OnInit, signal} from '@angular/core';
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

  searchedUsername = signal('');
  searchedPeopleData = signal<SearchedPeople[]>([]);
  isLoading = signal(false);

  constructor(
    private activatedRoute: ActivatedRoute,
    private friendsService: FriendsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const username = params.get('username') || '';
      this.searchedUsername.set(username);
      this.fetchUsers();
    });
  }

  fetchUsers() {
    this.isLoading.set(true);

    this.friendsService.getSearchedPeople(this.searchedUsername())
      .subscribe(users => {
        this.searchedPeopleData.set(users);
        this.isLoading.set(false);
      });
  }

  onClickUserNotFriend(username: string) {
    this.friendsService.addFriend(username).subscribe(() => {
      this.searchedPeopleData.update(users =>
        users.map(u =>
          u.username === username ? { ...u, isYourFriend: true } : u
        )
      );
    });
  }

  onClickUserFriend(username: string) {
    this.friendsService.removeFriend(username).subscribe(() => {
      this.searchedPeopleData.update(users =>
        users.map(u =>
          u.username === username ? { ...u, isYourFriend: false } : u
        )
      );
    });
  }
}
