import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManajemenPadananDistroComponent } from './manajemen-padanan-distro.component';

describe('ManajemenPadananDistroComponent', () => {
  let component: ManajemenPadananDistroComponent;
  let fixture: ComponentFixture<ManajemenPadananDistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManajemenPadananDistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManajemenPadananDistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
