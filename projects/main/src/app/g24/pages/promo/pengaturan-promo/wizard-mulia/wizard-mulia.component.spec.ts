import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardMuliaComponent } from './wizard-mulia.component';

describe('WizardMuliaComponent', () => {
  let component: WizardMuliaComponent;
  let fixture: ComponentFixture<WizardMuliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WizardMuliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WizardMuliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
