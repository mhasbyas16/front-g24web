import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardPerhiasanComponent } from './wizard-perhiasan.component';

describe('WizardPerhiasanComponent', () => {
  let component: WizardPerhiasanComponent;
  let fixture: ComponentFixture<WizardPerhiasanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardPerhiasanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardPerhiasanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
