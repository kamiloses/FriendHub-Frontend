import { Component, signal } from '@angular/core';
import {LoginComponent} from './auth/login/login';
import {Register} from './auth/register/register';

@Component({
  selector: 'app-root',
  imports: [LoginComponent, Register],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FriendHub-Frontend');
}
