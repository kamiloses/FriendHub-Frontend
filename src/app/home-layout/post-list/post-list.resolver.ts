import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from '@angular/router';
import { inject } from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {PostListService} from './post-list.service';
import {PostModel} from './post/post.model';

export const postListResolver: ResolveFn<PostModel[]|null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<PostModel[]|null> => {
  const postListService= inject(PostListService);

  return postListService.getAllPosts()




};
