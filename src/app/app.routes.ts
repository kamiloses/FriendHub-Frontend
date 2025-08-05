import {Routes} from '@angular/router';
import {AuthLayoutComponent} from './auth/auth-layout';
import {LoginComponent} from './auth/login/login';
import {RegisterComponent} from './auth/register/register';
import {HomeLayout} from './home/home-layout';
import {UserProfile} from './user-profile/user-profile';

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
      path: 'profile', component: UserProfile
    }]
  }


];


//todo nazewnictwo componentów czy nazwa component ma byc czy usunąc. dokladnie sprawdz.
