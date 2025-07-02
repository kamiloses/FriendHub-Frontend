import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentModel} from './comment/comment.model';
import {PublishCommentModel} from './publish-comment.model';

@Injectable({providedIn:'root'})
export class CommentListService{


constructor(private http:HttpClient) {}


  findCommentsRelatedWithPost(postId:string):Observable<CommentModel[]>{

  return this.http.get<CommentModel[]>("http://localhost:8083/api/comments/"+postId)}



  sendComment(username:string,commentModel: PublishCommentModel) {
    return  this.http.post<void[]>("http://localhost:8083/api/comments?username="+username, commentModel);
  }



}
