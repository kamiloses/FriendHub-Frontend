import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchedUserModel} from './searched-user.model';

@Component({
  selector: 'app-search-user',
  imports: [],
  templateUrl: './search-user.html',
  styleUrl: './search-user.css'
  ,standalone:true
})
export class SearchUser implements OnInit {

  constructor(private route: ActivatedRoute) {
  }


  searchedUsers: SearchedUserModel[] = [];


  ngOnInit() {
    this.fetchUsers();




  }


  fetchUsers() {
    this.route.data.subscribe(data => {
      this.searchedUsers = data['searchedUsers'];
    });//todo obsluzyc jeszcze jakos


  }
}
