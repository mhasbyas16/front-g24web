import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenjualanDistroComponent } from './penjualan-distro.component';

describe('PenjualanDistroComponent', () => {
  let component: PenjualanDistroComponent;
  let fixture: ComponentFixture<PenjualanDistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenjualanDistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenjualanDistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
