import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryAdditionRoutingModule } from './inventory-addition-routing.module';
import { InisiasiComponent } from './inisiasi/inisiasi.component';
import { PemesananComponent } from './pemesanan/pemesanan.component';
import { ClarityModule } from '@clr/angular';
import { DetailInisiasiPerhiasanComponent } from './inisiasi/detail-inisiasi-perhiasan/detail-inisiasi-perhiasan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [InisiasiComponent, PemesananComponent, DetailInisiasiPerhiasanComponent],
  imports: [
    CommonModule,
    InventoryAdditionRoutingModule,
    ClarityModule,
    FormsModule
  ],
  exports: [InisiasiComponent, PemesananComponent],
  entryComponents: [InisiasiComponent, PemesananComponent]
})
export class InventoryAdditionModule
{
  static key = "1";
}
