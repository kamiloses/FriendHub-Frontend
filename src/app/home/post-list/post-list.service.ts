import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostModelResponse } from './post/post-response.model';
import { HttpClient } from '@angular/common/http';
import { GlobalEnvironmentVariables } from '../../auth/global-environment-variables';

@Injectable({
  providedIn: 'root'
})
export class PostListService {

  private readonly apiUrl = 'http://localhost:8080/api/posts';

  constructor(
    private readonly http: HttpClient,
    private global: GlobalEnvironmentVariables
  ) {}

  getUsername(): string {
    return this.global.getGlobalUsernameValue() || '';
  }

  getAllPosts(): Observable<PostModelResponse[]> {
    const username = this.getUsername();
    return this.http.get<PostModelResponse[]>(`${this.apiUrl}?username=${username}`);
  }

  sendPost(text: string): Observable<any> {
    const username = this.getUsername();
    const body = { content: text };
    return this.http.post(`${this.apiUrl}/${username}`, body);
  }
}
