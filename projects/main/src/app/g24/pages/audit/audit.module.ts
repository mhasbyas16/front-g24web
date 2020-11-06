import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditRoutingModule } from './audit-routing.module';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { DetailAuditLogComponent } from './audit-log/detail-audit-log/detail-audit-log.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { NavModule } from 'projects/platform/src/app/pages/nav/nav.module';
import { InventoryAdditionRoutingModule } from '../inventory-addition/inventory-addition-routing.module';


@NgModule({
  declarations: [AuditLogComponent, DetailAuditLogComponent],
  imports: [
    AuditRoutingModule,
    CommonModule,
    NavModule,
    InventoryAdditionRoutingModule,
    ClarityModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule,
    NgxMaskModule.forRoot()
  ]
})
export class AuditModule { }
