import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerhiasanComponent } from './perhiasan.component';

describe('PerhiasanComponent', () => {
  let component: PerhiasanComponent;
  let fixture: ComponentFixture<PerhiasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerhiasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerhiasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
