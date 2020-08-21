import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptMutasiComponent } from './accept-mutasi.component';

describe('AcceptMutasiComponent', () => {
  let component: AcceptMutasiComponent;
  let fixture: ComponentFixture<AcceptMutasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptMutasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptMutasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
