import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { PostModelResponse } from './post/post-response.model';
import { FormsModule } from '@angular/forms';
import { PostComponent } from './post/post.component';
import { PostListService } from './post-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    FormsModule,
    PostComponent
  ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  serverError = signal<string | null>(null);
  isLoading = signal(false);
  fetchedPosts = signal<PostModelResponse[]>([]);
  isPosting = signal(false);

  text!: string;
  subscription?: Subscription;

  constructor(private readonly postListService: PostListService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.serverError.set(null);
    this.isLoading.set(true);

    this.subscription?.unsubscribe();

    this.subscription = this.postListService.getAllPosts().subscribe({
      next: (posts) => {
        this.fetchedPosts.set(posts);
        this.isLoading.set(false);
      },
      error: () => {
        this.serverError.set("There was an error fetching posts.");
        this.isLoading.set(false);
      }
    });
  }

  publishPost() {
    this.isPosting.set(true);

    this.postListService.sendPost(this.text).subscribe({
      next: () => {
        this.text = '';
        this.loadPosts();
        this.isPosting.set(false);
      },
      error: () => {
        this.isPosting.set(false);
      }
    });
  }

  reloadPosts(): void {
    this.loadPosts();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
