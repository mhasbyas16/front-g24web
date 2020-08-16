
import { NgModule, SystemJsNgModuleLoader, Type } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { NavModule } from './nav/nav.module';

import {NgxBarcodeModule} from 'ngx-barcode';
import { RekeningKoranComponent } from './pages/keuangan/laporan/rekening-koran/rekening-koran/rekening-koran.component';

@NgModule({
  declarations: [RekeningKoranComponent],
  imports: [
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    NavModule,
    NgxBarcodeModule
  ],
})
export class AppModule{} 
