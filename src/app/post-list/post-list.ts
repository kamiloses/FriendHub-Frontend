import { Component } from '@angular/core';
import {Post} from './post/post';
import {PostsData} from '../models/Post.Data';
import {PostModel} from '../models/post.model';

@Component({
  selector: 'app-post-list',
  imports: [
    Post
  ],
  templateUrl: './post-list.html',
  standalone: true,
  styleUrl: './post-list.css'
})
export class PostList {

  posts:PostModel[]=PostsData.posts;
}
