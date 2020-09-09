import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


// service
import { PromoService } from '../../promo.service';
import { VendorService } from '../../../../services/vendor.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { PromotionTypeService } from '../../../../services/promotion/promotion-type.service';

@Component({
  selector: 'app-wizard-dinar',
  templateUrl: './wizard-dinar.component.html',
  styleUrls: ['./wizard-dinar.component.scss']
})
export class WizardDinarComponent implements OnInit, OnChanges {
  @Output() dataDinar:any = new EventEmitter();

  @Input() kuotaProduk:boolean = false;
  @Input() getData:boolean = false;

  jenisPromosi:any;

  selectVendor:boolean = false;
  selectDenom:boolean = false;
  section2_dinar: FormGroup = null;

  valueVendorDinar:string[];
  valueDenom:string[];
  vendorDinar:Array<Select2OptionData>;
  denomDinar:Array<Select2OptionData>;
  public options:Options;
  constructor(
    public vendorService : VendorService,
    public toastrService: ToastrService,
    private productDenomService:ProductDenomService,
    private promoService:PromoService,
    private promotionTypeService:PromotionTypeService,

  ) { }

  ngOnChanges(){
    this.passingData(this.getData);
  }
  ngOnInit(): void {
    this.formDinar();
    this.settingDinar();

    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };
  }

  formDinar(){
    this.section2_dinar = new FormGroup({
      vendor: new FormControl ("", Validators.required),
      pickVendor: new FormControl ("", Validators.required),
      denom: new FormControl ("", Validators.required),
      pickDenom: new FormControl ("", Validators.required),
      quota: new FormControl ("", Validators.required),
      typePromotion: new FormControl ("", Validators.required),
      sizeTypePromotion: new FormControl ("", Validators.required),
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

  settingDinar(){
    let data = [];
    let data2 = [];

    this.vendorService.list("?_hash=1&product-category.code=c06&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load vendor mulia failed");
        return;
      }
      for (let val of response) {
        data.push({id:val._hash,text:val.name})
      }
      this.vendorDinar = data;
    })

    this.productDenomService.list("?_hash=1&product-category.code=c06&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load denom mulia failed");
        return;
      }
      for (let val of response) {
        data2.push({id:val._hash,text:val.name})
      }
      this.denomDinar = data2;
    })
    this.promotionTypeService.list("?_hash=1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load jenis perhiasan failed");
        return;
      }

      this.jenisPromosi = response;
    })
  }

  passingData(getData){
    if (getData != false) {
      console.debug("isi data from Mulia")
      this.promoService.dinarData(this.section2_dinar.getRawValue());
      this.dataDinar.emit(true);
    }      
  }

}
