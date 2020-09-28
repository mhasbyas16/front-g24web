import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import { ModulePageComponent } from './module-page/module-page.component';
import { RolePageComponent } from './role-page/role-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { RouterModule } from '@angular/router';
import { SecurityRoutingModule } from './security-routing.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [UserPageComponent, ModulePageComponent, RolePageComponent, MenuPageComponent],
  imports: [
    // routing: important
    SecurityRoutingModule,
    
    // UI/UX
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    ToastrModule,
  ],  
  exports: [
    RouterModule
  ]
})
export class SecurityModule { }
