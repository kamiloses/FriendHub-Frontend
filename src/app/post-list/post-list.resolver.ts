import { ResolveFn } from '@angular/router';
import { PostModel } from '../models/post.model';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';

export const postListResolver: ResolveFn<PostModel[]|null> = (
  route,
  state
): Observable<PostModel[]|null> => {
  const httpClient = inject(HttpClient);
  const username = 'kamiloses1';

  return httpClient.get<PostModel[]>(`http://localhost:8080/api/posts?username=${username}`)
    .pipe(
      catchError(err => {
        console.error('Resolver error:', err);
        return of(null);
      }))

    ;
};
