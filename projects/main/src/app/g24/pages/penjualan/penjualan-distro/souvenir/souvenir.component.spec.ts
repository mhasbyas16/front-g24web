import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouvenirComponent } from './souvenir.component';

describe('SouvenirComponent', () => {
  let component: SouvenirComponent;
  let fixture: ComponentFixture<SouvenirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouvenirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouvenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
