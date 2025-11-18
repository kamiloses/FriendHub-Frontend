import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment.component';
import { CommentService } from './comment.service';
import { of } from 'rxjs';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let commentServiceMock: jasmine.SpyObj<CommentService>;

  beforeEach(async () => {
    commentServiceMock = jasmine.createSpyObj('CommentService', ['sendComment']);
    commentServiceMock.sendComment.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [CommentComponent],
      providers: [
        { provide: CommentService, useValue: commentServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;

    component.comment = {
      id: "abc",
      content: "content testowy",
      createdAt: new Date(),
      userDetails: {
        id: "1",
        username: "user",
        firstName: "A",
        lastName: "B",
        password: "",
        isOnline: false,
        chatId: ""
      },
      postId: "post1",
      parentCommentId: null,
      numberOfComments: 0,
      numberOfLikes: 0,
      numberOfReplies: 0,
      replies: []
    };

    component.currentRoute = "post1";

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleExpand should invert isExpanded', () => {
    expect(component.isExpanded).toBe(false);
    component.toggleExpand();
    expect(component.isExpanded).toBe(true);
    component.toggleExpand();
    expect(component.isExpanded).toBe(false);
  });

  it('toggleReplyInput should invert showReplyInput', () => {
    expect(component.showReplyInput).toBe(false);
    component.toggleReplyInput();
    expect(component.showReplyInput).toBe(true);
    component.toggleReplyInput();
    expect(component.showReplyInput).toBe(false);
  });

  it('sendReply should call commentService and emit event', () => {
    spyOn(component.commentPublished, 'emit');
    component.sendReply("hello", "parent-id");
    expect(commentServiceMock.sendComment).toHaveBeenCalledWith("kamilosesx", {
      postId: "post1",
      parentCommentId: "parent-id",
      content: "hello"
    });
    expect(component.commentPublished.emit).toHaveBeenCalled();
  });

  it('sendComment should call commentService and emit event', () => {
    spyOn(component.commentPublished, 'emit');
    component.sendComment("test content");
    expect(commentServiceMock.sendComment).toHaveBeenCalledWith("kamilosesx", {
      postId: "post1",
      parentCommentId: "abc",
      content: "test content"
    });
    expect(component.commentPublished.emit).toHaveBeenCalled();
  });
});
