import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchedUserModel} from './searched-user.model';
import {SearchUserService} from './search-user.service';

@Component({
  selector: 'app-search-user',
  imports: [],
  templateUrl: './search-user.html',
  styleUrl: './search-user.css'
  ,standalone:true
})
export class SearchUser implements OnInit {

  constructor(private route: ActivatedRoute,private searchUserService:SearchUserService) {
  }


  searchedUsers: SearchedUserModel[] = [];


  ngOnInit() {
    this.fetchUsers();
  }


  onClickUserMyFriend(){

    this.searchUserService.removeFriend("dsadadsaddsadsa").subscribe()

  }

  onClickUserNotFriend(){//todo zmien nazwe
    this.searchUserService.addFriend("dsadadsaddsadsa").subscribe()

  }



  fetchUsers() {
    this.route.data.subscribe(data => {
      this.searchedUsers = data['searchedUsers'];
    });//todo obsluzyc jeszcze jakos
  }
}
