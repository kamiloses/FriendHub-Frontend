import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {CommentModel} from './comment.model';
import {PublishCommentModel} from './publish-comment.model';

@Component({
  selector: 'app-comments',
  imports: [
    FormsModule
  ],
  templateUrl: './comments.html',
  styleUrl: './comments.css'
})
export class Comments implements OnInit , OnDestroy {



  constructor(private httpClient: HttpClient) { }

  comments:CommentModel[]=[];

  getMainComments(): CommentModel[] {
    return this.comments.filter(comment => comment.parentCommentId === null);
  }

  replyInput:string=''
  subReplyInput:string=''
  nestedReplyInput:string=''

  private subscription: Subscription | null = null;

  @Input({required:true})currentRoute!: string;



  ngOnInit(): void {
    console.log("hej "+this.currentRoute)
//683f0ad2ce5a4c4a70c07f53
    this.subscription = this.httpClient.get<CommentModel[]>("http://localhost:8083/api/comments/"+this.currentRoute).subscribe({
      next: (data) => {
        this.comments = data;
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

//  sendComment(comment: CommentModel) {
  sendComment(content:string) {
    const commentModel: PublishCommentModel = {
      postId: this.currentRoute,
      parentCommentId: null,
      content: content
    };
    this.subscription = this.httpClient.post<void[]>("http://localhost:8083/api/comments?username=kamiloses1",commentModel).subscribe({});
    window.location.reload();
  }





}
