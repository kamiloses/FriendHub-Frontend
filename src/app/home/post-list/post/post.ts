import {Component, Input} from '@angular/core';
import { PostModelResponse } from './post-response.model';
import {DatePipe, NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [
    NgClass,
    DatePipe,
    RouterLink
  ],
  templateUrl: './post.html',
  styleUrl: './post.css'
})
export class Post {
  @Input() post!: PostModelResponse;

}
