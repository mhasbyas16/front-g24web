import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuybackBycodeComponent } from './buyback-bycode.component';

describe('BuybackBycodeComponent', () => {
  let component: BuybackBycodeComponent;
  let fixture: ComponentFixture<BuybackBycodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuybackBycodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuybackBycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
