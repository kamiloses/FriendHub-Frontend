import {Component, OnInit} from '@angular/core';
import {PostDetailsService} from './post-details.service';
import {map} from 'rxjs';
import {Comments} from './comments/comments';
import {PostModel} from '../post.model';

@Component({
  imports: [
    Comments
  ],
  standalone: true,
  selector: 'app-post-details',
  templateUrl: './post-details.html',
  styleUrls: ['./post-details.css'],
})
export class PostDetailsComponent implements OnInit {
  constructor(private postDetailsService: PostDetailsService) {
  }

  public postModel: Partial<PostModel> = {}; //todo nauczyc sie partial
  postFetchError: string | null = null;


  ngOnInit(): void {
    this.postDetailsService.getSpecificPost("683f0ad2ce5a4c4a70c07f53").pipe(
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
