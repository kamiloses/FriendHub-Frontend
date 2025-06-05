import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LikeService {
  private baseUrl = 'http://localhost:8087/api/like';

  constructor(private http: HttpClient) {}

  likePost(postId: string, username: string) {
    return this.http.post(this.baseUrl + `?postId=${postId}&username=${username}`, null);
  }

  unlikePost(postId: string, username: string) {
    return this.http.delete(this.baseUrl + `?postId=${postId}&username=${username}`);
  }
}
