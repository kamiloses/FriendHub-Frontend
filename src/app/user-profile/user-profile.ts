import { Component } from '@angular/core';
import {PostList} from '../post-list/post-list';

@Component({
  selector: 'app-user-profile',
  imports: [
    PostList
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile {

}
