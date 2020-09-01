import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ToastrModule } from 'ngx-toastr';

import { BuybackRoutingModule } from './buyback-routing.module';
import { BuybackBycodeComponent } from './buyback-bycode/buyback-bycode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavModule } from '../../nav/nav.module';

import { PerhiasanBycodeComponent } from './buyback-bycode/perhiasan-bycode/perhiasan-bycode.component';



@NgModule({
  declarations: [BuybackBycodeComponent, PerhiasanBycodeComponent],
  imports: [
    CommonModule,
    BuybackRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    NavModule
  ]
})
export class BuybackModule { }
