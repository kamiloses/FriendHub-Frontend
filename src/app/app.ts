import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Login} from './auth/login/login';

@Component({
  selector: 'app-root',
  imports: [ Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FriendHub-Frontend');
}
