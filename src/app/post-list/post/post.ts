import {Component, Input, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {PostModel} from '../../models/post.model';

@Component({
  selector: 'app-post',
  imports: [
    RouterLink
  ],
  templateUrl: './post.html',
  standalone: true,
  styleUrl: './post.css'
})
export class Post {

  @Input({required:true})post!:PostModel

}
