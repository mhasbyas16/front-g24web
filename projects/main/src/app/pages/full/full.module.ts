import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullRoutingModule } from './full-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { GaleryPageComponent } from './galery-page/galery-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GaleryPageComponent],
  imports: [
    // routing
    FullRoutingModule,

    // UI/UX
    CommonModule,
    ReactiveFormsModule,
    ClarityModule,
  ],
  exports: [
    RouterModule
  ]
})
export class FullModule { }
