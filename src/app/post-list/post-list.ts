import { Component, OnInit } from '@angular/core';
import { PostModel } from '../models/post.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from './post/post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.html',
  standalone: true,
  imports: [
    Post
  ],
  styleUrls: ['./post-list.css']
})
export class PostList implements OnInit {
  fetchedPosts: PostModel[] = [];

  constructor(private route: ActivatedRoute,private router:Router) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data['posts'] === null) {
        this.router.navigate(['/error']);}

      else {
      this.fetchedPosts = data['posts'];}
    });
  }
}
