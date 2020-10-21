import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtorisasiMokerComponent } from './otorisasi-moker.component';

describe('OtorisasiMokerComponent', () => {
  let component: OtorisasiMokerComponent;
  let fixture: ComponentFixture<OtorisasiMokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtorisasiMokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtorisasiMokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
