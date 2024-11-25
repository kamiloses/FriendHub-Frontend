import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Comment } from '../../../../models/comment-model';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit , OnDestroy {



  constructor(private httpClient: HttpClient) { }

  comments:Comment[]=[];

  getMainComments(): Comment[] {
    return this.comments.filter(comment => comment.parentCommentId === null);
  }

  replyInput:string=''
  subReplyInput:string=''
  nestedReplyInput:string=''

  private subscription: Subscription | null = null;

  @Input({required:true})currentRoute?: string;



  ngOnInit(): void {

    this.subscription = this.httpClient.get<Comment[]>("http://localhost:7070/api/comments/67357f8a4229ec65dea898dd").subscribe({
      next: (data) => {
        console.log("comment.ts:"+data);
        this.comments = data;
        console.log("abcs"+this.comments[0].userDetails.firstName);
      },
      error: (error) => {
        console.error('Error while downloading data:', error);
      }
    });

  }

  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  sendComment(comment: Comment) {
 console.log("parrentComment"+comment.parentCommentId +"PostId"+comment.postId)

  }





}


