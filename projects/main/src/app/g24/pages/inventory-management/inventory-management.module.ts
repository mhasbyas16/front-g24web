import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryManagementRoutingModule } from './inventory-management-routing.module';
import { MutasiComponent } from './mutasi/mutasi.component';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ApprovalMutasiComponent } from './approval-mutasi/approval-mutasi.component';
import { AcceptMutasiComponent } from './accept-mutasi/accept-mutasi.component';
import { NavModule } from '../../nav/nav.module';
import { CetakMutasiModule } from '../../cetakan/stock/cetak-mutasi/cetak-mutasi.module';
import { CetakMutasiComponent } from './mutasi/cetak-mutasi/cetak-mutasi.component';


@NgModule({
  declarations: [MutasiComponent, ApprovalMutasiComponent, AcceptMutasiComponent, CetakMutasiComponent],
  imports: [
    CommonModule,
    FormsModule,
    NavModule,
    CetakMutasiModule,
    ClarityModule,
    InventoryManagementRoutingModule
  ]
})
export class InventoryManagementModule { }
