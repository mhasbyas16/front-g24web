import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InisiasiComponent } from './inisiasi/inisiasi.component';
import { PemesananComponent } from './pemesanan/pemesanan.component';


const routes: Routes = 
[
  {
    path: 'inisiasi',
    component: InisiasiComponent
  },
  {
    path: 'pemesanan',
    component: PemesananComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // exports: [RouterModule]
})
export class InventoryAdditionRoutingModule {}
