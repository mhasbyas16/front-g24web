import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExamplePageComponent } from './example-page/example-page.component';
import { Example2PageComponent } from './example2-page/example2-page.component';

const routes: Routes = [ 
  {
    path: 'example',
    component: ExamplePageComponent,
  },
  {
    path: 'example2',
    component: Example2PageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
