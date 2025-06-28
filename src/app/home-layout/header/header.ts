import { Component } from '@angular/core';
import {SearchUsersService} from './search-users.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

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

  constructor(private searchUsersService: SearchUsersService,private router:Router) {
  }

  searchedUser!:string


  searchUsers() {
    this.searchUsersService.searchPeople()
      .subscribe({
        next: (response) => {
          console.log('HTTP request successful:', response);
          this.router.navigate(['/search']);
        },
        error: (err) => {
          console.warn("There was some error while singing up: ", err);
        }
      });
  }
}

