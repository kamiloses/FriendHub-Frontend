import {Component, Input} from '@angular/core';
import {CommentModel} from '../comment.model';

@Component({
  selector: 'app-comment',
    imports: [
    ],
  templateUrl: './comment.html',
  styleUrl: './comment.css',
  standalone:true
})
export class Comment {
  @Input() comment!: CommentModel;
  isExpanded = false;

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }
}
