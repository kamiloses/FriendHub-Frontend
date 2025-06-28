import { Component } from '@angular/core';
import {Header} from "./header/header";
import {LeftSidebar} from "./left-sidebar/left-sidebar";
import {RightSidebar} from "./right-sidebar/right-sidebar";
import {PostList} from './post-list/post-list';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home-layout',
  standalone:true,
  imports: [
    Header,
    LeftSidebar,
    RightSidebar,
    RouterOutlet
  ],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css'
})
export class HomeLayout {

}
