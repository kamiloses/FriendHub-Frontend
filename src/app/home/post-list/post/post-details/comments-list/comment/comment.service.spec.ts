import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PublishCommentModel } from './publishCommentModel';

describe('CommentService', () => {
  let service: CommentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentService]
    });

    service = TestBed.inject(CommentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a comment', () => {
    const mockComment: PublishCommentModel = {
      postId: "123",
      parentCommentId: null,
      content: "Hello world"
    };

    service.sendComment("any", mockComment).subscribe(response => {
      expect(response).toEqual([]);
    });

    const req = httpMock.expectOne(
      "http://localhost:8083/api/comments?username=kamilosesx"
    );

    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(mockComment);

    req.flush([]);
  });
});
