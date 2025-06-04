import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {PostModel} from '../../../models/post.model';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn:"root"})
export class PostDetailsService{

   constructor(private http:HttpClient) {
  }



  getSpecificPost(postId:string):Observable<PostModel>{
  return   this.http.get<PostModel>("http://localhost:8080/api/posts/"+postId)


  }


}
