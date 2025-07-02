import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import {PostModel} from './post/post.model';
import {PostListService} from './post-list.service';

@Injectable({ providedIn: 'root' })
export class UserPostListResolver implements Resolve<PostModel[] | null> {
  constructor(private postService: PostListService) {}

  resolve(): Observable<PostModel[] | null> {
    return this.postService.getPostsRelatedWithUser();
  }
}
