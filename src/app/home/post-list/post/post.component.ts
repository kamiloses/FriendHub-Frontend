import { Component, Input } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { PostModelResponse } from './post-response.model';
import { PostService } from './post.service';
import {GlobalEnvironmentVariables} from '../../../auth/global-environment-variables';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  imports: [
    DatePipe,
  ],
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post!: PostModelResponse;
  loggedUserUsername!: string;

  constructor(
    private postService: PostService,
    private router: Router,
    private global: GlobalEnvironmentVariables
  ) {
    this.loggedUserUsername = this.global.getGlobalUsernameValue() || '';
  }
  goToPostDetail(postId: string) {
    this.router.navigate(['/home/post', postId]);
  }

  retweet(event: MouseEvent): void {
    event.stopPropagation();
    this.post.retweetCount++;
    this.post.retweetedByMe = true;
    this.postService.retweet(Number(this.post.id), this.loggedUserUsername).subscribe();
  }

  undoRetweet(event: MouseEvent): void {
    event.stopPropagation();
    this.post.retweetCount--;
    this.post.retweetedByMe = false;
    this.postService.undoRetweet(Number(this.post.id), this.loggedUserUsername).subscribe();
  }

  likeThePost(event: MouseEvent): void {
    event.stopPropagation();
    this.post.likeCount++;
    this.post.likedByMe = true;
    this.postService.like(Number(this.post.id), this.loggedUserUsername).subscribe();
  }

  unlikeThePost(event: MouseEvent): void {
    event.stopPropagation();
    this.post.likeCount--;
    this.post.likedByMe = false;
    this.postService.unlike(Number(this.post.id), this.loggedUserUsername).subscribe();
  }
}
