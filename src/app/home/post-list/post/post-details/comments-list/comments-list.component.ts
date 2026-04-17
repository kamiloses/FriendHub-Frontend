import { Component, Input, OnInit, Output, EventEmitter, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentsListService } from './comments-list.service';
import { CommentResponseModel } from './comment/comment-response.model';
import { CommentComponent } from './comment/comment.component';

@Component({
    selector: 'app-comments-list',
    imports: [CommentComponent],
    templateUrl: './comments-list.component.html',
    standalone: true,
    styleUrl: './comments-list.component.css'
})
export class CommentsListComponent implements OnInit {

  @Input({ required: true }) currentRoute!: string;
  @Output() commentPublished = new EventEmitter<void>();

  fetchComments = signal<CommentResponseModel[]>([]);
  isLoading = signal(false);
  serverError = signal<string | null>(null);

  private subscription: Subscription | null = null;

  constructor(private readonly commentListService: CommentsListService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.isLoading.set(true);
    this.serverError.set(null);

    this.subscription = this.commentListService
      .findCommentsRelatedWithPost(this.currentRoute)
      .subscribe({
        next: (comments) => {
          this.isLoading.set(false);
          this.fetchComments.set(this.buildTree(comments));
        },
        error: (err) => {
          this.isLoading.set(false);
          this.serverError.set('Error loading comments');
          console.error(err);
        }
      });
  }

  buildTree(comments: CommentResponseModel[]) {
    const map = new Map<string, any>();
    const roots: any[] = [];

    comments.forEach(c => {
      map.set(c.id, { ...c, replies: [] });
    });

    map.forEach(c => {
      if (c.parentCommentId) {
        const parent = map.get(c.parentCommentId);
        parent?.replies.push(c);
      } else {
        roots.push(c);
      }
    });

    return roots;
  }

  onChildCommentPublished() {
    this.commentPublished.emit();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
