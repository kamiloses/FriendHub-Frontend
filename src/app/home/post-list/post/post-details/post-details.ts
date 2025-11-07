import {Component, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PostModelResponse} from '../post-response.model';
import {PostDetailsService} from './post-details.service';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {CommentsList} from './comments-list/comments-list';

@Component({
  selector: 'app-post-details',
  imports: [
    FormsModule,
    CommentsList
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css'
})
export class PostDetails implements OnInit {
  text: string="";



  protected post = signal<PostModelResponse | null>(null)
  protected serverError = signal<string | null>(null)
  protected isLoading = signal<boolean>(false)
  private postId!:string;

  constructor(private readonly postDetailsService: PostDetailsService,private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
     this.postId = this.route.snapshot.paramMap.get('id')!;
    this.loadPost(this.postId);

  }

  loadPost(postId:string): void {
    this.isLoading.set(true);
    this.postDetailsService.getPostById(postId).subscribe({
        next: fetchedPost => {
          this.post.set(fetchedPost)
          this.isLoading.set(false);
          console.log("aa"+fetchedPost)

        }
        , error: err => {
          console.error(err);
          this.serverError.set("There was an error fetching post.");
          this.isLoading.set(false);
        }
      }
    )

  }


  reloadPosts(): void {
    this.loadPost(this.postId);
  }



  onPublish() {

  }
}
