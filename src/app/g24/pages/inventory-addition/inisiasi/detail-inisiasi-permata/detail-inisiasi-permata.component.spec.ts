import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiPermataComponent } from './detail-inisiasi-permata.component';

describe('DetailInisiasiPermataComponent', () => {
  let component: DetailInisiasiPermataComponent;
  let fixture: ComponentFixture<DetailInisiasiPermataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiPermataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiPermataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
