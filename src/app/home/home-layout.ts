import { Component } from '@angular/core';
import {LeftSidebar} from './left-sidebar/left-sidebar.component';
import {RightSidebar} from './right-sidebar/right-sidebar';
import {RouterOutlet} from '@angular/router';
import {Header} from './header/header';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    LeftSidebar,
    RightSidebar,
    RouterOutlet,
    Header
  ],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css'
})
export class HomeLayout {

}
