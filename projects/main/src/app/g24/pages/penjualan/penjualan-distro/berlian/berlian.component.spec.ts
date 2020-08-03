import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BerlianComponent } from './berlian.component';

describe('BerlianComponent', () => {
  let component: BerlianComponent;
  let fixture: ComponentFixture<BerlianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BerlianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BerlianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
