import {Component, Input, OnDestroy, OnInit, signal} from '@angular/core';
import {Comment} from './comment/comment';
import {Subscription} from 'rxjs';
import {CommentResponseModel} from './comment/comment-response.model';
import {CommentsListService} from './comments-list.service';



@Component({
  selector: 'app-comments-list',
  imports: [
  ],
  templateUrl: './comments-list.html',
  styleUrl: './comments-list.css'
})
export class CommentsList  {

  constructor(private readonly commentListService: CommentsListService) {
  }

  protected fetchComments = signal<CommentResponseModel[]>([]);
  protected isLoading = signal<boolean>(false);
  protected serverError = signal<string | null>(null);


  private subscription: Subscription | null = null;

  @Input({required: true}) currentRoute!: string;


  ngOnInit(): void {
  this.loadComments()

  }




  loadComments(){

    this.isLoading.set(true)
    this.subscription=this.commentListService.findCommentsRelatedWithPost(this.currentRoute).subscribe({
      next:(comments:CommentResponseModel[])=>{
        this.isLoading.set(false)
        this.fetchComments.set(comments);
      },
      error:(err)=>{
        this.isLoading.set(false)
        this.serverError.set("TODO");
        console.error(err);
      }});


  }

  // sendComment(content: string) {
  //   const commentModel: PublishCommentModel = {
  //     postId: this.currentRoute,
  //     parentCommentId: null,//todo to
  //     content: content
  //   };
  //
  //   this.commentListService.sendComment("kamiloses1",commentModel).subscribe()
  //
  //   window.location.reload();
  //
  // }



  ngOnDestroy(): void {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
