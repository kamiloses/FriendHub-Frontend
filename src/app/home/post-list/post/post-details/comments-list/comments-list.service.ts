import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommentResponseModel} from './comment/comment-response.model';


@Injectable({
  providedIn: 'root'
})
export class CommentsListService {
  constructor(private http:HttpClient) {}


  findCommentsRelatedWithPost(postId:string):Observable<CommentResponseModel[]>{

    return this.http.get<CommentResponseModel[]>("http://localhost:8083/api/comments/"+postId)}



  sendComment(username:string,commentModel: CommentResponseModel) {
    return  this.http.post<void[]>("http://localhost:8083/api/comments?username="+username, commentModel);
  }

}
