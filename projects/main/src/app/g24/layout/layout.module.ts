import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { NavModule } from '../nav/nav.module';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ClarityModule } from '@clr/angular';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

// Authguard

import {AuthGuard } from 'projects/platform/src/app/guard/auth.guard';


const routes : Routes =
[
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: []
  },
  {
    path: 'front',
    component: MainComponent,
    canActivate: []
  }
]

@NgModule({
  declarations:
  [
    MainComponent,
    NotFoundPageComponent,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NavModule,
    ClarityModule
  ],
  exports:
  [
    RouterModule,
    MainComponent,
    AuthLayoutComponent,
    NotFoundPageComponent
  ],
  providers: [DatePipe]
})
export class LayoutModule { }
