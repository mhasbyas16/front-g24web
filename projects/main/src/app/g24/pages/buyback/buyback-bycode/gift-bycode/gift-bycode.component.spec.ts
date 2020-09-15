import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftBycodeComponent } from './gift-bycode.component';

describe('GiftBycodeComponent', () => {
  let component: GiftBycodeComponent;
  let fixture: ComponentFixture<GiftBycodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftBycodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftBycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
