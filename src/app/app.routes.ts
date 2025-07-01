import {Routes} from '@angular/router';
import {PostList} from './home-layout/post-list/post-list';
import {Login} from './auth/login/login';
import {HomeLayout} from './home-layout/home-layout';
import {postListResolver} from './home-layout/post-list/post-list.resolver';
import {Register} from './auth/register/register';
import {PostDetailsComponent} from './home-layout/post-list/post/post-details/post-details';
import {SearchUser} from './home-layout/search-user/search-user';
import {UserResolver} from './home-layout/search-user/search-user.resolver';
import {UserProfile} from './home-layout/user-profile/user-profile';

export const routes: Routes = [

  // {path: 'post', component: PostDetailsComponent},


  {
    path: '',
    component: HomeLayout,
    children: [
      {path:'profile/kamiloses1',component:UserProfile},

      {


        path: 'search',//todo dynamiczne search chyba i sprawdz czy ts ma zawierac nazwe component
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
