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
  constructor(private router : Router, )
  {
    // roles
    

    ModuleLoader.register('x1', () => import('./pages/inventory-addition/inventory-addition.module').then(m => m.InventoryAdditionModule))
    ModuleLoader.register('pj', () => import('./pages/penjualan/penjualan.module').then(m => m.PenjualanModule))
    ModuleLoader.register('lp', () => import('./pages/laporan/laporan.module').then(m => m.LaporanModule))  
    ModuleLoader.register('rl', () => import('./pages/security/security.module').then(m => m.SecurityModule))
    ModuleLoader.register('pr', () => import('./pages/parameter/parameter.module').then(m => m.ParameterModule))
  }
}
