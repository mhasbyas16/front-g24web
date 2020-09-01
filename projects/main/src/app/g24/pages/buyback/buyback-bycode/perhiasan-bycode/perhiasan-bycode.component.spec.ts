import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerhiasanBycodeComponent } from './perhiasan-bycode.component';

describe('PerhiasanBycodeComponent', () => {
  let component: PerhiasanBycodeComponent;
  let fixture: ComponentFixture<PerhiasanBycodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerhiasanBycodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerhiasanBycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
