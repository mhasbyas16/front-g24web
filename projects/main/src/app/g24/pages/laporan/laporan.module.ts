import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ToastrModule } from 'ngx-toastr';

import { LaporanPenjualanComponent } from './laporan-penjualan/laporan-penjualan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LaporanRoutingModule } from './laporan-routing.module';
import { NavModule } from '../../nav/nav.module';
import { DatePipe } from '@angular/common';
import { ExportLaporanComponent } from './export-laporan/export-laporan.component';
import { RekeningKoranComponent } from './rekening-koran/rekening-koran.component';
import { ExportKorporasiProformaComponent } from './export-korporasi-proforma/export-korporasi-proforma.component';



@NgModule({
  declarations: [LaporanPenjualanComponent, ExportLaporanComponent, RekeningKoranComponent, ExportKorporasiProformaComponent],
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
    ExportKorporasiProformaComponent,
  ]
})
export class LaporanModule { }
