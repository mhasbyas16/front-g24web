import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManajemenDistroComponent } from './manajemen-distro.component';

describe('ManajemenDistroComponent', () => {
  let component: ManajemenDistroComponent;
  let fixture: ComponentFixture<ManajemenDistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManajemenDistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManajemenDistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
