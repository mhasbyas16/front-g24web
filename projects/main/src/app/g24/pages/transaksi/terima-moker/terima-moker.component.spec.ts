import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerimaMokerComponent } from './terima-moker.component';

describe('TerimaMokerComponent', () => {
  let component: TerimaMokerComponent;
  let fixture: ComponentFixture<TerimaMokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerimaMokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerimaMokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
