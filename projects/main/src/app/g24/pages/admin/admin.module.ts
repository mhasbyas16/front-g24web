import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// layout
import { ManajemenDistroComponent } from './manajemen-distro/manajemen-distro.component';
import { ManajemenCabangComponent } from './manajemen-cabang/manajemen-cabang.component';
import { ManajemenPadananDistroComponent } from './manajemen-padanan-distro/manajemen-padanan-distro.component';

//add ons
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavModule } from '../../nav/nav.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [ManajemenDistroComponent, ManajemenCabangComponent, ManajemenPadananDistroComponent],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    NavModule,
    ReactiveFormsModule,
  ],
  providers:[
    DatePipe
  ]
})
export class AdminModule { }
