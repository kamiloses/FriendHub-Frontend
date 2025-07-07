import {Routes} from '@angular/router';
import {Login} from './auth/login/login';
import {HomeLayout} from './layout/home-layout/home-layout';
import {SearchUser} from './shared/search-user/search-user';
import {UserResolver} from './shared/search-user/search-user.resolver';
import {Register} from './auth/register/register';
import {PostList} from './features/post-list/post-list';
import {postListResolver} from './features/post-list/post-list.resolver';
import {PostDetailsComponent} from './features/post-list/post/post-details/post-details';
import {UserProfileLayout} from './layout/user-profile-layout/user-profile-layout';
import {UserPostListResolver} from './features/post-list/user-post-list.resolver';
import {AuthGuard} from './auth/auth.guard';

export const routes: Routes = [

  // {path: 'post', component: PostDetailsComponent},
  {path:'profile/kamiloses1',component:UserProfileLayout,
    children: [
         {path:"profile/kamiloses1",
          component:PostList,
          resolve:{
          userPosts:UserPostListResolver}},]},



      {
    path: '',
    component: HomeLayout,canActivate:[AuthGuard],
    children: [
      {


        path: 'search',
        component: SearchUser
        ,resolve:{
          searchedUsers:UserResolver
        }
      },



      {path: '', component: PostList
      , resolve: {
          posts: postListResolver
        }

      },
      {path: 'post/:id', component: PostDetailsComponent},
    ]
  },
  {path: 'login', component: Login},
  {path:'register',component:Register}
];
