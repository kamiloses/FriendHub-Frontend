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
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() post!: PostModelResponse;

}
