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
  selector: 'app-wizard-mulia',
  templateUrl: './wizard-mulia.component.html',
  styleUrls: ['./wizard-mulia.component.scss']
})
export class WizardMuliaComponent implements OnInit, OnChanges {
  @Output() dataMulia:any = new EventEmitter();

  @Input() kuotaProduk:boolean = false;
  @Input() getData:boolean = false;
  @Input() getEditData:any;

  jenisPromosi:any;

  dinarDataEdit = [];
  dinarDataEdit2:any;
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
    private promotionTypeService:PromotionTypeService,

  ) { }

  ngOnChanges(){
    this.passingData(this.getData);
  }
  ngOnInit(): void {
    this.formMulia();
    this.settingMulia();
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

    this.valueVendorMulia = [];
    this.vendorMulia = [];
    this.valueDenom = [];
    let arr = [];
    
    for (let mulia of data.product) {
      if (mulia.code == "c05") {
        arr.push(mulia);
      }       
    }
    console.debug(arr,"isi dinar arr");
    this.dinarDataEdit = arr;
   
    for (let get of this.dinarDataEdit) {
      this.dinarDataEdit2 =get;
      this.section2_mulia.patchValue({pickVendor: get.pickVendor}) 
      this.section2_mulia.patchValue({pickDenom: get.pickDenom}) 
      this.section2_mulia.patchValue({quota : get.quota})
      this.section2_mulia.patchValue({sizeTypePromotion : get.sizeTypePromotion})      

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
              this.section2_mulia.patchValue({typePromotion:res._hash})
            }
         
          }
          this.jenisPromosi=tp;
      })

      // vendor
      let ven=[];
      let vendorVal = [];
  
      this.vendorService.list("?_hash=1&product-category.code=c05&_sortby=name:1").subscribe((response:any)=>{
        if (response == false) {
          this.toastrService.error("Get Vendor Error");
          return;
        }

        if (get.vendor == '1') {
          for (let res of response) {
            ven.push({id:res._hash,text:res.name});       
          }
          this.section2_mulia.patchValue({vendor:'1'})
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
          this.valueVendorMulia = vendorVal;
    
          this.section2_mulia.patchValue({vendor:'pv'})
          this.select2Vendor('pv');
        }
        this.vendorMulia = ven ;
      })

      

      // purity
      let denom=[];
      let denomVal = [];
  
      this.productDenomService.list("?_hash=1&product-category.code=c05&_sortby=name:1").subscribe((response:any)=>{
        if (response == false) {
          this.toastrService.error("Get Denom Error");
          return;
        }

        if (get.denom == '1') {
          for (let res of response) {
            denom.push({id:res._hash,text:res.name});         
          }
          this.section2_mulia.patchValue({denom:'1'})
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
          
          this.section2_mulia.patchValue({denom:'pd'})
          this.select2Denom('pd');
        }
        this.denomMulia = denom ;
      })
    }
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
    this.promotionTypeService.list("?_hash=1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load jenis perhiasan failed");
        return;
      }

      this.jenisPromosi = response;
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
