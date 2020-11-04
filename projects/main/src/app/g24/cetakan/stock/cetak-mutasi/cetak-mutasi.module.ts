import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CetakMutasiRoutingModule } from './cetak-mutasi-routing.module';
import { CetakMutasiComponent } from './cetak-mutasi.component';


@NgModule({
  declarations: [CetakMutasiComponent],
  imports: [
    CommonModule,
    CetakMutasiRoutingModule
  ]
})
export class CetakMutasiModule { }
