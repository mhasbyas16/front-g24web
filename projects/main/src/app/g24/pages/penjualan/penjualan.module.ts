import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PenjualanRoutingModule } from './penjualan-routing.module';
import { PenjualanDistroComponent } from './penjualan-distro/penjualan-distro.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerhiasanComponent } from './penjualan-distro/perhiasan/perhiasan.component';
import { NavModule } from '../../nav/nav.module';
import { BerlianComponent } from './penjualan-distro/berlian/berlian.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [PenjualanDistroComponent, PerhiasanComponent, BerlianComponent],
  imports: [
    CommonModule,
    PenjualanRoutingModule,
    ClarityModule,
    FormsModule,
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
