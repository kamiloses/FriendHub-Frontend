import { Component } from '@angular/core';
import {SearchUsersService} from './search-users.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule
  ],
  templateUrl: './header.html',
  standalone: true,
  styleUrl: './header.css'
})
export class Header {

  constructor(private searchUsersService: SearchUsersService) {
  }

  searchedUser!:string


  searchUsers() {
    this.searchUsersService.searchPeople()
      .subscribe({
        next: (response) => {
          console.log('HTTP request successful:', response);
        },
        error: (err) => {
          console.warn("There was some error while singing up: ", err);
        }
      });
  }
}

