import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import { PostModel } from '../models/post.model';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {PostListService} from './post-list.service';

export const postListResolver: ResolveFn<PostModel[]|null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<PostModel[]|null> => {
  const postListService= inject(PostListService);

  return postListService.getAllPosts()




};
