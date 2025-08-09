import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Comment} from './comment/comment';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-comments-list',
  imports: [
    Comment
  ],
  templateUrl: './comments-list.html',
  styleUrl: './comments-list.css'
})
export class CommentsList implements OnInit , OnDestroy {

  constructor(private commentListService: CommentListService) {
  }




  comments: CommentModel[] = [];
  private subscription: Subscription | null = null;

  @Input({required: true}) currentRoute!: string;


  ngOnInit(): void {
    this.commentListService.findCommentsRelatedWithPost(this.currentRoute).subscribe({
      next:(data)=>{
        this.comments=data
      }})

  }


  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  sendComment(content: string) {
    const commentModel: PublishCommentModel = {
      postId: this.currentRoute,
      parentCommentId: null,//todo to
      content: content
    };

    this.commentListService.sendComment("kamiloses1",commentModel).subscribe()

    window.location.reload();

  }
}
