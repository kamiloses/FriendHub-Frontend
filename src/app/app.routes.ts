import { Routes } from '@angular/router';
import {PostDetails} from './post-list/post/post-details/post-details';
import {PostList} from './post-list/post-list';
import {Login} from './auth/login/login';

export const routes: Routes = [

  { path: 'post', component: PostDetails },
  { path: '', component: PostList },
  { path: 'login', component: Login },
];
