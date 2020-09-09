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
  @Input() getEditData:any;


  jenisPromosi:any;

  selectVendor:boolean = false;
  selectDenom:boolean = false;
  selectSeries:boolean = false;

  dinarDataEdit =[];
  dinarDataEdit2:any;
  valueVendorGS:string[];
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
    this.editData(this.getEditData);
    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };
  }

  editData(data:any){
    if (data == null) {
      return;
    }
   
    // this.formPerhiasan();

    this.valueVendorGS = [];
    this.vendorGiftSouvenir = [];
    this.valueDenom = [];
    this.valueSeries=[];
    this.denomGiftSouvenir=[];
    this.series=[];
    let arr = [];
    
    for (let gs of data.product) {
      if (gs.code == "c02" || gs.code == "c04") {
        arr.push(gs);
      }       
    }
    console.debug(arr,"isi dinar arr");
    this.dinarDataEdit = arr;
   
    for (let get of this.dinarDataEdit) {
      this.dinarDataEdit2 =get;
      this.section2_giftSouvenir.patchValue({pickVendor: get.pickVendor}) 
      this.section2_giftSouvenir.patchValue({pickDenom: get.pickDenom}) 
      this.section2_giftSouvenir.patchValue({quota : get.quota})
      this.section2_giftSouvenir.patchValue({sizeTypePromotion : get.sizeTypePromotion})      

      // typePromotion
      let tp=[];
      let tpVal = [];
  
      this.promotionTypeService.list('?_hash=1').subscribe((response:any)=>{
        if (response == false) {
          this.toastrService.error("Get type promotion Error");
          return;
        }
          for (let res of response) {
            tp.push(res);

            if (res.code == get.typePromotion.code) {
              this.section2_giftSouvenir.patchValue({typePromotion:res._hash})
            }
         
          }
          this.jenisPromosi=tp;
      })

      // vendor
      let ven=[];
      let vendorVal = [];
  
      this.vendorService.list("?_hash=1&product-category.code=c02&product-category.code=c04&_sortby=name:1").subscribe((response:any)=>{
        if (response == false) {
          this.toastrService.error("Get Vendor Error");
          return;
        }

        if (get.vendor == '1') {
          for (let res of response) {
            ven.push({id:res._hash,text:res.name});       
          }
          this.section2_giftSouvenir.patchValue({vendor:'1'})
          this.select2Vendor('1');
        }else{
          for (let res of response) {
            ven.push({id:res._hash,text:res.name});
    
            for (let isi of get.vendor) {
              if (res.code == isi.code) {
                vendorVal.push(res._hash);
              }
            }          
          }
          this.valueVendorGS = vendorVal;
    
          this.section2_giftSouvenir.patchValue({vendor:'pv'})
          this.select2Vendor('pv');
        }
        this.vendorGiftSouvenir = ven ;
      })

      

      // denom
      let denom=[];
      let denomVal = [];
  
      this.productDenomService.list("?_hash=1&product-category.code=c02&product-category.code=c04&_sortby=name:1").subscribe((response:any)=>{
        if (response == false) {
          this.toastrService.error("Get Denom Error");
          return;
        }

        if (get.denom == '1') {
          for (let res of response) {
            denom.push({id:res._hash,text:res.name});         
          }
          this.section2_giftSouvenir.patchValue({denom:'1'})
          this.select2Denom('1');
        }else{
          for (let res of response) {
            denom.push({id:res._hash,text:res.name});
    
            for (let isi of get.denom) {
              if (res.code == isi.code) {
                denomVal.push(res._hash);
              }
            }          
          }
          this.valueDenom = denomVal;
          
          this.section2_giftSouvenir.patchValue({denom:'pd'})
          this.select2Denom('pd');
        }
        this.denomGiftSouvenir = denom ;
      })

      // series
      let series=[];
      let seriesVal = [];
  
      this.productSeriesService.list("?_hash=1&_sortby=name:1").subscribe((response:any)=>{
        if (response == false) {
          this.toastrService.error("Get Series Error");
          return;
        }

        if (get.series == '1') {
          for (let res of response) {
            series.push({id:res._hash,text:res.name});         
          }
          this.section2_giftSouvenir.patchValue({series:'1'})
          this.select2Series('1');
        }else{
          for (let res of response) {
            series.push({id:res._hash,text:res.name});
    
            for (let isi of get.series) {
              if (res.code == isi.code) {
                seriesVal.push(res._hash);
              }
            }          
          }
          this.valueSeries = seriesVal;
          
          this.section2_giftSouvenir.patchValue({series:'ps'})
          this.select2Series('ps');
        }
        this.series = series ;
      })
    }
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
