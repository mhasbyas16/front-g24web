import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EMenuID } from '../../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../../decorators/content/pages';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UnitService } from '../../../../services/system/unit.service';
import { ProductPurityService } from '../../../../services/product/product-purity.service';
import { LM, GS, PERHIASAN } from '../../../../sample/cart-buyback-manual-lm';

@Component({
  selector: 'app-perhiasan-manual',
  templateUrl: './perhiasan-manual.component.html',
  styleUrls: ['./perhiasan-manual.component.scss']
})
@DContent(PerhiasanManualComponent.key)
export class PerhiasanManualComponent implements OnInit {

 
  constructor(
    private unitService: UnitService,
    private productPurityService : ProductPurityService
  ) { }

  ngOnInit(): void {
    this.loadFormData();
    this.onListUnit();
    this.onListKadar()
  }


  dataPerhiasan : any
  units : any
  searchModel : any = {units:"pilih", kadars:"pilih"};
  kadars: any

  loadFormData(){
    this.dataPerhiasan = new FormGroup({
      unitTransaksi: new FormControl ("", [Validators.required]),
     
    })

   
  }

  addCart(val){
    // this.dataPerhiasan.patchValue({ unitTransaksi: input_unit_transaksi });
    let data = this.dataPerhiasan.getRawValue();
    console.debug(val, "data")
  }

  onListUnit(){
    this.unitService.list("").subscribe((response: any) => {
      
      if (response != false) {
        this.units = response;
        this.units.sort(function (c, d) {
          if (c.value < d.value) { return -1; }
          if (c.value > d.value) { return 1; }
          return 0;
        })
      }      
    });
  }

  onListKadar(){
    this.productPurityService.list("").subscribe((response: any) => {
      
      if (response != false) {
        this.kadars = response;
        this.kadars.sort(function (c, d) {
          if (c.value < d.value) { return -1; }
          if (c.value > d.value) { return 1; }
          return 0;
        })
      }      
    });
  }
  static key = EMenuID.BUYBACKMANUALPERHIASAN
}
