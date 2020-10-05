
import { NgModule, SystemJsNgModuleLoader, Type } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { NavModule } from './nav/nav.module';

import {NgxBarcodeModule} from 'ngx-barcode';
import { CommonModule, DatePipe } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    NavModule,
    NgxBarcodeModule,
    CommonModule,
  ],
})
export class AppModule{} 
