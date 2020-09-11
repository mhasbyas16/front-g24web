import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BerlianBycodeComponent } from './berlian-bycode.component';

describe('BerlianBycodeComponent', () => {
  let component: BerlianBycodeComponent;
  let fixture: ComponentFixture<BerlianBycodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BerlianBycodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BerlianBycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
