import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentsListService } from './comments-list.service';
import { CommentResponseModel } from './comment/comment-response.model';

describe('CommentsListService', () => {
  let service: CommentsListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsListService]
    });

    service = TestBed.inject(CommentsListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch comments', () => {
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

    service.findCommentsRelatedWithPost("123").subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].id).toBe("1");
    });

    const req = httpMock.expectOne("http://localhost:8083/api/comments/123");
    expect(req.request.method).toBe("GET");

    req.flush(mockComments);
  });
});
