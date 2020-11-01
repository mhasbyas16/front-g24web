import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuybackManualComponent } from './buyback-manual.component';

describe('BuybackManualComponent', () => {
  let component: BuybackManualComponent;
  let fixture: ComponentFixture<BuybackManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuybackManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuybackManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
