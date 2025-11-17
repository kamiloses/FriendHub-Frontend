import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailsComponent } from './post-details.component';
import { PostDetailsService } from './post-details.service';
import { CommentService } from './comments-list/comment/comment.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('PostDetailsComponent', () => {
  let component: PostDetailsComponent;
  let fixture: ComponentFixture<PostDetailsComponent>;
  let postService: jasmine.SpyObj<PostDetailsService>;
  let commentService: jasmine.SpyObj<CommentService>;

  beforeEach(async () => {
    const postSpy = jasmine.createSpyObj('PostDetailsService', ['getPostById']);
    const commentSpy = jasmine.createSpyObj('CommentService', ['sendComment']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PostDetailsComponent],
      providers: [
        { provide: PostDetailsService, useValue: postSpy },
        { provide: CommentService, useValue: commentSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailsComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostDetailsService) as jasmine.SpyObj<PostDetailsService>;
    commentService = TestBed.inject(CommentService) as jasmine.SpyObj<CommentService>;

    const mockPost = {
      id: '123',
      content: 'Hello world',
      createdAt: new Date().toISOString(),
      likeCount: 0,
      retweetCount: 0,
      commentsCount: 0,
      retweetedByMe: false,
      likedByMe: false,
      isDeleted: false,
      user: {
        id: 'u1',
        firstName: 'John',
        lastName: 'Doe',
        username: 'jdoe',
        password: 'secret',
        isOnline: false,
        chatId: 'chat123'
      }
    };

    postService.getPostById.and.returnValue(of(mockPost));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load post on init', () => {
    expect(component.post()).toBeTruthy();
    expect(component.post()?.content).toBe('Hello world');
  });

  it('should call sendComment on onPublish', () => {
    component.text = 'My comment';
    commentService.sendComment.and.returnValue(of([] as void[]));
    component.postId = '123';

    component.onPublish();

    expect(commentService.sendComment).toHaveBeenCalledWith('kamilosesx', {
      postId: '123',
      parentCommentId: null,
      content: 'My comment'
    });
    expect(component.text).toBe('');
  });
});
