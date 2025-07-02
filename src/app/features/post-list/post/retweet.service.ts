import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RetweetService {
  private baseUrl = 'http://localhost:8080/api/retweet';

  constructor(private http: HttpClient) {}

  retweetPost(postId: string, username: string) {
    return this.http.post(this.baseUrl + `?postId=${postId}&username=${username}`, null);
  }

  unRetweetPost(postId: string, username: string) {
    return this.http.delete(this.baseUrl + `?postId=${postId}&username=${username}`);
  }
}
