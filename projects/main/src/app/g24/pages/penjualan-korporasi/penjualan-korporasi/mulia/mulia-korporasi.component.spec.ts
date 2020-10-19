import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuliaKorporasiComponent } from './mulia-korporasi.component';

describe('MuliaKorporasiComponent', () => {
  let component: MuliaKorporasiComponent;
  let fixture: ComponentFixture<MuliaKorporasiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuliaKorporasiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuliaKorporasiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
