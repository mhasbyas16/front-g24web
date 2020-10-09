import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardDinarComponent } from './wizard-dinar.component';

describe('WizardDinarComponent', () => {
  let component: WizardDinarComponent;
  let fixture: ComponentFixture<WizardDinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardDinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardDinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
