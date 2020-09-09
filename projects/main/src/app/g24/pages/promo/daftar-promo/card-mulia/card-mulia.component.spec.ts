import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMuliaComponent } from './card-mulia.component';

describe('CardMuliaComponent', () => {
  let component: CardMuliaComponent;
  let fixture: ComponentFixture<CardMuliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardMuliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardMuliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
