import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {PostModel} from './post/post.model';


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

  sendPost(text: string): Observable<any> {
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel augue in purus dictum blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam dictum orci vel lorem sollicitudin, vel pharetra elit viverra. Quisque at erat ut erat feugiat dapibus. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.\n";
    const body = { content: text };
    return this.http.post("http://localhost:8080/api/posts/kamiloses1", body);
  }

  getPostsRelatedWithUser():Observable<PostModel[]|null>{
    const username = "kamiloses1"
    return this.http
      .get<PostModel[]>(`http://localhost:8080/api/posts?username=${username}`)//todo dodaj w backendzie
      .pipe(
        catchError(err => {
          console.error('Post Module  error:', err);
          return of(null);
        }))

  }


}
