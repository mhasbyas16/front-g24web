import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityLayoutComponent } from 'projects/platform/src/app/layouts/security-layout/security-layout.component';
import { AuthLayoutComponent } from 'projects/platform/src/app/layouts/auth-layout/auth-layout.component';
import { AppLayoutComponent } from 'projects/main/src/app/layouts/app-layout/app-layout.component';
import { NewLayoutComponent } from 'projects/main/src/app/layouts/new-layout/new-layout.component';


//g24
import { MainComponent } from 'projects/main/src/app/g24/layout/main/main.component';
const defaultPage = "auth/signin";
const dashboard = "g24";

const routes: Routes = [
  {
    path: '',
    redirectTo: dashboard,
    pathMatch: 'full',
  },
  {
    path: '',
    component: SecurityLayoutComponent,
    children: [
      {
        path: 'security',
        loadChildren: () => import('../../projects/platform/src/app/pages/security/security.module').then(m => m.SecurityModule)
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('../../projects/platform/src/app/pages/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'app',
        loadChildren: () => import('../../projects/main/src/app/pages-1/app/app.module').then(m => m.AppModule)
      }
    ]
  },  
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'fs',
        loadChildren: () => import('../../projects/main/src/app/pages-1/full/full.module').then(m => m.FullModule)
      }
    ]
  },  
  {
    path: '',
    component: NewLayoutComponent,
    children: [
      {
        path: 'new',
        loadChildren: () => import('../../projects/main/src/app/pages-1/new/new.module').then(m => m.NewModule)
      }
    ]
  },  
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'g24',
        loadChildren: () => import('../../projects/main/src/app/g24/app.module').then(m => m.AppModule),
      }
    ]
  },
  {
    path: '**',
    redirectTo: dashboard
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
