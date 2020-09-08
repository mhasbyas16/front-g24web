import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardBerlianComponent } from './wizard-berlian.component';

describe('WizardBerlianComponent', () => {
  let component: WizardBerlianComponent;
  let fixture: ComponentFixture<WizardBerlianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardBerlianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardBerlianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
