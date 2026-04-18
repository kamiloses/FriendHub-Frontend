import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {RightSidebarComponent} from './right-sidebar/right-sidebar.component';

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    RightSidebarComponent,
  ],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css'
})
export class HomeLayout {

}
