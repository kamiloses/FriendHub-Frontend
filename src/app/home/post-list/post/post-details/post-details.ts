import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostModelResponse } from '../post-response.model';
import { PostDetailsService } from './post-details.service';
import { CommentsList } from './comments-list/comments-list';
import { PublishCommentModel } from './comments-list/comment/publishCommentModel';
import { CommentService } from './comments-list/comment/comment.service';

@Component({
  selector: 'app-post-details',
  imports: [
    FormsModule,
    CommentsList
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetails implements OnInit {
  text: string = "";
  postId!: string;

  protected post = signal<PostModelResponse | null>(null);
  protected serverError = signal<string | null>(null);
  protected isLoading = signal<boolean>(false);

  constructor(
    private readonly postDetailsService: PostDetailsService,
    private readonly route: ActivatedRoute,
    private readonly commentService: CommentService
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
        console.error(err);
        this.serverError.set("There was an error fetching post.");
        this.isLoading.set(false);
      }
    });
  }

  reloadPosts(): void {
    this.loadPost(this.postId);
  }

  onPublish() {
    if (!this.text || this.text.trim() === '') return;

    const commentModel: PublishCommentModel = {
      postId: this.postId,
      parentCommentId: null, // komentarz główny
      content: this.text.trim()
    };

    this.commentService.sendComment("kamilosesx", commentModel).subscribe({
      next: () => {
        this.text = '';
        this.reloadPosts(); // odświeżamy komentarze
      },
      error: err => console.error(err)
    });
  }
}
