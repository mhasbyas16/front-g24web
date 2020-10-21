import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InisiasiBahanBakuComponent } from './inisiasi-bahan-baku.component';

describe('InisiasiBahanBakuComponent', () => {
  let component: InisiasiBahanBakuComponent;
  let fixture: ComponentFixture<InisiasiBahanBakuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InisiasiBahanBakuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InisiasiBahanBakuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
