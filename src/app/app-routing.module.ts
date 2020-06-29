import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityLayoutComponent } from 'projects/platform/src/app/layouts/security-layout/security-layout.component';
import { AuthLayoutComponent } from 'projects/platform/src/app/layouts/auth-layout/auth-layout.component';
import { AppLayoutComponent } from 'projects/main/src/app/layouts/app-layout/app-layout.component';
import { NewLayoutComponent } from 'projects/main/src/app/layouts/new-layout/new-layout.component';

const defaultPage = "auth/signin";

const routes: Routes = [
  {
    path: '',
    redirectTo: defaultPage,
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
        loadChildren: () => import('../../projects/main/src/app/pages/app/app.module').then(m => m.AppModule)
      }
    ]
  },  
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'fs',
        loadChildren: () => import('../../projects/main/src/app/pages/full/full.module').then(m => m.FullModule)
      }
    ]
  },  
  {
    path: '',
    component: NewLayoutComponent,
    children: [
      {
        path: 'new',
        loadChildren: () => import('../../projects/main/src/app/pages/new/new.module').then(m => m.NewModule)
      }
    ]
  },  
  {
    path: '**',
    redirectTo: defaultPage
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
