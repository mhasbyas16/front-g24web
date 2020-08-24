import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { PromoRoutingModule } from './promo-routing.module';
import { NavModule } from '../../nav/nav.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InisiasiPromoComponent } from './inisiasi-promo/inisiasi-promo.component';
import { PengaturanPromoComponent } from './pengaturan-promo/pengaturan-promo.component';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [InisiasiPromoComponent, PengaturanPromoComponent],
  imports: [
    CommonModule,
    PromoRoutingModule,
    ClarityModule,
    NavModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
  ]
})
export class PromoModule { }
