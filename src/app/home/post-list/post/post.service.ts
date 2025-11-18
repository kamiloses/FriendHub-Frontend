import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  retweet(postId: number, username: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/retweet?postId=${postId}&username=${username}`, null);
  }

  undoRetweet(postId: number, username: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/retweet?postId=${postId}&username=${username}`);
  }

  like(postId: number, username: string): Observable<void> {
    return this.http.post<void>(`http://localhost:8087/api/like?postId=${postId}&username=${username}`, null);
  }

  unlike(postId: number, username: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:8087/api/like?postId=${postId}&username=${username}`);
  }
}
