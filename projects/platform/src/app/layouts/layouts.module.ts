import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SecurityLayoutComponent } from './security-layout/security-layout.component';
import { RouterModule } from '@angular/router';
import { NavModule } from '../pages/nav/nav.module';
import { ClarityModule } from '@clr/angular';



@NgModule({
  declarations: [
    AuthLayoutComponent, 
    SecurityLayoutComponent
  ],
  imports: [
    RouterModule,
    
    CommonModule,
    ClarityModule,

    NavModule
  ]
})
export class LayoutsModule { }
