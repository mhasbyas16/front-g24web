import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClrWizard } from '@clr/angular';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

// services
import { PromoService } from '../../promo.service';
import { VendorService } from '../../../../services/vendor.service';
import { ProductPurityService } from '../../../../services/product/product-purity.service';
import { ProductJenisService } from '../../../../services/product/product-jenis.service';
import { ToastrService } from 'ngx-toastr';
import { PromotionTypeService } from '../../../../services/promotion/promotion-type.service';


@Component({
  selector: 'app-wizard-berlian',
  templateUrl: './wizard-berlian.component.html',
  styleUrls: ['./wizard-berlian.component.scss']
})
export class WizardBerlianComponent implements OnInit, OnChanges {

  @Output() dataBerlian:any = new EventEmitter();

  @Input() kuotaProduk:boolean = false;
  @Input() getData:boolean = false;
  @Input() getEditData:any;
  @Input() promoMargin:boolean = false;

  section2_berlian:FormGroup=null;
  jenisPromosi:any;

  berlianDataEdit=[];
  berlianDataEdit2:any;
  selectVendor:boolean = false;
  selectPurity:boolean = false;
  selectTypeBerlian:boolean = false;

  valueVendor:string[];
  valuePurity:string[];
  valueJenisBerlian:string[];


  public options:Options;
  public options2:Options;

  // select2 perhiasan 
  vendorBerlian:Array<Select2OptionData>;
  purityBerlian:Array<Select2OptionData>;
  jenisBerlian:Array<Select2OptionData>;
  umurBerlian:boolean = false;

  constructor(
    public vendorService : VendorService,
    public productPurityService : ProductPurityService,
    public productJenisService : ProductJenisService,
    public toastrService: ToastrService,
    private promoService:PromoService,
    private promotionTypeService:PromotionTypeService,
  ) { }

  ngOnChanges(){
    this.passingData(this.getData);
  }
  ngOnInit(): void {
    this.formBerlian();
    this.settingBerlian();
    this.editData(this.getEditData);
    this.options2 ={
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '300'
    };
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

    this.valueVendor = [];
    this.vendorBerlian = [];
    this.valuePurity = [];
    this.purityBerlian = [];
    this.valueJenisBerlian=[];
    this.jenisBerlian = [];
    let arr = [];
    
    for (let berlian of data.product) {
      if (berlian.code == "c01") {
        arr.push(berlian);
      }       
    }
    console.debug(arr,"isi perhiasan arr");
    this.berlianDataEdit = arr;
   
    for (let get of this.berlianDataEdit) {
      this.berlianDataEdit2 =get;
      this.section2_berlian.patchValue({prmPromotion : get.prmPromotion})   
      this.section2_berlian.patchValue({minPrmPromotion : get.minPrmPromotion})
      this.section2_berlian.patchValue({maxPrmPromotion : get.maxPrmPromotion})
      this.section2_berlian.patchValue({sizeTypePromotion : get.sizeTypePromotion})
      this.section2_berlian.patchValue({pickVendor: get.pickVendor})    
      this.section2_berlian.patchValue({pickPurity: get.pickPurity})
      this.section2_berlian.patchValue({pickTypeBerlian : get.pickTypeBerlian})
      this.section2_berlian.patchValue({age : get.age})
      this.section2_berlian.patchValue({minAge : get.minAge})
      this.section2_berlian.patchValue({maxAge : get.maxAge})
      this.section2_berlian.patchValue({quota : get.quota})

      // age
      this.pickUmur(get.age);

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
              this.section2_berlian.patchValue({typePromotion:res._hash})
            }
         
          }
          this.jenisPromosi=tp;
      })

      // vendor
      let ven=[];
      let vendorVal = [];
  
      this.vendorService.list("?_hash=1&product-category.code=c01&_sortby=name:1").subscribe((response:any)=>{
        if (response == false) {
          this.toastrService.error("Get Vendor Error");
          return;
        }

        if (get.vendor == '1') {
          for (let res of response) {
            ven.push({id:res._hash,text:res.name});       
          }
          this.section2_berlian.patchValue({vendor:'1'})
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
          this.valueVendor = vendorVal;
    
          this.section2_berlian.patchValue({vendor:'pv'})
          this.select2Vendor('pv');
        }
        this.vendorBerlian = ven ;
      })

      

      // purity
      let pur=[];
      let purityVal = [];
  
      this.productPurityService.list("?_hash=1&_sortby=name:1").subscribe((response:any)=>{
        if (response == false) {
          this.toastrService.error("Get Purity Error");
          return;
        }

        if (get.purity == '1') {
          for (let res of response) {
            pur.push({id:res._hash,text:res.name});         
          }
          this.section2_berlian.patchValue({purity:'1'})
          this.select2Purity('1');
        }else{
          for (let res of response) {
            pur.push({id:res._hash,text:res.name});
    
            for (let isi of get.purity) {
              if (res.code == isi.code) {
                purityVal.push(res._hash);
              }
            }          
          }
          this.valuePurity = purityVal;
          
          this.section2_berlian.patchValue({purity:'pk'})
          this.select2Purity('pk');
        }
        this.purityBerlian = pur ;
        console.debug(this.purityBerlian,"pur")
      })

      // jenis Perhiasan
      let per=[];
      let typeVal = [];
  
      this.productJenisService.list("?_hash=1&product-category.code=c01&_sortby=name:1").subscribe((response:any)=>{
        if (response == false) {
          this.toastrService.error("Get Type Perhiasan Error");
          return;
        }

        if (get.typeBerlian == '1') {
          for (let res of response) {
            per.push({id:res._hash,text:res.name});          
          }
          this.section2_berlian.patchValue({typeBerlian:'1'})
          this.select2typeBerlian('1');
        }else{
          for (let res of response) {
            per.push({id:res._hash,text:res.name});
    
            for (let isi of get.typeBerlian) {
              if (res.code == isi.code) {
                typeVal.push(res._hash);
              }
            }          
          }
          this.valueJenisBerlian = typeVal;
    
          this.section2_berlian.patchValue({typeBerlian:'pj'})
          this.select2typeBerlian('pj');
        }
        this.jenisBerlian = per ;
        // console.debug(this.jenisBerlian,this.valueJenisBerlian,"per")
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

  select2Purity(val){
    if (val == 'pk'){
      this.selectPurity = true;
    }else{
      this.selectPurity = false;
    }
  }

  select2typeBerlian(val){
    if (val == 'pj'){
      this.selectTypeBerlian = true;
    }else{
      this.selectTypeBerlian = false;
    }
  }

  pickUmur(val){
    if (val == "du") {
      this.umurBerlian = true;
    }else{
      this.umurBerlian = false;
    }
  }

  settingBerlian(){
    let data = [];
    let data2 = [];
    let data3 = [];
    this.vendorService.list("?_hash=1&product-category.code=c01&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load vendor perhiasan failed");
        return;
      }
      for (let val of response) {
        data.push({id:val._hash,text:val.name})
      }
      this.vendorBerlian = data;
    })

    this.productPurityService.list("?_hash=1&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load purity perhiasan failed");
        return;
      }
      for (let val of response) {
        data2.push({id:val._hash,text:val.name})
      }
      this.purityBerlian = data2;
    })

    this.productJenisService.list("?_hash=1&product-category.code=c01&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load jenis perhiasan failed");
        return;
      }
      for (let val of response) {
        data3.push({id:val._hash,text:val.name})
      }
      this.jenisBerlian = data3;
    })
    
    this.promotionTypeService.list("?_hash=1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load jenis perhiasan failed");
        return;
      }

      this.jenisPromosi = response;
    })
  }

  formBerlian(){
    this.section2_berlian = new FormGroup({
      prmPromotion : new FormControl ("", Validators.required),
      minPrmPromotion : new FormControl ("", Validators.required),
      maxPrmPromotion : new FormControl ("", Validators.required),
      typePromotion : new FormControl ("", Validators.required),
      sizeTypePromotion : new FormControl ("", Validators.required),
      vendor: new FormControl ("", Validators.required),
      pickVendor: new FormControl (""),
      purity: new FormControl ("", Validators.required),
      pickPurity: new FormControl (""),
      typeBerlian : new FormControl ("", Validators.required),
      pickTypeBerlian : new FormControl (""),
      age : new FormControl ("", Validators.required),
      minAge : new FormControl (""),
      maxAge : new FormControl (""),
      quota : new FormControl (""),
    })
  }

  passingData(getData){
    if (getData != false) {
      console.debug("isi data from perhiasan")
      this.promoService.berlianData(this.section2_berlian.getRawValue());
      this.dataBerlian.emit(true);
    }      
  }
}
