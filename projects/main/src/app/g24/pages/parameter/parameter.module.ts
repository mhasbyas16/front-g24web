import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParameterGelleryComponent } from './parameter-gellery/parameter-gellery.component';
import { SetupHargaComponent } from "./parameter-gellery/setup-harga/setup-harga.component";
import { SetupMarginComponent } from "./parameter-gellery/setup-margin/setup-margin.component";

//add ons
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavModule } from '../../nav/nav.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [ParameterGelleryComponent, SetupHargaComponent, SetupMarginComponent],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    NavModule,
    ReactiveFormsModule,
  ],
  exports : [],
  providers:[
    DatePipe
  ]
})
export class ParameterModule { }
