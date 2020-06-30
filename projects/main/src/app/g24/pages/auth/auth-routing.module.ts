import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//pages
import { SignOutPageComponent } from './sign-out-page/sign-out-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInPageComponent
  },
  {
    path: 'sign-out',
    component: SignOutPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
