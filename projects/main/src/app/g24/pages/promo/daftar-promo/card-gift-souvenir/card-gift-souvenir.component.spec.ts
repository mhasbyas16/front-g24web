import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGiftSouvenirComponent } from './card-gift-souvenir.component';

describe('CardGiftSouvenirComponent', () => {
  let component: CardGiftSouvenirComponent;
  let fixture: ComponentFixture<CardGiftSouvenirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardGiftSouvenirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardGiftSouvenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
