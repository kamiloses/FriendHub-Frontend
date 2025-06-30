import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-left-sidebar',
  imports: [
    RouterLink
  ],
  templateUrl: './left-sidebar.html',
  standalone: true,
  styleUrl: './left-sidebar.css'
})
export class LeftSidebar  implements OnInit{

  constructor(private authService:AuthService) {
  }
  username: string | null = null;

  ngOnInit() {
    this.username = this.authService.getUsername();
  }

}
