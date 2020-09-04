import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { PromoRoutingModule } from './promo-routing.module';
import { NavModule } from '../../nav/nav.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PengaturanPromoComponent } from './pengaturan-promo/pengaturan-promo.component';
import { NgSelect2Module } from 'ng-select2';
import { DaftarPromoComponent } from './daftar-promo/daftar-promo.component';
import { WizardPerhiasanComponent } from './pengaturan-promo/wizard-perhiasan/wizard-perhiasan.component';
import { CardPerhiasanComponent } from './daftar-promo/card-perhiasan/card-perhiasan.component';
import { EditPromoComponent } from './daftar-promo/edit-promo/edit-promo.component';

@NgModule({
  declarations: [PengaturanPromoComponent, DaftarPromoComponent, WizardPerhiasanComponent, CardPerhiasanComponent, EditPromoComponent],
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
