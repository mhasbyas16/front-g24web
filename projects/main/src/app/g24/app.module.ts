
import { NgModule, SystemJsNgModuleLoader, Type } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { NavModule } from './nav/nav.module';


@NgModule({
  declarations: [],
  imports: [
    AppRoutingModule,
    ClarityModule,
    HttpClientModule,
    NavModule,
  ],
})
export class AppModule{} 
