import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { InventoryAdditionRoutingModule } from './inventory-addition-routing.module';
import { InisiasiComponent } from './inisiasi/inisiasi.component';
import { PemesananComponent } from './pemesanan/pemesanan.component';
import { DetailInisiasiPerhiasanComponent } from './inisiasi/detail-inisiasi-perhiasan/detail-inisiasi-perhiasan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PenerimaanComponent } from './penerimaan/penerimaan.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
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
import { DetailPenerimaanEmasComponent } from './penerimaan/detail-penerimaan-emas/detail-penerimaan-emas.component';
import { DetailItemPenerimaanEmasComponent } from './penerimaan/detail-penerimaan-emas/detail-item-penerimaan-emas/detail-item-penerimaan-emas.component';
import { InisiasiApprovalComponent } from './inisiasi-approval/inisiasi-approval.component';
import { DetailInisiasiApprovalPerhiasanComponent } from './inisiasi-approval/detail-inisiasi-approval-perhiasan/detail-inisiasi-approval-perhiasan.component';
import { DetailItemInisiasiApprovalPerhiasanComponent } from './inisiasi-approval/detail-inisiasi-approval-perhiasan/detail-item-inisiasi-approval-perhiasan/detail-item-inisiasi-approval-perhiasan.component';
import { DetailInisiasiPermataComponent } from './inisiasi/detail-inisiasi-permata/detail-inisiasi-permata.component';
import { DetailInisiasiDinarComponent } from './inisiasi/detail-inisiasi-dinar/detail-inisiasi-dinar.component';
import { DetailPenerimaanDinarComponent } from './penerimaan/detail-penerimaan-dinar/detail-penerimaan-dinar.component';
import { DetailItemPenerimaanDinarComponent } from './penerimaan/detail-penerimaan-dinar/detail-item-penerimaan-dinar/detail-item-penerimaan-dinar.component';
import { DetailInisiasiApprovalSouvenirComponent } from './inisiasi-approval/detail-inisiasi-approval-souvenir/detail-inisiasi-approval-souvenir.component';
import { DetailItemInisiasiApprovalSouvenirComponent } from './inisiasi-approval/detail-inisiasi-approval-souvenir/detail-item-inisiasi-approval-souvenir/detail-item-inisiasi-approval-souvenir.component';
import { DetailInisiasiApprovalGiftComponent } from './inisiasi-approval/detail-inisiasi-approval-gift/detail-inisiasi-approval-gift.component';
import { DetailItemInisiasiApprovalGiftComponent } from './inisiasi-approval/detail-inisiasi-approval-gift/detail-item-inisiasi-approval-gift/detail-item-inisiasi-approval-gift.component';
import { DetailInisiasiApprovalEmasBatanganComponent } from './inisiasi-approval/detail-inisiasi-approval-emas-batangan/detail-inisiasi-approval-emas-batangan.component';
import { DetailItemInisiasiApprovalEmasBatanganComponent } from './inisiasi-approval/detail-inisiasi-approval-emas-batangan/detail-item-inisiasi-approval-emas-batangan/detail-item-inisiasi-approval-emas-batangan.component';
import { DetailInisiasiApprovalDinarComponent } from './inisiasi-approval/detail-inisiasi-approval-dinar/detail-inisiasi-approval-dinar.component';
import { DetailItemInisiasiApprovalDinarComponent } from './inisiasi-approval/detail-inisiasi-approval-dinar/detail-item-inisiasi-approval-dinar/detail-item-inisiasi-approval-dinar.component';
import { DetailInisiasiApprovalPermataComponent } from './inisiasi-approval/detail-inisiasi-approval-permata/detail-inisiasi-approval-permata.component';
import { DetailItemInisiasiApprovalPermataComponent } from './inisiasi-approval/detail-inisiasi-approval-permata/detail-item-inisiasi-approval-permata/detail-item-inisiasi-approval-permata.component';

@NgModule({
  declarations: 
  [
    InisiasiComponent,
    PemesananComponent,
    DetailInisiasiPerhiasanComponent,
    PenerimaanComponent,
    DetailInisiasiEmasComponent, 
    DetailInisiasiSouvenirComponent, 
    DetailInisiasiPerhiasanComponent,
    DetailPenerimaanPerhiasanComponent,
    DetailItemPenerimaanPerhiasanComponent,
    DetailPenerimaanSouvenirComponent,
    DetailItemPenerimaanSouvenirComponent,
    DetailInisiasiGiftComponent,
    DetailPenerimaanGiftComponent,
    DetailItemPenerimaanGiftComponent,
    DetailPenerimaanEmasComponent,
    DetailItemPenerimaanEmasComponent,
    InisiasiApprovalComponent,
    DetailInisiasiApprovalPerhiasanComponent,
    DetailItemInisiasiApprovalPerhiasanComponent,
    DetailInisiasiPermataComponent,
    DetailInisiasiDinarComponent,
    DetailPenerimaanDinarComponent,
    DetailItemPenerimaanDinarComponent,
    DetailInisiasiApprovalSouvenirComponent,
    DetailItemInisiasiApprovalSouvenirComponent,
    DetailInisiasiApprovalGiftComponent,
    DetailItemInisiasiApprovalGiftComponent,
    DetailInisiasiApprovalEmasBatanganComponent,
    DetailItemInisiasiApprovalEmasBatanganComponent,
    DetailInisiasiApprovalDinarComponent,
    DetailItemInisiasiApprovalDinarComponent,
    DetailInisiasiApprovalPermataComponent,
    DetailItemInisiasiApprovalPermataComponent
  ], 
  imports: [
    CommonModule,
    InventoryAdditionRoutingModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    NgxMaskModule
  ],
  exports: [InisiasiComponent, PemesananComponent],
  entryComponents: [InisiasiComponent, PemesananComponent],
  providers : [DatePipe]
})
export class InventoryAdditionModule
{
  static key = "1";
}
