import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import { Routes, RouterModule } from '@angular/router';
import { RolePageComponent } from './role-page/role-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { ModulePageComponent } from './module-page/module-page.component';
import { AuthGuard } from '../../guard/auth.guard';

const routes: Routes = [ 
  {
    path: 'user',
    component: UserPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'role',
    component: RolePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    component: MenuPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'module',
    component: ModulePageComponent,
    canActivate: [AuthGuard]
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
