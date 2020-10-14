import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PenjualanKorporasiRoutingModule } from './penjualan-korporasi-routing.module';
import { PenjualanKorporasiComponent } from './penjualan-korporasi/penjualan-korporasi.component';
import { MuliaKorporasiComponent } from './penjualan-korporasi/mulia/mulia-korporasi.component';
import { NavModule } from '../../nav/nav.module';
import { ListPenjualanKorporasiComponent } from './list-penjualan-korporasi/list-penjualan-korporasi.component';
import { CardDetailComponent } from './list-penjualan-korporasi/card-detail/card-detail.component';


@NgModule({
  declarations: [PenjualanKorporasiComponent, MuliaKorporasiComponent, ListPenjualanKorporasiComponent, CardDetailComponent ],
  imports: [
    NavModule,
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    PenjualanKorporasiRoutingModule
  ],
  exports :[

  ]
})
export class PenjualanKorporasiModule { }
