import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PenjualanRoutingModule } from './penjualan-routing.module';
import { PenjualanDistroComponent } from './penjualan-distro/penjualan-distro.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerhiasanComponent } from './penjualan-distro/perhiasan/perhiasan.component';

@NgModule({
  declarations: [PenjualanDistroComponent, PerhiasanComponent],
  imports: [
    CommonModule,
    PenjualanRoutingModule,
    ClarityModule,
    FormsModule
  ],
  exports : [
    PenjualanDistroComponent,
  ]
})
export class PenjualanModule { }
