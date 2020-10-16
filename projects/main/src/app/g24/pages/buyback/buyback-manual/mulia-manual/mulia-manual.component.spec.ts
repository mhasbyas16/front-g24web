import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuliaManualComponent } from './mulia-manual.component';

describe('MuliaManualComponent', () => {
  let component: MuliaManualComponent;
  let fixture: ComponentFixture<MuliaManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuliaManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuliaManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
