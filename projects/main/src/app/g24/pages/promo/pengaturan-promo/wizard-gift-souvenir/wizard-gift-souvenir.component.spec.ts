import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardGiftSouvenirComponent } from './wizard-gift-souvenir.component';

describe('WizardGiftSouvenirComponent', () => {
  let component: WizardGiftSouvenirComponent;
  let fixture: ComponentFixture<WizardGiftSouvenirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardGiftSouvenirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardGiftSouvenirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
