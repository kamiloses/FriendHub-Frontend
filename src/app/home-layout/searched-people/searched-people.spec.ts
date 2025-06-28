import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchedPeople } from './searched-people';

describe('SearchedPeople', () => {
  let component: SearchedPeople;
  let fixture: ComponentFixture<SearchedPeople>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchedPeople]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchedPeople);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
