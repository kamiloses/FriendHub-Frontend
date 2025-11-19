import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostModelResponse } from '../post-response.model';
import { PostDetailsService } from './post-details.service';
import { PublishCommentModel } from './comments-list/comment/publishCommentModel';
import { CommentService } from './comments-list/comment/comment.service';
import {CommentsListComponent} from './comments-list/comments-list.component';
import {GlobalEnvironmentVariables} from '../../../../auth/global-environment-variables';

@Component({
  selector: 'app-post-details',
  imports: [
    FormsModule,
    CommentsListComponent
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetailsComponent implements OnInit {
  text: string = "";
  postId!: string;
  post = signal<PostModelResponse | null>(null);
  serverError = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  constructor(
    private readonly postDetailsService: PostDetailsService,
    private readonly route: ActivatedRoute,
    private readonly commentService: CommentService,
    private readonly global: GlobalEnvironmentVariables
  ) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id')!;
    this.loadPost(this.postId);
  }

  loadPost(postId: string): void {
    this.isLoading.set(true);
    this.postDetailsService.getPostById(postId).subscribe({
      next: fetchedPost => {
        this.post.set(fetchedPost);
        this.isLoading.set(false);
      },
      error: err => {
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
        this.reloadPosts();
      },
      error: err => console.error(err)
    });
  }
}
