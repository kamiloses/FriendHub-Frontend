import { Routes } from '@angular/router';
import {PostDetails} from './post-list/post/post-details/post-details';
import {PostList} from './post-list/post-list';

export const routes: Routes = [

  { path: 'post', component: PostDetails },
  { path: '', component: PostList },
];
