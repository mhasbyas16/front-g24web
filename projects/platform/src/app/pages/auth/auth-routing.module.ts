import { NgModule } from '@angular/core';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { SignoutPageComponent } from'./signout-page/signout-page.component';
import { ForgotpassPageComponent } from './forgotpass-page/forgotpass-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [ 
  {
    path: 'signin',
    component: SigninPageComponent,
  },
  {
    path: 'signout',
    component: SigninPageComponent,
  },
  {
    path: 'forgotpass',
    component: ForgotpassPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
