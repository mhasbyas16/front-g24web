import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDinarComponent } from './card-dinar.component';

describe('CardDinarComponent', () => {
  let component: CardDinarComponent;
  let fixture: ComponentFixture<CardDinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
