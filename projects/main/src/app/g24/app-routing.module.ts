import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { NavModule } from './nav/nav.module';
import { ModuleLoader } from './lib/helper/module-loader';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainComponent } from './layout/main/main.component';
import { NotFoundPageComponent } from './layout/not-found-page/not-found-page.component';

// Authguard

import {AuthGuard } from 'projects/platform/src/app/guard/auth.guard';

// Uncomment AuthLayoutComponent untuk nyalain authentication

const routes: Routes =
[
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: '',
  //   component: AuthLayoutComponent,
  //   children:
  //   [
  //     {
  //       path: 'auth',
  //       loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  //     }
      
  //   ]
  // },
  
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NavModule
  ],
  exports: [RouterModule],
  entryComponents: [NotFoundPageComponent, MainComponent, AuthLayoutComponent]
})
export class AppRoutingModule
{
  constructor(private router : Router)
  {
    ModuleLoader.register('x1', () => import('./pages/inventory-addition/inventory-addition.module').then(m => m.InventoryAdditionModule))
    ModuleLoader.register('pj', () => import('./pages/penjualan/penjualan.module').then(m => m.PenjualanModule))
  }
}
