import { Component, Input, OnInit, Output, EventEmitter, signal } from '@angular/core';
import { CommentResponseModel } from './comment/comment-response.model';
import { CommentsListService } from './comments-list.service';
import { Subscription } from 'rxjs';
import { Comment } from './comment/comment';

@Component({
  selector: 'app-comments-list',
  imports: [Comment],
  templateUrl: './comments-list.html',
  styleUrl: './comments-list.css'
})
export class CommentsList implements OnInit {
  @Input({ required: true }) currentRoute!: string;
  @Output() commentPublished = new EventEmitter<void>();

  protected fetchComments = signal<CommentResponseModel[]>([]);
  protected isLoading = signal<boolean>(false);
  protected serverError = signal<string | null>(null);

  private subscription: Subscription | null = null;

  constructor(private readonly commentListService: CommentsListService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.isLoading.set(true);
    this.subscription = this.commentListService.findCommentsRelatedWithPost(this.currentRoute)
      .subscribe({
        next: (comments: CommentResponseModel[]) => {
          this.isLoading.set(false);
          this.fetchComments.set(comments);
        },
        error: err => {
          this.isLoading.set(false);
          this.serverError.set("Error loading comments");
          console.error(err);
        }
      });
  }

  onChildCommentPublished() {
    this.commentPublished.emit(); // przepuszczamy event do PostDetails
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
