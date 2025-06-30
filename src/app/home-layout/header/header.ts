import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {SearchUserService} from '../search-user/search-user.service';

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

  constructor(private searchUsersService: SearchUserService, private router: Router) {
  }

  searchedUser!: string


  searchUsers() {
    this.router.navigate(['/search'], { queryParams: { username: 'dsadadsaddsadsa' } });
  }
}
