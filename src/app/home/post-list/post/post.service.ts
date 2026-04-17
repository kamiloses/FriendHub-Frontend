import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8080/api';
  private likeUrl = 'http://localhost:8087/api/like';

  constructor(private http: HttpClient) {}

  retweet(postId: string, username: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/retweet?postId=${postId}&username=${username}`,
      null
    );
  }

  undoRetweet(postId: string, username: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/retweet?postId=${postId}&username=${username}`
    );
  }

  like(postId: string, username: string): Observable<void> {
    return this.http.post<void>(
      `${this.likeUrl}?postId=${postId}&username=${username}`,
      null
    );
  }

  unlike(postId: string, username: string): Observable<void> {
    return this.http.delete<void>(
      `${this.likeUrl}?postId=${postId}&username=${username}`
    );
  }
}
