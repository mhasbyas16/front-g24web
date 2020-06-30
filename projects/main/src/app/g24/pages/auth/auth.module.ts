import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SignOutPageComponent } from './sign-out-page/sign-out-page.component';
import { ClarityModule } from '@clr/angular';

@NgModule({
  declarations: [
    SignInPageComponent,
    SignOutPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class AuthModule { }
