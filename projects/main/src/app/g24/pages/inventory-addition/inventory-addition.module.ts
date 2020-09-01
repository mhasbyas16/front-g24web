import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { InventoryAdditionRoutingModule } from './inventory-addition-routing.module';
import { InisiasiComponent } from './inisiasi/inisiasi.component';
import { PemesananComponent } from './pemesanan/pemesanan.component';
import { DetailInisiasiPerhiasanComponent } from './inisiasi/detail-inisiasi-perhiasan/detail-inisiasi-perhiasan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PenerimaanComponent } from './penerimaan/penerimaan.component';
import { ToastrModule } from 'ngx-toastr';
import { DetailInisiasiBerlianComponent } from './inisiasi/detail-inisiasi-berlian/detail-inisiasi-berlian.component';
import { DetailInisiasiEmasComponent } from './inisiasi/detail-inisiasi-emas/detail-inisiasi-emas.component';
import { DetailInisiasiSouvenirComponent } from './inisiasi/detail-inisiasi-souvenir/detail-inisiasi-souvenir.component';
import { ClarityModule } from '@clr/angular';
import { DetailPenerimaanPerhiasanComponent } from './penerimaan/detail-penerimaan-perhiasan/detail-penerimaan-perhiasan.component';
import { DetailItemPenerimaanPerhiasanComponent } from './penerimaan/detail-penerimaan-perhiasan/detail-item-penerimaan-perhiasan/detail-item-penerimaan-perhiasan.component';
import { DetailPenerimaanSouvenirComponent } from './penerimaan/detail-penerimaan-souvenir/detail-penerimaan-souvenir.component';
import { DetailItemPenerimaanSouvenirComponent } from './penerimaan/detail-penerimaan-souvenir/detail-item-penerimaan-souvenir/detail-item-penerimaan-souvenir.component';
import { DetailInisiasiGiftComponent } from './inisiasi/detail-inisiasi-gift/detail-inisiasi-gift.component';
import { DetailPenerimaanGiftComponent } from './penerimaan/detail-penerimaan-gift/detail-penerimaan-gift.component';
import { DetailItemPenerimaanGiftComponent } from './penerimaan/detail-penerimaan-gift/detail-item-penerimaan-gift/detail-item-penerimaan-gift.component';

@NgModule({
  declarations: 
  [
    InisiasiComponent,
    PemesananComponent,
    DetailInisiasiPerhiasanComponent,
    PenerimaanComponent, 
    DetailInisiasiBerlianComponent, 
    DetailInisiasiEmasComponent, 
    DetailInisiasiSouvenirComponent, 
    DetailInisiasiPerhiasanComponent,
    DetailPenerimaanPerhiasanComponent,
    DetailItemPenerimaanPerhiasanComponent,
    DetailPenerimaanSouvenirComponent,
    DetailItemPenerimaanSouvenirComponent,
    DetailInisiasiGiftComponent,
    DetailPenerimaanGiftComponent,
    DetailItemPenerimaanGiftComponent],
  imports: [
    CommonModule,
    InventoryAdditionRoutingModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    
  ],
  exports: [InisiasiComponent, PemesananComponent],
  entryComponents: [InisiasiComponent, PemesananComponent],
  providers : [DatePipe]
})
export class InventoryAdditionModule
{
  static key = "1";
}
