import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsListService {
  constructor(private http:HttpClient) {}


  findCommentsRelatedWithPost(postId:string):Observable<CommentModel[]>{

    return this.http.get<CommentModel[]>("http://localhost:8083/api/comments/"+postId)}



  sendComment(username:string,commentModel: PublishCommentModel) {
    return  this.http.post<void[]>("http://localhost:8083/api/comments?username="+username, commentModel);
  }

}
