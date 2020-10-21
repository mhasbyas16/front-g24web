import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { KonversiProductRoutingModule } from './konversi-product-routing.module';
import { KonversiComponent } from './konversi/konversi.component';
import { DetailKonversiComponent } from './konversi/detail-konversi/detail-konversi.component';
import { ApprovalKonversiComponent } from './approval-konversi/approval-konversi.component';
import { DetailApprovalKonversiComponent } from './approval-konversi/detail-approval-konversi/detail-approval-konversi.component';
import { NavModule } from '../../nav/nav.module';

@NgModule({
  declarations: [KonversiComponent, DetailKonversiComponent, ApprovalKonversiComponent, DetailApprovalKonversiComponent],
  imports: [
    CommonModule,
    NavModule,
    ClarityModule,
    FormsModule,
    KonversiProductRoutingModule
  ]
})
export class KonversiProductModule { }
