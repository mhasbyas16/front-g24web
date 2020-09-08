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
import { WizardBerlianComponent } from './pengaturan-promo/wizard-berlian/wizard-berlian.component';
import { WizardMuliaComponent } from './pengaturan-promo/wizard-mulia/wizard-mulia.component';
import { WizardGiftSouvenirComponent } from './pengaturan-promo/wizard-gift-souvenir/wizard-gift-souvenir.component';
import { WizardDinarComponent } from './pengaturan-promo/wizard-dinar/wizard-dinar.component';

@NgModule({
  declarations: [PengaturanPromoComponent, DaftarPromoComponent, WizardPerhiasanComponent, CardPerhiasanComponent, EditPromoComponent, WizardBerlianComponent, WizardMuliaComponent, WizardGiftSouvenirComponent, WizardDinarComponent],
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
