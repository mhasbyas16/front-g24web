import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { ClarityModule } from '@clr/angular';



@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent,
    SidebarMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    ClarityModule,
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent, 
    SidebarMenuComponent
  ]
})
export class NavModule { }
