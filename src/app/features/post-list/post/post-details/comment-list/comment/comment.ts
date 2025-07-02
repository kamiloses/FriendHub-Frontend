import {Component, Input} from '@angular/core';
import {CommentModel} from './comment.model';
import {FormsModule} from '@angular/forms';
import {CommentListService} from '../comment-list.service';
import {PublishCommentModel} from '../publish-comment.model';

@Component({
  selector: 'app-comment',
  imports: [
    FormsModule
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

  sendReply(content:string,parentCommentId:string){

    const commentModel: PublishCommentModel = {
      postId: this.currentRoute,
      parentCommentId: parentCommentId,
      content: content
    };

    console.log("HEJ"+commentModel.parentCommentId)

    this.commentListService.sendComment("kamiloses1",commentModel).subscribe()




  }


}
