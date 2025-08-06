import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PostModelResponse} from '../post-response.model';

@Component({
  selector: 'app-post-details',
  imports: [
    FormsModule
  ],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css'
})
export class PostDetails {
  text: any;
  post!: PostModelResponse;

  onPublish() {

  }
}
