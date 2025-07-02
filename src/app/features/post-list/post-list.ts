import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Post} from './post/post';
import {FormsModule} from '@angular/forms';
import {PostListService} from './post-list.service';
import {PostModel} from './post/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.html',
  standalone: true,
  imports: [
    Post,
    FormsModule
  ],
  styleUrls: ['./post-list.css']
})
export class PostList implements OnInit {
  fetchedPosts: PostModel[] = [];

  constructor(private route: ActivatedRoute,private router:Router,private postListService:PostListService) {}

  ngOnInit() {
    if (this.router.url.includes("/profile")) {
      this.route.data.subscribe(data => {
        if (data['userPosts'] === null) {
          this.router.navigate(['/error']);
        } else {
          this.fetchedPosts = data['userPosts'];
        }
      });
    }


      else {
      this.route.data.subscribe(data => {
        if (data['posts'] === null) {
          this.router.navigate(['/error']);
        } else {
          this.fetchedPosts = data['posts'];
        }
      });
    }
  }


  postInput!:string


  sendPost(){
    this.postListService.sendPost(this.postInput).subscribe({next:()=> {
      this.postInput='';
      window.location.reload(); //todo zobacz jak to jest ze klasa window moge ją wywołac bez new i bez constructora
       console.log("success while sending the post");}
      ,
      error: (error) => {
        console.error('Error adding post:', error);
      }
    })



  }


}
