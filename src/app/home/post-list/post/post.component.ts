import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModelResponse } from './post-response.model';
import { PostService } from './post.service';
import { GlobalEnvironmentVariables } from '../../../auth/global-environment-variables';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  imports: [DatePipe]
})
export class PostComponent implements OnInit {

  @Input() post!: PostModelResponse;
  loggedUserUsername: string | null = null;

  constructor(
    private postService: PostService,
    private router: Router,
    private global: GlobalEnvironmentVariables
  ) {}

  ngOnInit(): void {
    this.loggedUserUsername = this.global.getGlobalUsernameValue();
  }

  goToPostDetail(postId: string): void {
    this.router.navigate(['/home/post', postId]);
  }

  retweet(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.loggedUserUsername) return;

    this.post.retweetCount++;
    this.post.retweetedByMe = true;

    this.postService.retweet(this.post.id, this.loggedUserUsername)
      .subscribe({
        error: () => {
          this.post.retweetCount--;
          this.post.retweetedByMe = false;
        }
      });
  }

  undoRetweet(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.loggedUserUsername) return;

    this.post.retweetCount--;
    this.post.retweetedByMe = false;

    this.postService.undoRetweet(this.post.id, this.loggedUserUsername)
      .subscribe({
        error: () => {
          this.post.retweetCount++;
          this.post.retweetedByMe = true;
        }
      });
  }

  likeThePost(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.loggedUserUsername) return;

    this.post.likeCount++;
    this.post.likedByMe = true;

    this.postService.like(this.post.id, this.loggedUserUsername)
      .subscribe({
        error: () => {
          this.post.likeCount--;
          this.post.likedByMe = false;
        }
      });
  }

  unlikeThePost(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.loggedUserUsername) return;

    this.post.likeCount--;
    this.post.likedByMe = false;

    this.postService.unlike(this.post.id, this.loggedUserUsername)
      .subscribe({
        error: () => {
          this.post.likeCount++;
          this.post.likedByMe = true;
        }
      });
  }
}
