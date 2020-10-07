import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PenjualanRoutingModule } from './penjualan-routing.module';
import { PenjualanDistroComponent } from './penjualan-distro/penjualan-distro.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerhiasanComponent } from './penjualan-distro/perhiasan/perhiasan.component';
import { NavModule } from '../../nav/nav.module';
import { NgxBarcodeModule } from 'ngx-barcode';
import { MuliaComponent } from './penjualan-distro/mulia/mulia.component';
import { BerlianComponent } from './penjualan-distro/berlian/berlian.component';
import { DatePipe } from '@angular/common';
import { SouvenirComponent } from './penjualan-distro/souvenir/souvenir.component';
import { DinarComponent } from './penjualan-distro/dinar/dinar.component';
import { PenjualanKorporasiComponent } from './penjualan-korporasi/penjualan-korporasi.component';
import { MuliaKorporasiComponent } from './penjualan-korporasi/mulia/mulia-korporasi.component';



@NgModule({
  declarations: [PenjualanDistroComponent, PerhiasanComponent, BerlianComponent, MuliaComponent, SouvenirComponent, DinarComponent, PenjualanKorporasiComponent, MuliaKorporasiComponent],
  imports: [
    CommonModule,
    PenjualanRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    NavModule,
  ],
  exports : [
    PenjualanDistroComponent,
  ],
  providers:[
    DatePipe
  ]
})
export class PenjualanModule { }
