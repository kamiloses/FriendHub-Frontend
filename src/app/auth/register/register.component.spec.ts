import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { RegisterService } from './register.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let registerServiceSpy: jasmine.SpyObj<RegisterService>;

  beforeEach(async () => {
    registerServiceSpy = jasmine.createSpyObj('RegisterService', ['signUp']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: RegisterService, useValue: registerServiceSpy },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid on start', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should not call service if form invalid', () => {
    component.onSubmit();
    expect(registerServiceSpy.signUp).not.toHaveBeenCalled();
  });

  it('should call service on valid form submit', () => {
    component.registerForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      username: 'john123',
      password: 'pass1234'
    });

    registerServiceSpy.signUp.and.returnValue(of({
      message: 'ok'
    }));

    component.onSubmit();

    expect(registerServiceSpy.signUp).toHaveBeenCalled();
  });
});
