import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommentResponseModel } from './comment-response.model';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CommentService } from './comment.service';
import { PublishCommentModel } from './publishCommentModel';
import {GlobalEnvironmentVariables} from '../../../../../../auth/global-environment-variables';

@Component({
  selector: 'app-comment',
  imports: [FormsModule, NgClass],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
@Component({
  selector: 'app-comment',
  imports: [FormsModule, NgClass],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  @Input({ required: true }) comment!: CommentResponseModel;
  @Input({ required: true }) currentRoute!: string;
  @Output() commentPublished = new EventEmitter<void>();

  showReplyInput = false;
  isExpanded = false;

  constructor(
    private readonly commentService: CommentService,
    private readonly global: GlobalEnvironmentVariables
  ) {}

  ngOnInit(): void {}

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  toggleReplyInput() {
    this.showReplyInput = !this.showReplyInput;
  }

  sendReply(content: string, parentId: string) {
    const username = this.global.getGlobalUsernameValue();
    const commentModel: PublishCommentModel = {
      postId: this.currentRoute,
      parentCommentId: parentId,
      content
    };

    this.commentService.sendComment(username!, commentModel).subscribe({
      next: () => this.commentPublished.emit(),
      error: err => console.error(err)
    });
  }

  sendComment(content: string) {
    const username = this.global.getGlobalUsernameValue();
    const commentModel: PublishCommentModel = {
      postId: this.currentRoute,
      parentCommentId: this.comment.id ?? null,
      content
    };

    this.commentService.sendComment(username!, commentModel).subscribe({
      next: () => this.commentPublished.emit(),
      error: err => console.error(err)
    });
  }
}
