import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//layout
import { PengajuanAnggaranComponent } from './pengajuan-anggaran/pengajuan-anggaran.component';
import { PergeseranAnggaranComponent } from './pergeseran-anggaran/pergeseran-anggaran.component';

//add ons
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavModule } from '../../nav/nav.module';
import { DatePipe } from '@angular/common';
import { NgSelect2Module } from "ng-select2";

@NgModule({
  declarations: [PengajuanAnggaranComponent, PergeseranAnggaranComponent],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    NavModule,
    ReactiveFormsModule,
    NgSelect2Module,
  ],
  exports : [],
  providers:[
    DatePipe
  ]
})
export class AnggaranModule { }
