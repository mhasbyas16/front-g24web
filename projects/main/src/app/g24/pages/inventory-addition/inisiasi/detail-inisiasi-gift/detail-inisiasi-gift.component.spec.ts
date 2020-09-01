import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInisiasiGiftComponent } from './detail-inisiasi-gift.component';

describe('DetailInisiasiGiftComponent', () => {
  let component: DetailInisiasiGiftComponent;
  let fixture: ComponentFixture<DetailInisiasiGiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInisiasiGiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInisiasiGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
