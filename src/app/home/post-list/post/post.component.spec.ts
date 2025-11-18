import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { of } from 'rxjs';
import {PostService} from './post.service';
import {PostModelResponse} from './post-response.model';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let mockPostService: jasmine.SpyObj<PostService>;

  beforeEach(async () => {
    mockPostService = jasmine.createSpyObj('PostService', ['like', 'unlike', 'retweet', 'undoRetweet']);
    await TestBed.configureTestingModule({
      imports: [PostComponent],
      providers: [{ provide: PostService, useValue: mockPostService }]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;

    component.post = {
      id: 1,
      content: 'Test post',
      createdAt: new Date(),
      likeCount: 0,
      retweetCount: 0,
      likedByMe: false,
      retweetedByMe: false,
      user: { username: 'user1', firstName: 'John', lastName: 'Doe' }
    } as unknown as PostModelResponse;


    component.loggedUserUsername = 'user1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should like a post', () => {
    mockPostService.like.and.returnValue(of());
    component.likeThePost(new MouseEvent('click'));
    expect(component.post.likedByMe).toBeTrue();
    expect(component.post.likeCount).toBe(1);
    expect(mockPostService.like).toHaveBeenCalledWith(1, 'user1');
  });

  it('should unlike a post', () => {
    component.post.likedByMe = true;
    component.post.likeCount = 1;
    mockPostService.unlike.and.returnValue(of());
    component.unlikeThePost(new MouseEvent('click'));
    expect(component.post.likedByMe).toBeFalse();
    expect(component.post.likeCount).toBe(0);
    expect(mockPostService.unlike).toHaveBeenCalledWith(1, 'user1');
  });

  it('should retweet a post', () => {
    mockPostService.retweet.and.returnValue(of());
    component.retweet(new MouseEvent('click'));
    expect(component.post.retweetedByMe).toBeTrue();
    expect(component.post.retweetCount).toBe(1);
    expect(mockPostService.retweet).toHaveBeenCalledWith(1, 'user1');
  });

  it('should undo retweet', () => {
    component.post.retweetedByMe = true;
    component.post.retweetCount = 1;
    mockPostService.undoRetweet.and.returnValue(of());
    component.undoRetweet(new MouseEvent('click'));
    expect(component.post.retweetedByMe).toBeFalse();
    expect(component.post.retweetCount).toBe(0);
    expect(mockPostService.undoRetweet).toHaveBeenCalledWith(1, 'user1');
  });
});
