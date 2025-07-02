import { Component } from '@angular/core';
import {Header} from '../../shared/header/header';
import {LeftSidebar} from '../../shared/left-sidebar/left-sidebar';
import {RightSidebar} from '../../shared/right-sidebar/right-sidebar';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-user-profile-layout',
  imports: [
    Header,
    LeftSidebar,
    RightSidebar,
    RouterOutlet
  ],
  templateUrl: './user-profile-layout.html',
  styleUrl: './user-profile-layout.css'
})
export class UserProfileLayout {



}
