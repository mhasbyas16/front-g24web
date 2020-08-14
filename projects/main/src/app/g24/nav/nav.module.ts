import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ModalComponent } from './modal/modal.component';
import { CartComponent } from './modal/cart/cart.component';
import { CheckoutComponent } from './modal/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNasabahComponent } from './modal/add-nasabah/add-nasabah.component';
import { SearchNasabahComponent } from './modal/search-nasabah/search-nasabah.component';
<<<<<<< HEAD
import { PilihPembayaranComponent } from './modal/pilih-pembayaran/pilih-pembayaran.component';


@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ContentComponent, FooterComponent, ModalComponent, CartComponent, CheckoutComponent, AddNasabahComponent, SearchNasabahComponent, PilihPembayaranComponent],
=======
import { ModalOutletComponent } from './modal-outlet/modal-outlet.component';


@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ContentComponent, FooterComponent, ModalComponent, CartComponent, CheckoutComponent, AddNasabahComponent, SearchNasabahComponent, ModalOutletComponent],
>>>>>>> 2a44819d211ca624e820f5cfc6d20c0149addc72
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
    CartComponent
  ],
})
export class NavModule { }
