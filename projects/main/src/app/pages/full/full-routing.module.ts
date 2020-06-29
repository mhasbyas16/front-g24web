import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { GaleryPageComponent } from './galery-page/galery-page.component';


const routes: Routes = [ 
  {
    path: 'galery',
    component: GaleryPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullRoutingModule { }
