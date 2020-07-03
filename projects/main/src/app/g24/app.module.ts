
import { NgModule, SystemJsNgModuleLoader, Type } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ClarityModule } from '@clr/angular';
import { HttpClientModule } from '@angular/common/http';
import { RolePageComponent } from './pages/security/role-page/role-page/role-page.component';

@NgModule({
  declarations: [
 
    
  RolePageComponent],
  imports: [
    AppRoutingModule,
    ClarityModule,
    HttpClientModule
  ],
})
export class AppModule
{} 
