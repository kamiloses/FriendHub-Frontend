import { Component, signal } from '@angular/core';
import {RegisterComponent} from './auth/register/register';

@Component({
  selector: 'app-root',
  imports: [ RegisterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FriendHub-Frontend');
}
