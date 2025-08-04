import { Routes } from '@angular/router';
import {AuthLayoutComponent} from './auth/auth-layout';
import {LoginComponent} from './auth/login/login';
import {RegisterComponent} from './auth/register/register';

export const routes: Routes = [
  {path:'',redirectTo:'auth/login',pathMatch:'full'},//todo pathmatch
  {path:'auth',component:AuthLayoutComponent
      ,children:[
      {path:'login',component:LoginComponent},
      {path:'register',component:RegisterComponent}
    ]

  }
];
