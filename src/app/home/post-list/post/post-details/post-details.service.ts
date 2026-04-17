import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModelResponse } from '../post-response.model';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {

  private readonly apiUrl = 'http://localhost:8080/api/posts';

  constructor(private readonly http: HttpClient) {}

  getPostById(id: string): Observable<PostModelResponse | null> {
    return this.http.get<PostModelResponse | null>(
      `${this.apiUrl}/${id}`
    );
  }
}
