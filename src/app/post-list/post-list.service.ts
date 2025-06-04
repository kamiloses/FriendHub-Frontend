import {Injectable} from '@angular/core';
import {PostModel} from '../models/post.model';
import {catchError, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class PostListService {


  constructor(private http: HttpClient) {
  }


  getAllPosts(): Observable<PostModel[] | null> {
    const username = "kamiloses1"
    return this.http
      .get<PostModel[]>(`http://localhost:8080/api/posts?username=${username}`)
      .pipe(
        catchError(err => {
          console.error('Post Module  error:', err);
          return of(null);
        })
      );
  }

}
