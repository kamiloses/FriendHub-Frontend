import { Component } from '@angular/core';
import {Header} from './header/header';
import {LeftSidebar} from './left-sidebar/left-sidebar';
import {RightSidebar} from './right-sidebar/right-sidebar';
import {RouterOutlet} from '@angular/router';
import {PostListComponent} from './post-list/post-list.component';

@Component({
  selector: 'app-home-layout',
  imports: [
    Header,
    LeftSidebar,
    RightSidebar,
    RouterOutlet,
    PostListComponent
  ],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css'
})
export class HomeLayout {

}
