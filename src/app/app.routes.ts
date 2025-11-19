import {Routes} from '@angular/router';
import {AuthLayoutComponent} from './auth/auth-layout';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeLayout} from './home/home-layout';
import {PostListComponent} from './home/post-list/post-list.component';
import {PostDetailsComponent} from './home/post-list/post/post-details/post-details.component';
import {SearchFriendsComponent} from './search-friends.component/search-friends.component';
import {AuthGuard} from './auth/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth', component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },

  {
    path: 'home',
    component: HomeLayout,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: PostListComponent },
      { path: 'post/:id', component: PostDetailsComponent },
      { path: 'search/:username', component: SearchFriendsComponent },
    ]
  }
];
