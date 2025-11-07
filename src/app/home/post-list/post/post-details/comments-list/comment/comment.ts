import {Component, Input, OnInit} from '@angular/core';
import {CommentResponseModel} from './comment-response.model';
import {FormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './comment.html',
  styleUrl: './comment.css'
})
export class Comment implements OnInit {
  @Input({required: true}) comment!: CommentResponseModel;
  @Input({ required: true }) currentRoute!: string;
  showReplyInput = false; // lokalna zmienna do kontrolowania pola reply
  isExpanded = false;

  ngOnInit(): void {
       console.log("ccc"+this.currentRoute);

  }     // lokalna zmienna do rozwijania odpowiedzi





  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  toggleReplyInput() {
    this.showReplyInput = !this.showReplyInput;
  }

  sendReply(content: string, parentId: string) {
    console.log('Sending reply to', parentId, 'with content:', content);
    // logika wysyłki odpowiedzi do backendu
  }

}
