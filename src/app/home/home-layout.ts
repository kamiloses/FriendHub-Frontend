import { Component } from '@angular/core';
import {LeftSidebarComponent} from './left-sidebar/left-sidebar.component';
import {RightSidebar} from './right-sidebar/right-sidebar';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    LeftSidebarComponent,
    RightSidebar,
    RouterOutlet,
    HeaderComponent,
    RightSidebar
  ],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css'
})
export class HomeLayout {

}
