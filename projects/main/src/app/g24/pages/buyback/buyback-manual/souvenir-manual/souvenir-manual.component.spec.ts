import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouvenirManualComponent } from './souvenir-manual.component';

describe('SouvenirManualComponent', () => {
  let component: SouvenirManualComponent;
  let fixture: ComponentFixture<SouvenirManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouvenirManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouvenirManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
