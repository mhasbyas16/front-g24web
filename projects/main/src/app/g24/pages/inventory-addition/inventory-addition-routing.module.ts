import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InisiasiComponent } from './inisiasi/inisiasi.component';


const routes: Routes = 
[
  {
    path: 'inisiasi',
    component: InisiasiComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // exports: [RouterModule]
})
export class InventoryAdditionRoutingModule {}
