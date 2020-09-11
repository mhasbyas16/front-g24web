import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuliaBycodeComponent } from './mulia-bycode.component';

describe('MuliaBycodeComponent', () => {
  let component: MuliaBycodeComponent;
  let fixture: ComponentFixture<MuliaBycodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuliaBycodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuliaBycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
