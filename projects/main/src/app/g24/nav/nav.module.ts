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


@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ContentComponent, FooterComponent, ModalComponent, CartComponent, CheckoutComponent, AddNasabahComponent],
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
