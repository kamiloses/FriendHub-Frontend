import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { Subscription} from 'rxjs';
import {PublishCommentModel} from './publish-comment.model';
import {Comment} from './comment/comment';
import {CommentModel} from './comment/comment.model';
import {CommentListService} from './comment-list.service';

@Component({
  selector: 'app-comment-list',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    Comment
  ],
  templateUrl: './comment-list.html',
  styleUrl: './comment-list.css',
  standalone:true
})
export class CommentList implements OnInit , OnDestroy {

  constructor(private commentListService: CommentListService) {
  }




  comments: CommentModel[] = [];
  private subscription: Subscription | null = null;

  @Input({required: true}) currentRoute!: string;


  ngOnInit(): void {
    this.commentListService.findCommentsRelatedWithPost("").subscribe({
      next:(data)=>{
        this.comments=data
      }})
  }


  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

//  sendComment(comment: CommentModel) {
  sendComment(content: string) {
    const commentModel: PublishCommentModel = {
      postId: this.currentRoute,
      parentCommentId: null,
      content: content
    };
   this.commentListService.sendComment("kamiloses1",commentModel).subscribe()

    window.location.reload();

  }
}
