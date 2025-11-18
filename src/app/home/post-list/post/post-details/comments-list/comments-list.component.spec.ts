import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentsList } from './comments-list.component';
import { CommentsListService } from './comments-list.service';
import { of, throwError } from 'rxjs';
import { CommentResponseModel } from './comment/comment-response.model';

class MockCommentService {
  findCommentsRelatedWithPost() {
    return of([]);
  }
}

describe('CommentsList', () => {
  let component: CommentsList;
  let fixture: ComponentFixture<CommentsList>;
  let service: CommentsListService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsList],
      providers: [
        { provide: CommentsListService, useClass: MockCommentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsList);
    component = fixture.componentInstance;

    component.currentRoute = "123";
    service = TestBed.inject(CommentsListService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load comments successfully', () => {
    const mockComments: CommentResponseModel[] = [
      {
        id: "1",
        content: "Test comment",
        createdAt: new Date(),
        userDetails: {
          id: "u1",
          username: "testUser",
          firstName: "Test",
          lastName: "User",
          password: "mockPass",
          isOnline: false,
          chatId: "chat123"
        },
        postId: "123",
        parentCommentId: null,
        numberOfComments: 0,
        numberOfLikes: 10,
        numberOfReplies: 2,
        replies: []
      }
    ];

    spyOn(service, 'findCommentsRelatedWithPost').and.returnValue(of(mockComments));

    component.loadComments();

    expect(component.fetchComments()).toEqual(mockComments);
    expect(component.serverError()).toBeNull();
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle error when loading', () => {
    spyOn(service, 'findCommentsRelatedWithPost').and.returnValue(
      throwError(() => new Error("Fail"))
    );

    component.loadComments();

    expect(component.serverError()).toBe("Error loading comments");
    expect(component.isLoading()).toBeFalse();
  });

  it('should emit commentPublished event', () => {
    spyOn(component.commentPublished, 'emit');

    component.onChildCommentPublished();

    expect(component.commentPublished.emit).toHaveBeenCalled();
  });
});
