import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParameterGelleryComponent } from './parameter-gellery/parameter-gellery.component';
import { ParameterBerlianComponent } from './parameter-gellery/parameter-berlian/parameter-berlian.component';
import { ParameterPerhiasanComponent } from './parameter-gellery/parameter-perhiasan/parameter-perhiasan.component';
import { ParameterSovenirComponent } from './parameter-gellery/parameter-sovenir/parameter-sovenir.component';

//add ons
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavModule } from '../../nav/nav.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [ParameterGelleryComponent, ParameterBerlianComponent, ParameterPerhiasanComponent, ParameterSovenirComponent],
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
