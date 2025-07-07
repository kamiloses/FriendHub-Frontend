import {Component, Input} from '@angular/core';
import {CommentModel} from './comment.model';
import {FormsModule} from '@angular/forms';
import {CommentListService} from '../comment-list.service';
import {PublishCommentModel} from '../publish-comment.model';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './comment.html',
  styleUrl: './comment.css',
  standalone:true
})
export class Comment {
  @Input() comment!: CommentModel;
  @Input({required: true}) currentRoute!: string;
  isExpanded = false;

  constructor(private commentListService:CommentListService) {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
  showReplyInput = false;
  sendReply(content:string,parentCommentId:string){

    const commentModel: PublishCommentModel = {
      postId: this.currentRoute,
      parentCommentId: parentCommentId,
      content: content
    };


    this.commentListService.sendComment("kamiloses1",commentModel).subscribe();
    window.location.reload();
    this.showReplyInput = false;



  }


}
