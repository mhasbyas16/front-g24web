
import { NgModule, SystemJsNgModuleLoader, Type } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { NavModule } from './nav/nav.module';

<<<<<<< HEAD
=======
import {NgxBarcodeModule} from 'ngx-barcode';
import { RekeningKoranComponent } from './pages/keuangan/laporan/rekening-koran/rekening-koran/rekening-koran.component';
>>>>>>> 675659b5c4eea4421d5bc1b939cdfa473bcb40fd

@NgModule({
  declarations: [RekeningKoranComponent],
  imports: [
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    NavModule
  ],
})
export class AppModule{} 
