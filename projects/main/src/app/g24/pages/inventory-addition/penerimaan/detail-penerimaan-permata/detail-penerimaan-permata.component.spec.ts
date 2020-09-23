import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPenerimaanPermataComponent } from './detail-penerimaan-permata.component';

describe('DetailPenerimaanPermataComponent', () => {
  let component: DetailPenerimaanPermataComponent;
  let fixture: ComponentFixture<DetailPenerimaanPermataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPenerimaanPermataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPenerimaanPermataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
