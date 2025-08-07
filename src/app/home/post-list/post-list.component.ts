import {Component, OnInit, signal} from '@angular/core';
import {PostModelResponse} from './post/post-response.model';
import {User} from './user.model';
import {FormsModule} from '@angular/forms';
import {Post} from './post/post';
import {PostListService} from './post-list.service';

@Component({
  selector: 'app-post-list',
  imports: [
    FormsModule,
    Post
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {

  //readOnly
  serverError=signal<string|null>(null)
  isLoading=signal<boolean>(false)

  constructor(private postListService: PostListService) {
  }

  fetchedPosts!: PostModelResponse[]|null;

   ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
     this.isLoading.set(true);
    this.postListService.getAllPosts().subscribe({
      next: (posts) => {
        this.fetchedPosts = posts;
        this.isLoading.set(false);
      },
      error: (err) => {
        this.serverError.set("There was an error fetching posts.");
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  reloadPosts(): void {
    this.loadPosts();
  }
}



