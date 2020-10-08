import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { NavModule } from './nav/nav.module';
import { ModuleLoader } from './lib/helper/module-loader';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainComponent } from './layout/main/main.component';
import { NotFoundPageComponent } from './layout/not-found-page/not-found-page.component';

// Authguard

import {AuthGuard } from 'projects/platform/src/app/guard/auth.guard';
import {AuthGuardGuard } from 'projects/platform/src/app/guard/auth-guard.guard';
import { Pages } from './decorators/content/pages';

// Uncomment AuthLayoutComponent untuk nyalain authentication

const routes: Routes =
[
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule),
    component: MainComponent,
    canActivate: [AuthGuard],
    //data :{
     // role:['Management', 'IT'],
   // }
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children:
    [
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
      }
      
    ]
  },
  
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
  constructor(private router : Router, )
  {
    // roles
    window['pagesLoader'] = Pages;

    ModuleLoader.register('x1', () => import('./pages/inventory-addition/inventory-addition.module').then(m => m.InventoryAdditionModule))
    ModuleLoader.register('x2', () => import('./pages/inventory-management/inventory-management.module').then(m => m.InventoryManagementModule))
    ModuleLoader.register('bb', () => import('./pages/bahan-baku/bahan-baku.module').then(m => m.BahanBakuModule))
    ModuleLoader.register('pj', () => import('./pages/penjualan/penjualan.module').then(m => m.PenjualanModule))
    ModuleLoader.register('lp', () => import('./pages/laporan/laporan.module').then(m => m.LaporanModule))  
    ModuleLoader.register('rl', () => import('./pages/security/security.module').then(m => m.SecurityModule))
    ModuleLoader.register('pr', () => import('./pages/parameter/parameter.module').then(m => m.ParameterModule))
    ModuleLoader.register('prp', () => import('./pages/parameter-product/parameter-product.module').then(m => m.ParameterProductModule))
    ModuleLoader.register('ip', () => import('./pages/inquery-product/inquery-product.module').then(m => m.InqueryProductModule))
    // ModuleLoader.register('kv', () => import('./pages/konversi/konversi.module').then(m => m.KonversiModule));
    ModuleLoader.register('ag', () => import('./pages/anggaran/anggaran.module').then(m => m.AnggaranModule))
  }
}
