import { Injectable } from '@angular/core';
import {CommentResponseModel} from './comment-response.model';
import {HttpClient} from '@angular/common/http';
import {PublishCommentModel} from './publishCommentModel';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(private readonly http: HttpClient) {}

  sendComment(username: string, commentModel: PublishCommentModel) {
    return this.http.post<void[]>(
      `http://localhost:8083/api/comments?username=${username}`,
      commentModel
    );
  }
}
