import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {PublishCommentModel} from './publish-comment.model';
import {CommentModel} from './comment.model';
import {CommentTest} from './comment-example.model';
import {CommentItemComponent} from './comment-item/comment-item';

@Component({
  selector: 'app-comments',
  imports: [
    FormsModule,
    CommentItemComponent,
  ],
  templateUrl: './comments.html',
  styleUrl: './comments.css'
})
export class Comments implements OnInit , OnDestroy {


  constructor(private httpClient: HttpClient) {
  }


  private baseUrl = 'http://localhost:8083/api/comments';


  getCommentsByPostId(postId: string): Observable<CommentModel[]> {
    return this.httpClient.get<CommentModel[]>(`${this.baseUrl}/${postId}`);
  }


  comments: CommentModel[] = [];

  getMainComments(): CommentModel[] {
    return this.comments.filter(comment => comment.parentCommentId === null);
  }

  replyInput: string = ''
  subReplyInput: string = ''
  nestedReplyInput: string = ''

  private subscription: Subscription | null = null;

  @Input({required: true}) currentRoute!: string;






  ngOnInit(): void {
    this.subscription = this.getCommentsByPostId("6864d2a5a003c97bf705524d").subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (error) => {
        console.error('Error while downloading data:', error);
      }
    });
  }



//   ngOnInit(): void {
// //     console.log("hej " + this.currentRoute)
// // //683f0ad2ce5a4c4a70c07f53
// //     this.subscription = this.httpClient.get<CommentModel[]>("http://localhost:8083/api/comments/" + this.currentRoute).subscribe({
// //       next: (data) => {
// //         this.comments = data;
// //       },
// //       error: (error) => {
// //         console.error('Error while downloading data:', error);
// //       }
// //     });
//   }

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
    this.subscription = this.httpClient.post<void[]>("http://localhost:8083/api/comments?username=kamiloses1", commentModel).subscribe({});
    window.location.reload();
  }


  CommentSchema: CommentTest[] = [
    {
      "text": "comment 1",
      "children": [
        {
          "text": "comment 1.1",
          "children": [
            {
              "text": "comment 1.1.1"
            }
          ]
        },
        {
          "text": "comment 1.2",
          "children": [
            {
              "text": "comment 1.2.1"
            },
            {
              "text": "comment 1.2.2",
              "children":[
                {"text": "comment 1.3.1"}
              ]
            }
          ]
        }
      ]
    },
    {
      "text": "comment 2",
      "children": []
    },
    {
      "text": "comment 3",
      "children": []
    }
  ];
}
