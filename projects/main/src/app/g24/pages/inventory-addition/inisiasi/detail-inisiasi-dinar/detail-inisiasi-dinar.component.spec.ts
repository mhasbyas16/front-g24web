import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiDinarComponent } from './detail-inisiasi-dinar.component';

describe('DetailInisiasiDinarComponent', () => {
  let component: DetailInisiasiDinarComponent;
  let fixture: ComponentFixture<DetailInisiasiDinarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiDinarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiDinarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
