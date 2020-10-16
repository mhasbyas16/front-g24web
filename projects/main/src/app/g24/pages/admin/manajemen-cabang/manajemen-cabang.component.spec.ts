import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManajemenCabangComponent } from './manajemen-cabang.component';

describe('ManajemenCabangComponent', () => {
  let component: ManajemenCabangComponent;
  let fixture: ComponentFixture<ManajemenCabangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManajemenCabangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManajemenCabangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
