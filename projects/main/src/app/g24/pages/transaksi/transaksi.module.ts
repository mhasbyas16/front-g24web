import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//layout
import { InputMokerComponent } from './input-moker/input-moker.component';
import { ExportPdfComponent } from './export-pdf/export-pdf.component';
import { OtorisasiMokerComponent } from './otorisasi-moker/otorisasi-moker.component';
import { TerimaMokerComponent } from './terima-moker/terima-moker.component';
import { ApproveTerimaMokerComponent } from './approve-terima-moker/approve-terima-moker.component';

//add ons
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavModule } from '../../nav/nav.module';
import { DatePipe } from '@angular/common';
import { NgSelect2Module } from "ng-select2";
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [InputMokerComponent, ExportPdfComponent, OtorisasiMokerComponent, TerimaMokerComponent, ApproveTerimaMokerComponent],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    NavModule,
    ReactiveFormsModule,
    NgSelect2Module,
    NgxMaskModule.forRoot()
  ],
  exports : [],
  providers:[
    DatePipe
  ]
})
export class TransaksiModule { }
