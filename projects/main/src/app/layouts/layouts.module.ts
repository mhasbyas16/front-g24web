import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { RouterModule } from '@angular/router';
import { NavModule } from 'projects/platform/src/app/pages/nav/nav.module';
import { ClarityModule } from '@clr/angular';
import { AppLayoutHeaderComponent } from './app-layout/app-layout-header/app-layout-header.component';
import { AppLayoutSidebarComponent } from './app-layout/app-layout-sidebar/app-layout-sidebar.component';
import { AppLayoutSubHeaderComponent } from './app-layout/app-layout-sub-header/app-layout-sub-header.component';
import { AppLayoutAlertHeaderComponent } from './app-layout/app-layout-alert-header/app-layout-alert-header.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { AppLayoutFooterComponent } from './app-layout/app-layout-footer/app-layout-footer.component';
import { NewLayoutComponent } from './new-layout/new-layout.component';



@NgModule({
  declarations: [
    AppLayoutComponent, 
    AppLayoutHeaderComponent, 
    AppLayoutSidebarComponent, 
    AppLayoutSubHeaderComponent, 
    AppLayoutAlertHeaderComponent, FullLayoutComponent, AppLayoutFooterComponent, NewLayoutComponent
  ],
  imports: [
    RouterModule,
    
    CommonModule,
    ClarityModule,

    NavModule
  ]
})
export class LayoutsModule { }
