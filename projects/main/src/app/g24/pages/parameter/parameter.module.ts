import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//layout
import { ParameterGelleryComponent } from './parameter-gellery/parameter-gellery.component';
import { SetupHargaComponent } from "./parameter-gellery/setup-harga/setup-harga.component";
import { SetupMarginComponent } from "./parameter-gellery/setup-margin/setup-margin.component";
import { ParameterGlobalComponent } from './parameter-global/parameter-global.component';

//add ons
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavModule } from '../../nav/nav.module';
import { DatePipe } from '@angular/common';
import { NgSelect2Module } from "ng-select2";

@NgModule({
  declarations: [ParameterGelleryComponent, SetupHargaComponent, SetupMarginComponent, ParameterGlobalComponent],
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
export class ParameterModule { }
