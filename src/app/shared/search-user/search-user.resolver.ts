import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import {SearchUserService} from './search-user.service';
import {Observable} from 'rxjs';
import {SearchedUserModel} from './searched-user.model';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<SearchedUserModel[]> {
  constructor(private searchUserService: SearchUserService) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SearchedUserModel[]> {
    const username = route.queryParamMap.get('username')!;
    return this.searchUserService.searchPeople(username);

  }}
