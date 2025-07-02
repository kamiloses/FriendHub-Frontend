import {Component, OnInit} from '@angular/core';
import {PostDetailsService} from './post-details.service';
import {map} from 'rxjs';
import {PostModel} from '../post.model';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentList} from './comment-list/comment-list';

@Component({
  imports: [
    CommentList
  ],
  standalone: true,
  selector: 'app-post-details',
  templateUrl: './post-details.html',
  styleUrls: ['./post-details.css'],
})
export class PostDetailsComponent implements OnInit {
  constructor(private postDetailsService: PostDetailsService,private route: ActivatedRoute) {
  }

  public postModel: Partial<PostModel> = {}; //todo nauczyc sie partial
  postFetchError: string | null = null;
 a!:string;

  ngOnInit(): void {
   this.a = this.route.snapshot.paramMap.get('id')!;//todo zmien zmienną

    this.postDetailsService.getSpecificPost(this.a).pipe(
      map(post => {
        if (!post) {
          throw new Error("Post is null");
        }
        return post;
      }))
      .subscribe({
        next: (post: PostModel) => {
          this.postModel = post;
        },
        error: (error) => {
          console.log(error)
          this.postFetchError = "There was some Problem with Fetching post data"}}
      )}









}
