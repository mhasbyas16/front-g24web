import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ToastrModule } from 'ngx-toastr';
// routing module
import {SecurityRoutingModule } from './security-routing.module';
// component
import { RolePageComponent } from './role-page/role-page.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [ RolePageComponent, UserComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    ToastrModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
  ],
  exports:[  ]
})
export class SecurityModule { }
