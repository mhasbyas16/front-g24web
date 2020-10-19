import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { CartComponent } from './modal/cart/cart.component';
import { CheckoutComponent } from './modal/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNasabahComponent } from './modal/add-nasabah/add-nasabah.component';
import { SearchNasabahComponent } from './modal/search-nasabah/search-nasabah.component';
import { ModalOutletComponent } from './modal-outlet/modal-outlet.component';
import { CartBuybackComponent } from './modal/cart-buyback/cart-buyback.component';
import { CheckoutBuybackComponent } from './modal/checkout-buyback/checkout-buyback.component';
import { LoadingSpinnerComponent } from './modal/loading-spinner/loading-spinner.component';
import { CartBuybackManualLmComponent } from './modal/cart-buyback-manual-lm/cart-buyback-manual-lm/cart-buyback-manual-lm.component';
import { CheckoutBuybackManualComponent } from './modal/checkout-buyback-manual/checkout-buyback-manual.component';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ContentComponent, FooterComponent, CartComponent, CheckoutComponent, AddNasabahComponent, SearchNasabahComponent, ModalOutletComponent, CartBuybackComponent, CheckoutBuybackComponent,LoadingSpinnerComponent, CartBuybackManualLmComponent, CheckoutBuybackManualComponent],
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
    CartComponent,
    CartBuybackComponent,
    SearchNasabahComponent,
    AddNasabahComponent,
    LoadingSpinnerComponent,
    CartBuybackManualLmComponent
  ],
})
export class NavModule { }
