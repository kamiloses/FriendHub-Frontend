import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostListComponent } from './post-list.component';
import { PostListService } from './post-list.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PostModelResponse } from './post/post-response.model';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;
  let mockService: jasmine.SpyObj<PostListService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('PostListService', ['getAllPosts', 'sendPost']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PostListComponent],
      providers: [{ provide: PostListService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', () => {
    const dummyPosts: PostModelResponse[] = [
      { id: '1', content: 'Post 1', user: { firstName: 'John', lastName: 'Doe', username: 'jdoe' }, createdAt: new Date() } as any
    ];
    mockService.getAllPosts.and.returnValue(of(dummyPosts));

    component.ngOnInit();

    expect(component.fetchedPosts()).toEqual(dummyPosts);
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle error when loading posts', () => {
    mockService.getAllPosts.and.returnValue(throwError(() => new Error('Error')));
    component.ngOnInit();
    expect(component.serverError()).toBe('There was an error fetching posts.');
    expect(component.isLoading()).toBeFalse();
  });

  it('should publish post and reload posts', () => {
    mockService.sendPost.and.returnValue(of({}));
    mockService.getAllPosts.and.returnValue(of([]));
    component.text = 'Test post';
    component.publishPost();
    expect(component.text).toBe('');
    expect(component.isPosting()).toBeFalse();
  });

  it('should handle error on publish post', () => {
    mockService.sendPost.and.returnValue(throwError(() => new Error('Error')));
    component.text = 'Test post';
    component.publishPost();
    expect(component.isPosting()).toBeFalse();
  });
});
