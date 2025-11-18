import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call like endpoint', () => {
    service.like(1, 'user1').subscribe();
    const req = httpMock.expectOne('http://localhost:8087/api/like?postId=1&username=user1');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should call retweet endpoint', () => {
    service.retweet(1, 'user1').subscribe();
    const req = httpMock.expectOne('http://localhost:8080/api/retweet?postId=1&username=user1');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  afterEach(() => {
    httpMock.verify();
  });
});
