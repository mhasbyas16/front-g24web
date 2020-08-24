import { Component, OnInit, ViewChild } from '@angular/core';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { ClrWizard } from '@clr/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

@Component({
  selector: 'app-pengaturan-promo',
  templateUrl: './pengaturan-promo.component.html',
  styleUrls: ['./pengaturan-promo.component.scss']
})

@DContent(PengaturanPromoComponent.key)
export class PengaturanPromoComponent implements OnInit {

  @ViewChild("manual") wizardManual: ClrWizard;
  @ViewChild("penjualan") wizardPenjualan: ClrWizard;

  manualWizard: boolean = false;
  penjualanWizard: boolean = false;
  selectdistro:boolean = false;

  section1_penjualan: FormGroup = null;

  data:Array<Select2OptionData>;
  options:Options;

  
  constructor() { }

  ngOnInit(): void {
    this.form();

    this.data = [
      {
        id: 'opt1',
        text: 'Options 1'
      },
      {
        id: 'opt2',
        text: 'Options 2'
      },
      {
        id: 'opt3',
        text: 'Options 3'
      },
      {
        id: 'opt4',
        text: 'Options 4'
      }
    ];

    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };
  }

  select2Distro(val){
    if (val == "sd") {
      this.selectdistro = false;
    }else if (val == 'pd'){
      this.selectdistro = true;
    }
  }
  selectKuota(val){
    
  }

  form(){
    this.section1_penjualan = new FormGroup({
      programName : new FormControl ("", Validators.required),
      periodeFrom : new FormControl ("", Validators.required),
      periodeTo : new FormControl ("", Validators.required),
      location : new FormControl ("", Validators.required),
      product : new FormControl ("", Validators.required),
      kuotaPromo : new FormControl ("", Validators.required),  
    });
  }

  openWizard(val){
    console.debug(val, "selected")
    if (val=='manual') {
      
    }else if(val == 'penjualan'){
      this.penjualanWizard = true;
    }
  }

  viewSelect(val){
    console.debug(this.section1_penjualan.get("location").value,"isi select2")
  }


  static key = EMenuID.PENGATURAN_PROMO;

}
