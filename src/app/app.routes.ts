import {Routes} from '@angular/router';
import { PostDetailsComponent} from './post-list/post/post-details/post-details';
import {PostList} from './post-list/post-list';
import {Login} from './auth/login/login';
import {HomeLayout} from './home-layout/home-layout';
import {postListResolver} from './post-list/post-list.resolver';
import {Register} from './auth/register/register';

export const routes: Routes = [

  {path: 'post', component: PostDetailsComponent},
  {
    path: '',
    component: HomeLayout,
    children: [
      {path: '', component: PostList
      , resolve: {
          posts: postListResolver
        }

      },
      {path: 'post/1', component: PostDetailsComponent},
    ]
  },

  {path: 'login', component: Login},
  {path:'register',component:Register}
];
