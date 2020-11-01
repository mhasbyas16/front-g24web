import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerhiasanManualComponent } from './perhiasan-manual.component';

describe('PerhiasanManualComponent', () => {
  let component: PerhiasanManualComponent;
  let fixture: ComponentFixture<PerhiasanManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerhiasanManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerhiasanManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
