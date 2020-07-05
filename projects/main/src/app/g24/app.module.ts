
import { NgModule, SystemJsNgModuleLoader, Type } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    AppRoutingModule,
    ClarityModule,
    HttpClientModule
  ],
})
export class AppModule{} 
