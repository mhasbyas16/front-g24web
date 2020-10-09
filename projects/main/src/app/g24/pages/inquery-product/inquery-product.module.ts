import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule} from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { InqueryProductRoutingModule } from './inquery-product-routing.module';
import { InqueryProductComponent } from './inquery-product.component';
import { DetailInqueryProductPerhiasanComponent } from './detail-inquery-product-perhiasan/detail-inquery-product-perhiasan.component';
import { DetailInqueryProductSouvenirComponent } from './detail-inquery-product-souvenir/detail-inquery-product-souvenir.component';
import { DetailInqueryProductPermataComponent } from './detail-inquery-product-permata/detail-inquery-product-permata.component';
import { DetailInqueryProductGiftComponent } from './detail-inquery-product-gift/detail-inquery-product-gift.component';
import { DetailInqueryProductEmasComponent } from './detail-inquery-product-emas/detail-inquery-product-emas.component';
import { DetailInqueryProductDinarComponent } from './detail-inquery-product-dinar/detail-inquery-product-dinar.component';


@NgModule({
  declarations: [InqueryProductComponent, DetailInqueryProductPerhiasanComponent, DetailInqueryProductSouvenirComponent, DetailInqueryProductPermataComponent, DetailInqueryProductGiftComponent, DetailInqueryProductEmasComponent, DetailInqueryProductDinarComponent],
  imports: [
    CommonModule,
    InqueryProductRoutingModule,
    ClarityModule,
    FormsModule
  ]
})
export class InqueryProductModule { }
