import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPerhiasanComponent } from './card-perhiasan.component';

describe('CardPerhiasanComponent', () => {
  let component: CardPerhiasanComponent;
  let fixture: ComponentFixture<CardPerhiasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPerhiasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPerhiasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
