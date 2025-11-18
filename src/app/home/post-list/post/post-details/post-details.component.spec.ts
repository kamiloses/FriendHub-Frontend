import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailsComponent } from './post-details.component';
import { PostDetailsService } from './post-details.service';
import { CommentService } from './comments-list/comment/comment.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import {CommentsListComponent} from './comments-list/comments-list.component';
import { PostModelResponse } from '../post-response.model';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let postService: jasmine.SpyObj<PostDetailsService>;
  let commentService: jasmine.SpyObj<CommentService>;

  beforeEach(async () => {
    const postSpy = jasmine.createSpyObj('PostDetailsService', ['getPostById']);
    const commentSpy = jasmine.createSpyObj('CommentService', ['sendComment']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, CommentsListComponent],
      declarations: [PostDetailsComponent],
      providers: [
        { provide: PostDetailsService, useValue: postSpy },
        { provide: CommentService, useValue: commentSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostDetailsService) as jasmine.SpyObj<PostDetailsService>;
    commentService = TestBed.inject(CommentService) as jasmine.SpyObj<CommentService>;

    const mockPost: PostModelResponse = {
      id: '123',
      content: 'Test content',
      user: {
        id: 'u1',
        firstName: 'John',
        lastName: 'Doe',
        username: 'jdoe',
        password: 'secret',
        isOnline: false,
        chatId: 'chat123'
      },
      createdAt: new Date().toISOString(),
      likeCount: 0,
      retweetCount: 0,
      commentsCount: 0,
      retweetedByMe: false,
      likedByMe: false,
      isDeleted: false
    };

    postService.getPostById.and.returnValue(of(mockPost));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load post on init', () => {
    component.ngOnInit();
    expect(component.post()).toBeTruthy();
    expect(component.post()!.content).toBe('Test content');
  });

  it('should publish comment and reload post', () => {
    commentService.sendComment.and.returnValue(of([] as void[]));
    component.text = 'New comment';
    component.postId = '123';
    component.onPublish();
    expect(commentService.sendComment).toHaveBeenCalledWith('kamilosesx', {
      postId: component.postId,
      parentCommentId: null,
      content: 'New comment'
    });
    expect(component.text).toBe('');
  });
});
