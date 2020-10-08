import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBerlianComponent } from './card-berlian.component';

describe('CardBerlianComponent', () => {
  let component: CardBerlianComponent;
  let fixture: ComponentFixture<CardBerlianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBerlianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBerlianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
