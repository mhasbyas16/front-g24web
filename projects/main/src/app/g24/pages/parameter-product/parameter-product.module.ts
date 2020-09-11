import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ParameterProductRoutingModule } from './parameter-product-routing.module';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductClarityComponent } from './product-clarity/product-clarity.component';
import { ProductCutComponent } from './product-cut/product-cut.component';
import { ProductDenomComponent } from './product-denom/product-denom.component';
import { ProductDiamondColorComponent } from './product-diamond-color/product-diamond-color.component';
import { ProductGoldColorComponent } from './product-gold-color/product-gold-color.component';
import { ProductJenisComponent } from './product-jenis/product-jenis.component';
import { ProductPurityComponent } from './product-purity/product-purity.component';
import { ProductSeriesComponent } from './product-series/product-series.component';
import { TokoPenyediaComponent } from './toko-penyedia/input-toko-penyedia.component';
import { InputVendorComponent } from './input-vendor/input-vendor.component';
import { NgSelect2Module } from 'ng-select2';


@NgModule({
  declarations: [ProductCategoryComponent, ProductClarityComponent, ProductCutComponent, ProductDenomComponent, ProductDiamondColorComponent, ProductGoldColorComponent, ProductJenisComponent, ProductPurityComponent, ProductSeriesComponent, TokoPenyediaComponent, InputVendorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    NgSelect2Module,
    ParameterProductRoutingModule
  ]
})
export class ParameterProductModule { }
