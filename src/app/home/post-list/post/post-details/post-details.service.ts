import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../post';
import {PostModelResponse} from '../post-response.model';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {

  constructor(private http: HttpClient) {}

  private readonly apiUrl = 'http://localhost:8080/api/posts';


     getPostById(id: number): Observable<PostModelResponse|null> {

    return this.http.get<PostModelResponse|null>(`${this.apiUrl}/6894712ae3f65640d161ead1`);
  }

}
