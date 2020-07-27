import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PenjualanRoutingModule } from './penjualan-routing.module';
import { PenjualanDistroComponent } from './penjualan-distro/penjualan-distro.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerhiasanComponent } from './penjualan-distro/perhiasan/perhiasan.component';
import { NavModule } from '../../nav/nav.module';
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  declarations: [PenjualanDistroComponent, PerhiasanComponent],
  imports: [
    CommonModule,
    PenjualanRoutingModule,
    ClarityModule,
    FormsModule,
    NavModule,
    NgxBarcodeModule,
  ],
  exports : [
    PenjualanDistroComponent,
  ]
})
export class PenjualanModule { }
