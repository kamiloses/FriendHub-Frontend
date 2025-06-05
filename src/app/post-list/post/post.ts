import {Component, Input, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PostModel} from '../../models/post.model';
import {NgClass} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {LikeService} from './like.service';
import {RetweetService} from './retweet.service';

@Component({
  selector: 'app-post',
  imports: [
    RouterLink,
    NgClass
  ],
  templateUrl: './post.html',
  standalone: true,
  styleUrl: './post.css'
})
export class Post {

  constructor(private http:HttpClient,private likeService:LikeService,private retweetService:RetweetService) {
  }

  @Input({required:true})post!:PostModel

  username = 'kamiloses1';


  toggleLike(post: PostModel,event:MouseEvent) {
    event.stopPropagation();
    if (post.likedByMe) {
      this.likeService.unlikePost(post.id, this.username).subscribe({
        next: () => {
          this.post.likeCount -= 1;
          this.post.likedByMe = false;
        },
        error: (err) => console.error('There was some error while trying to like the  post: ', err)
      });
    } else {
      this.likeService.likePost(post.id, this.username).subscribe({
        next: () => {
          this.post.likeCount += 1;
          this.post.likedByMe = true;
        },
        error: (err) => console.error("An error occurred while trying to unlike the post: ", err)
      });
    }
  }



  toggleRetweet(post: PostModel,event:MouseEvent) {
    event.stopPropagation();
    if (post.retweetedByMe) {
      this.retweetService.unRetweetPost(post.id, this.username).subscribe({
        next: () => {
          this.post.retweetCount -= 1;
          this.post.retweetedByMe = false;
        },
        error: (err) => console.error('There was some error while trying to retweet the  post: ', err)
      });
    } else {
      this.retweetService.retweetPost(post.id, this.username).subscribe({
        next: () => {
          this.post.retweetCount += 1;
          this.post.retweetedByMe = true;
        },
        error: (err) => console.error("An error occurred while trying to unRetweet the post: ", err)
      });
    }
  }

}
