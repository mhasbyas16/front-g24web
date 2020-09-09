import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouvenirBycodeComponent } from './souvenir-bycode.component';

describe('SouvenirBycodeComponent', () => {
  let component: SouvenirBycodeComponent;
  let fixture: ComponentFixture<SouvenirBycodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouvenirBycodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouvenirBycodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
