import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaySearchComponent } from './bay-search.component';

describe('BaySearchComponent', () => {
  let component: BaySearchComponent;
  let fixture: ComponentFixture<BaySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
