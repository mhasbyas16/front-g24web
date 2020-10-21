import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailItemPenerimaanPermataComponent } from './detail-item-penerimaan-permata.component';

describe('DetailItemPenerimaanPermataComponent', () => {
  let component: DetailItemPenerimaanPermataComponent;
  let fixture: ComponentFixture<DetailItemPenerimaanPermataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailItemPenerimaanPermataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailItemPenerimaanPermataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
