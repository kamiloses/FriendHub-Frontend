import {Component, Input, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PostModel} from '../../models/post.model';
import {NgClass} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {LikeService} from './like.service';

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

  constructor(private http:HttpClient,private likeService:LikeService) {
  }

  @Input({required:true})post!:PostModel

  username = 'kamiloses1'; // lub pobierz z auth service


  toggleLike(post: PostModel,event:MouseEvent) {
    event.stopPropagation();
    if (post.likedByMe) {
      this.likeService.unlikePost(post.id, this.username).subscribe({
        next: () => {
          this.post.likeCount -= 1;
          this.post.likedByMe = false;
        },
        error: (err) => console.error('S', err)
      });
    } else {
      this.likeService.likePost(post.id, this.username).subscribe({
        next: () => {
          this.post.likeCount += 1;
          this.post.likedByMe = true;
        },
        error: (err) => console.error('Błąd przy like', err)
      });
    }
  }}
