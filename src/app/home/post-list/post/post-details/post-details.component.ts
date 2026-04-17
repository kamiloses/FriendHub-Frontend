import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostModelResponse } from '../post-response.model';
import { PostDetailsService } from './post-details.service';
import { PublishCommentModel } from './comments-list/comment/publishCommentModel';
import { CommentService } from './comments-list/comment/comment.service';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { GlobalEnvironmentVariables } from '../../../../auth/global-environment-variables';
import { DatePipe } from '@angular/common';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    FormsModule,
    CommentsListComponent,
    RouterLink,
    DatePipe
  ],
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  text: string = "";
  postId!: string;

  post = signal<PostModelResponse | null>(null);
  serverError = signal<string | null>(null);
  isLoading = signal(false);

  loggedUserUsername!: string;

  constructor(
    private readonly postDetailsService: PostDetailsService,
    private readonly route: ActivatedRoute,
    private readonly commentService: CommentService,
    private readonly global: GlobalEnvironmentVariables,
    private readonly postService: PostService
  ) {}

  ngOnInit(): void {
    this.loggedUserUsername = this.global.getGlobalUsernameValue() || '';

    this.route.paramMap.subscribe(params => {
      this.postId = params.get('id')!;
      this.loadPost(this.postId);
    });
  }

  loadPost(postId: string): void {
    this.isLoading.set(true);
    this.serverError.set(null);

    this.postDetailsService.getPostById(postId).subscribe({
      next: fetchedPost => {
        this.post.set(fetchedPost);
        this.isLoading.set(false);
      },
      error: () => {
        this.serverError.set("There was an error fetching post.");
        this.isLoading.set(false);
      }
    });
  }

  reloadPosts(): void {
    this.loadPost(this.postId);
  }

  onPublish() {
    if (!this.text?.trim()) return;

    const commentModel: PublishCommentModel = {
      postId: this.postId,
      parentCommentId: null,
      content: this.text.trim()
    };

    const username = this.global.getGlobalUsernameValue();

    this.commentService.sendComment(username!, commentModel).subscribe({
      next: () => {
        this.text = '';
        this.loadPost(this.postId);
      },
      error: err => console.error(err)
    });
  }

  retweet(event: MouseEvent): void {
    event.stopPropagation();

    const post = this.post();
    if (!post) return;
    if (!this.loggedUserUsername) return;

    post.retweetCount++;
    post.retweetedByMe = true;

    this.postService.retweet(post.id, this.loggedUserUsername)
      .subscribe({
        error: () => {
          post.retweetCount--;
          post.retweetedByMe = false;
        }
      });
  }

  undoRetweet(event: MouseEvent): void {
    event.stopPropagation();

    const post = this.post();
    if (!post) return;
    if (!this.loggedUserUsername) return;

    post.retweetCount--;
    post.retweetedByMe = false;

    this.postService.undoRetweet(post.id, this.loggedUserUsername)
      .subscribe({
        error: () => {
          post.retweetCount++;
          post.retweetedByMe = true;
        }
      });
  }

  likeThePost(event: MouseEvent): void {
    event.stopPropagation();

    const post = this.post();
    if (!post) return;
    if (!this.loggedUserUsername) return;

    post.likeCount++;
    post.likedByMe = true;

    this.postService.like(post.id, this.loggedUserUsername)
      .subscribe({
        error: () => {
          post.likeCount--;
          post.likedByMe = false;
        }
      });
  }

  unlikeThePost(event: MouseEvent): void {
    event.stopPropagation();

    const post = this.post();
    if (!post) return;
    if (!this.loggedUserUsername) return;

    post.likeCount--;
    post.likedByMe = false;

    this.postService.unlike(post.id, this.loggedUserUsername)
      .subscribe({
        error: () => {
          post.likeCount++;
          post.likedByMe = true;
        }
      });
  }
}
