import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FriendsService } from './search-friends.service';
import { GlobalEnvironmentVariables } from '../../auth/global-environment-variables';
import { SearchedPeople } from './searched-people.model';

describe('FriendsService', () => {
  let service: FriendsService;
  let httpMock: HttpTestingController;
  let globalEnvSpy: jasmine.SpyObj<GlobalEnvironmentVariables>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('GlobalEnvironmentVariables', ['getGlobalUsernameValue']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FriendsService,
        { provide: GlobalEnvironmentVariables, useValue: spy }
      ]
    });
    service = TestBed.inject(FriendsService);
    httpMock = TestBed.inject(HttpTestingController);
    globalEnvSpy = TestBed.inject(GlobalEnvironmentVariables) as jasmine.SpyObj<GlobalEnvironmentVariables>;
    globalEnvSpy.getGlobalUsernameValue.and.returnValue('myUser');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch searched people', () => {
    const dummyUsers: SearchedPeople[] = [
      {
        id: "1",
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        isYourFriend: true,
        bio: 'Test bio',
        profileImageUrl: 'test.png'
      }
    ];

    service.getSearchedPeople('john').subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });

    const req = httpMock.expectOne('http://localhost:8084/api/friends/john');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('myUsername')).toBe('myUser');
    req.flush(dummyUsers);
  });

  it('should add a friend', () => {
    service.addFriend('friendUser').subscribe();

    const req = httpMock.expectOne('http://localhost:8084/api/friends');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('myUsername')).toBe('myUser');
    expect(req.request.headers.get('friendUsername')).toBe('friendUser');
    req.flush(null);
  });

  it('should remove a friend', () => {
    service.removeFriend('friendUser').subscribe();

    const req = httpMock.expectOne('http://localhost:8084/api/friends');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('myUsername')).toBe('myUser');
    expect(req.request.headers.get('friendUsername')).toBe('friendUser');
    req.flush(null);
  });
});
