import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {PostModelResponse} from './post/post-response.model';
import {User} from './user.model';
import {FormsModule} from '@angular/forms';
import {Post} from './post/post';
import {PostListService} from './post-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  imports: [
    FormsModule,
    Post
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {

  protected serverError=signal<string|null>(null)
  protected isLoading=signal<boolean>(false)
  protected fetchedPosts=signal<PostModelResponse[]>([])
  private subscription?:Subscription;

  constructor(private postListService: PostListService) {
  }



   ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
     this.isLoading.set(true);
   this.subscription= this.postListService.getAllPosts().subscribe({
      next: (posts) => {
        this.fetchedPosts.set(posts);
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

  ngOnDestroy(): void {
this.subscription?.unsubscribe();
  }



}



