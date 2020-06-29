import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { SignoutPageComponent } from './signout-page/signout-page.component';
import { ForgotpassPageComponent } from './forgotpass-page/forgotpass-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { AuthRoutingModule } from './auth-routing.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';




@NgModule({
  declarations: [SigninPageComponent, SignoutPageComponent, ForgotpassPageComponent, RegisterPageComponent, ProfilePageComponent],
  imports: [
    // important
    AuthRoutingModule,

    CommonModule,

    FormsModule,
    ClarityModule,



  ],  
  exports: [
    RouterModule,

  ]
})
export class AuthModule { }
