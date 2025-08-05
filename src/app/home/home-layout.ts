import { Component } from '@angular/core';
import {Header} from './header/header';
import {LeftSidebar} from './left-sidebar/left-sidebar';
import {RightSidebar} from './right-sidebar/right-sidebar';
import {PostList} from '../post-list/post-list';
import {UserProfile} from '../user-profile/user-profile';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home-layout',
  imports: [
    Header,
    LeftSidebar,
    RightSidebar,
    PostList,
    UserProfile,
    RouterOutlet
  ],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css'
})
export class HomeLayout {

}
