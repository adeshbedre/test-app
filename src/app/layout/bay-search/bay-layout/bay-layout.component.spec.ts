import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BayLayoutComponent } from './bay-layout.component';

describe('BayLayoutComponent', () => {
  let component: BayLayoutComponent;
  let fixture: ComponentFixture<BayLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BayLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BayLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
