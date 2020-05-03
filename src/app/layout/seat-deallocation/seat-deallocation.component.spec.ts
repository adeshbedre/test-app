import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatDeallocationComponent } from './seat-deallocation.component';

describe('SeatDeallocationComponent', () => {
  let component: SeatDeallocationComponent;
  let fixture: ComponentFixture<SeatDeallocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatDeallocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatDeallocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
