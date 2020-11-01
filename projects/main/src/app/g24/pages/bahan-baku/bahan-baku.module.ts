import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClarityModule } from '@clr/angular';
import { BahanBakuRoutingModule } from './bahan-baku-routing.module';
import { InisiasiBahanBakuComponent } from './inisiasi-bahan-baku/inisiasi-bahan-baku.component';
import { InisiasiApprovalBahanBakuComponent } from './inisiasi-approval-bahan-baku/inisiasi-approval-bahan-baku.component';
import { InisiasiPenerimaanBahanBakuComponent } from './inisiasi-penerimaan-bahan-baku/inisiasi-penerimaan-bahan-baku.component';
import { from } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NavModule } from '../../nav/nav.module';


@NgModule({
  declarations: [InisiasiBahanBakuComponent, InisiasiApprovalBahanBakuComponent, InisiasiPenerimaanBahanBakuComponent],
  imports: [
    CommonModule,
    NavModule,
    BahanBakuRoutingModule,
    ClarityModule,
    FormsModule
  ]
})
export class BahanBakuModule { }
