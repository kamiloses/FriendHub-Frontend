import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  searchedUser: string = '';

  constructor(private router: Router) {}

  onSearch() {
    const username = this.searchedUser.trim();
    if (username) {
      this.router.navigate(['/home/search', username]);
    }
  }
}
