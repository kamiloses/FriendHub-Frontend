import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import {PostModelResponse} from './post-response.model';
import {PostService} from './post.service';
@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() post!: PostModelResponse;
  @Input() loggedUserUsername!: string;

  constructor(private postService: PostService) {}

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
