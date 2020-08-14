import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MutasiComponent } from './mutasi.component';

describe('MutasiComponent', () => {
  let component: MutasiComponent;
  let fixture: ComponentFixture<MutasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MutasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MutasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
