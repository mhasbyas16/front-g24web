import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputVendorComponent } from './input-vendor.component';

describe('InputVendorComponent', () => {
  let component: InputVendorComponent;
  let fixture: ComponentFixture<InputVendorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputVendorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
