import { TestBed } from '@angular/core/testing';
import { RegisterService } from './register.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterRequestModel } from './register-request.model';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call signup API with POST', () => {
    const mockRequest: RegisterRequestModel = {
      firstName: 'John',
      lastName: 'Doe',
      username: 'john123',
      password: 'pass1234'
    };

    service.signUp(mockRequest).subscribe();

    const req = httpMock.expectOne('http://localhost:8081/api/user/signup');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockRequest);

    req.flush({});
  });
});
