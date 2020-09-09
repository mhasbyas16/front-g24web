import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// service
import { PromoService } from '../../promo.service';
import { VendorService } from '../../../../services/vendor.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { ProductSeriesService } from '../../../../services/product/product-series.service';
import { PromotionTypeService } from '../../../../services/promotion/promotion-type.service';


@Component({
  selector: 'app-wizard-gift-souvenir',
  templateUrl: './wizard-gift-souvenir.component.html',
  styleUrls: ['./wizard-gift-souvenir.component.scss']
})
export class WizardGiftSouvenirComponent implements OnInit, OnChanges {
  section2_giftSouvenir: FormGroup = null;
  @Output() dataGiftSouvenir:any = new EventEmitter();

  @Input() kuotaProduk:boolean = false;
  @Input() getData:boolean = false;
  @Input() tipe:any;

  jenisPromosi:any;

  selectVendor:boolean = false;
  selectDenom:boolean = false;
  selectSeries:boolean = false;

  valueVendorDinar:string[];
  valueDenom:string[];
  valueSeries:string[];
  vendorGiftSouvenir:Array<Select2OptionData>;
  denomGiftSouvenir:Array<Select2OptionData>;
  series:Array<Select2OptionData>;
  public options:Options;

  constructor(
    public vendorService : VendorService,
    public toastrService: ToastrService,
    private productDenomService:ProductDenomService,
    private promoService:PromoService,
    private productSeriesService:ProductSeriesService,
    private promotionTypeService:PromotionTypeService,

  ) { }

  ngOnChanges(){
    this.passingData(this.getData);
  }
  ngOnInit(): void {
    this.formGiftSouvenir();
    this.settingGiftSouvenir();
    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };
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
  select2Series(val){
    if (val == 'ps'){
      this.selectSeries = true;
    }else{
      this.selectSeries = false;
    }
  }

  formGiftSouvenir(){
    this.section2_giftSouvenir = new FormGroup({
      series:new FormControl ("", Validators.required),
      pickSeries: new FormControl ("", Validators.required),
      vendor: new FormControl ("", Validators.required),
      pickVendor: new FormControl ("", Validators.required),
      denom: new FormControl ("", Validators.required),
      pickDenom: new FormControl ("", Validators.required),
      quota: new FormControl ("", Validators.required),
      typePromotion: new FormControl ("", Validators.required),
      sizeTypePromotion: new FormControl ("", Validators.required),
    })
  }

  settingGiftSouvenir(){
    let data = [];
    let data2 = [];
    let data3 = [];

    this.vendorService.list("?_hash=1&product-category.code=c02&product-category.code=c04&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load vendor gift and souvenir failed");
        return;
      }
      for (let val of response) {
        data.push({id:val._hash,text:val.name})
      }
      this.vendorGiftSouvenir = data;
    })

    this.productDenomService.list("?_hash=1&product-category.code=c02&product-category.code=c04&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load denom gift and souvenir failed");
        return;
      }
      for (let val of response) {
        data2.push({id:val._hash,text:val.name})
      }
      this.denomGiftSouvenir = data2;
    })

    this.productSeriesService.list("?_hash=1&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load series gift and souvenir failed");
        return;
      }
      for (let val of response) {
        data3.push({id:val._hash,text:val.name})
      }
      this.series = data3;
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
      this.promoService.giftSouvenirData(this.section2_giftSouvenir.getRawValue(),this.tipe);
      this.dataGiftSouvenir.emit(true);
    }      
  }

}
