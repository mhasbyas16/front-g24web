import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ModalComponent } from './modal/modal.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [HeaderComponent, SidebarComponent, ContentComponent, FooterComponent, ModalComponent, CartComponent, CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule
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
