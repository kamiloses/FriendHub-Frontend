import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './header/header';
import {RightSidebar} from './right-sidebar/right-sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, RightSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'FriendHub-Frontend';
}
