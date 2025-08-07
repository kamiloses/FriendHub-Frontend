import {Component, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PostModelResponse} from '../post-response.model';
import {PostDetailsService} from './post-details.service';

@Component({
  selector: 'app-post-details',
  imports: [
    FormsModule
  ],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css'
})
export class PostDetails implements OnInit {
  text: any;


  post = signal<PostModelResponse | null>(null)
  serverError = signal<string | null>(null)
  isLoading = signal<boolean>(false)

  constructor(private postDetailsService: PostDetailsService) {
  }

  ngOnInit(): void {
  this.loadPosts()

  }

  loadPosts(): void {
    this.isLoading.set(true);
    this.postDetailsService.getPostById(100).subscribe({
        next: fetchedPost => {
          this.post.set(fetchedPost)
          this.isLoading.set(false);

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
    this.loadPosts();
  }

  onPublish() {

  }
}
