import { TestBed } from '@angular/core/testing';
import { PostListService } from './post-list.service';
import { PostModelResponse } from './post/post-response.model';
import {HttpTestingController} from '@angular/common/http/testing';

describe('PostListService', () => {
  let service: PostListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostListService]
    });
    service = TestBed.inject(PostListService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all posts', () => {
    const dummyPosts: PostModelResponse[] = [
      { id: '1', content: 'Post 1', user: { firstName: 'John', lastName: 'Doe', username: 'jdoe' }, createdAt: new Date() } as any,
      { id: '2', content: 'Post 2', user: { firstName: 'Jane', lastName: 'Doe', username: 'jadoe' }, createdAt: new Date() } as any
    ];
    service.getAllPosts().subscribe(posts => expect(posts).toEqual(dummyPosts));
    const req = httpMock.expectOne('http://localhost:8080/api/posts?username=kamilosesx');
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });

  it('should send a post', () => {
    const dynamicText = 'Dynamic post content';
    service.sendPost(dynamicText).subscribe(res => expect(res).toBeTruthy());
    const req = httpMock.expectOne('http://localhost:8080/api/posts/kamilosesx');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.content).toContain('Lorem ipsum');
    req.flush({ success: true });
  });
});
