import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupHargaComponent } from './setup-harga.component';

describe('SetupHargaComponent', () => {
  let component: SetupHargaComponent;
  let fixture: ComponentFixture<SetupHargaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupHargaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupHargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
