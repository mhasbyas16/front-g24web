import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ToastrModule } from 'ngx-toastr';

import { BuybackRoutingModule } from './buyback-routing.module';
import { BuybackBycodeComponent } from './buyback-bycode/buyback-bycode.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavModule } from '../../nav/nav.module';

import { PerhiasanBycodeComponent } from './buyback-bycode/perhiasan-bycode/perhiasan-bycode.component';
import { MuliaBycodeComponent } from './buyback-bycode/mulia-bycode/mulia-bycode.component';
import { BerlianBycodeComponent } from './buyback-bycode/berlian-bycode/berlian-bycode.component';
import { GiftBycodeComponent } from './buyback-bycode/gift-bycode/gift-bycode.component';
import { SouvenirBycodeComponent } from './buyback-bycode/souvenir-bycode/souvenir-bycode.component';
import { DinarBycodeComponent } from './buyback-bycode/dinar-bycode/dinar-bycode.component';
import { ParameterBuybackComponent } from './parameter-buyback/parameter-buyback.component';
import { BuybackManualComponent } from './buyback-manual/buyback-manual.component';

import { MuliaManualComponent } from './buyback-manual/mulia-manual/mulia-manual.component';
import { ParameterAcceptBuybackComponent } from './parameter-accept-buyback/parameter-accept-buyback.component';



@NgModule({
  declarations: [BuybackBycodeComponent, PerhiasanBycodeComponent, MuliaBycodeComponent, BerlianBycodeComponent, GiftBycodeComponent, SouvenirBycodeComponent, DinarBycodeComponent, ParameterBuybackComponent, BuybackManualComponent, MuliaManualComponent, ParameterAcceptBuybackComponent],
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
