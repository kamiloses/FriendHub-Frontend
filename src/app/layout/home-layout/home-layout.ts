import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {LeftSidebar} from '../../shared/left-sidebar/left-sidebar';
import {RightSidebar} from '../../shared/right-sidebar/right-sidebar';
import {Header} from '../../shared/header/header';

@Component({
  selector: 'app-home-layout',
  standalone:true,
  imports: [
    RouterOutlet,
    LeftSidebar,
    RightSidebar,
    Header
  ],
  templateUrl: './home-layout.html',
  styleUrl: './home-layout.css'
})
export class HomeLayout {

}
