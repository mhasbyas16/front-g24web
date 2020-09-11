import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

//UI
import { ClarityModule } from "@clr/angular";
import { ToastrModule } from 'ngx-toastr';

//Projects
import { MainModule } from 'projects/main/src/app/main.module';
import { PlatformModule } from 'projects/platform/src/app/platform.module';
import { FormsModule } from '@angular/forms';

//barcode
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxMaskModule } from 'ngx-mask';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    //httpcall
    HttpClientModule,

    //clarity UI/UX
    ClarityModule,
    FormsModule,
    ToastrModule.forRoot(),

    //projects
    PlatformModule,
    MainModule,

    //barcode
    NgxBarcodeModule,
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
