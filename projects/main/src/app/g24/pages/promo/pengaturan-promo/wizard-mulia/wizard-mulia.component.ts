import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


// service
import { PromoService } from '../../promo.service';
import { VendorService } from '../../../../services/vendor.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';

@Component({
  selector: 'app-wizard-mulia',
  templateUrl: './wizard-mulia.component.html',
  styleUrls: ['./wizard-mulia.component.scss']
})
export class WizardMuliaComponent implements OnInit, OnChanges {
  @Output() dataMulia:any = new EventEmitter();

  @Input() kuotaProduk:boolean = false;
  @Input() getData:boolean = false;

  selectVendor:boolean = false;
  selectDenom:boolean = false;
  section2_mulia: FormGroup = null;

  valueVendorMulia:string[];
  valueDenom:string[];
  public options:Options;

  // select2 perhiasan 
  vendorMulia:Array<Select2OptionData>;
  denomMulia:Array<Select2OptionData>;
  constructor(
    public vendorService : VendorService,
    public toastrService: ToastrService,
    private productDenomService:ProductDenomService,
    private promoService:PromoService,
  ) { }

  ngOnChanges(){
    this.passingData(this.getData);
  }
  ngOnInit(): void {
    this.formMulia();
    this.settingMulia();
    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };
  }

  settingMulia(){
    let data = [];
    let data2 = [];

    this.vendorService.list("?_hash=1&product-category.code=c05&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load vendor mulia failed");
        return;
      }
      for (let val of response) {
        data.push({id:val._hash,text:val.name})
      }
      this.vendorMulia = data;
    })

    this.productDenomService.list("?_hash=1&product-category.code=c05&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load denom mulia failed");
        return;
      }
      for (let val of response) {
        data2.push({id:val._hash,text:val.name})
      }
      this.denomMulia = data2;
    })
  }

  select2Vendor(val){
    if (val == 'pv'){
      this.selectVendor = true;
    }else{
      this.selectVendor = false;
    }
  }

  select2Denom(val){
    if (val == 'pd'){
      this.selectDenom = true;
    }else{
      this.selectDenom = false;
    }
  }

  formMulia(){
    this.section2_mulia = new FormGroup({
      vendor: new FormControl ("", Validators.required),
      pickVendor: new FormControl ("", Validators.required),
      denom: new FormControl ("", Validators.required),
      pickDenom: new FormControl ("", Validators.required),
      quota: new FormControl ("", Validators.required),
      typePromotion: new FormControl ("", Validators.required),
      sizeTypePromotion: new FormControl ("", Validators.required),
    })
  }

  passingData(getData){
    if (getData != false) {
      console.debug("isi data from Mulia")
      this.promoService.muliaData(this.section2_mulia.getRawValue());
      this.dataMulia.emit(true);
    }      
  }

}
