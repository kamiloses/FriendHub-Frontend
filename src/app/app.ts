import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './header/header';
import {RightSidebar} from './right-sidebar/right-sidebar';
import {LeftSidebar} from './left-sidebar/left-sidebar';
import {PostList} from './post-list/post-list';
import {Login} from './auth/login/login';

@Component({
  selector: 'app-root',
  imports: [Header, RightSidebar, LeftSidebar, PostList, RouterOutlet, Login],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected title = 'FriendHub-Frontend';
}
