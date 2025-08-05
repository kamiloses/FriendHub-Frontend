import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {



  constructor(private router: Router) {
  }

  searchedUser!: string


  searchUsers() {
    this.router.navigate(['/search'], { queryParams: { username: 'dsadadsaddsadsa' } });
  }
}
