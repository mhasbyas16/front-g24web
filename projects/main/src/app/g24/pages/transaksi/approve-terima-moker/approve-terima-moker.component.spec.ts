import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTerimaMokerComponent } from './approve-terima-moker.component';

describe('ApproveTerimaMokerComponent', () => {
  let component: ApproveTerimaMokerComponent;
  let fixture: ComponentFixture<ApproveTerimaMokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveTerimaMokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTerimaMokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
