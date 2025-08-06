import {Routes} from '@angular/router';
import {AuthLayoutComponent} from './auth/auth-layout';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeLayout} from './home/home-layout';
import {UserProfile} from './user-profile/user-profile';
import {PostListComponent} from './home/post-list/post-list.component';
import {Post} from './home/post-list/post/post';
import {PostDetails} from './home/post-list/post/post-details/post-details';

export const routes: Routes = [
  {path: '', redirectTo: 'auth/login', pathMatch: 'full'},//todo pathmatch
  {
    path: 'auth', component: AuthLayoutComponent
    , children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  },
  {
    path: 'home', component: HomeLayout, children: [{
      path: 'profile', component: UserProfile},
      { path: '', component: PostListComponent },
      { path: 'home/post/100', component: PostDetails },
    ]
  }


];


//todo nazewnictwo componentów czy nazwa component ma byc czy usunąc. dokladnie sprawdz.
