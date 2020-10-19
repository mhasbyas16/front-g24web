import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenjualanBerjangkaComponent } from './penjualan-berjangka.component';

describe('PenjualanBerjangkaComponent', () => {
  let component: PenjualanBerjangkaComponent;
  let fixture: ComponentFixture<PenjualanBerjangkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenjualanBerjangkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenjualanBerjangkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
