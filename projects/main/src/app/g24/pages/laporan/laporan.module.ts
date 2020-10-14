import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ToastrModule } from 'ngx-toastr';

import { LaporanPenjualanComponent } from './laporan-penjualan/laporan-penjualan.component';
import { LaporanBuybackComponent } from './laporan-buyback/laporan-buyback.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaporanRoutingModule } from './laporan-routing.module';
import { NavModule } from '../../nav/nav.module';
import { DatePipe } from '@angular/common';
import { ExportLaporanComponent } from './export-laporan/export-laporan.component';
import { ExportLaporanBuybackBycodeComponent } from './export-laporan-buyback-bycode/export-laporan-buyback-bycode.component';
import { RekeningKoranComponent } from './rekening-koran/rekening-koran.component';
import { LaporanBuybackManualComponent } from './laporan-buyback-manual/laporan-buyback-manual.component';
import { ExportLaporanBuybackManualComponent } from './export-laporan-buyback-manual/export-laporan-buyback-manual.component';



@NgModule({
  declarations: [LaporanPenjualanComponent, ExportLaporanComponent, RekeningKoranComponent, LaporanBuybackComponent,ExportLaporanBuybackBycodeComponent, LaporanBuybackManualComponent, ExportLaporanBuybackManualComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LaporanRoutingModule,
    ClarityModule,
    ToastrModule,
    NavModule
  ],
  exports:[
  ],
  providers:[
    DatePipe
  ]
})
export class LaporanModule { }
