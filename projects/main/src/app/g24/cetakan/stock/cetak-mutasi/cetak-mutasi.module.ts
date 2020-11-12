import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CetakMutasiRoutingModule } from './cetak-mutasi-routing.module';
import { CetakMutasiComponent } from './cetak-mutasi.component';
import { CetakTerimaMutasiComponent } from './cetak-terima-mutasi/cetak-terima-mutasi.component';


@NgModule({
  declarations: [CetakMutasiComponent, CetakTerimaMutasiComponent],
  imports: [
    CommonModule,
    CetakMutasiRoutingModule
  ],
  providers: [],
  exports: [
    CetakMutasiComponent,
    CetakTerimaMutasiComponent,
  ],
})
export class CetakMutasiModule { }
