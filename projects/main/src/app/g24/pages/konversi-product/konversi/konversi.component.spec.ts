import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonversiComponent } from './konversi.component';

describe('KonversiComponent', () => {
  let component: KonversiComponent;
  let fixture: ComponentFixture<KonversiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonversiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonversiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
