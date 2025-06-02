import {Routes} from '@angular/router';
import {PostDetails} from './post-list/post/post-details/post-details';
import {PostList} from './post-list/post-list';
import {Login} from './auth/login/login';
import {HomeLayout} from './home-layout/home-layout';

export const routes: Routes = [

  {path: 'post', component: PostDetails},
  {
    path: '',
    component: HomeLayout,
    children: [
      {path: '', component: PostList},
      {path: 'post/1', component: PostDetails},
    ]
  },

  {path: 'login', component: Login},
];
