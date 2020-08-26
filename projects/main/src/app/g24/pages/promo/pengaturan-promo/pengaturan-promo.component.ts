import { Component, OnInit, ViewChild } from '@angular/core';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { ClrWizard } from '@clr/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ToastrService } from 'ngx-toastr';
import { ContentPage } from '../../../lib/helper/content-page';

// services
import { UnitService } from '../../../services/system/unit.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { VendorService } from '../../../services/vendor.service';
import { ProductPurityService } from '../../../services/product/product-purity.service';
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { PromotionSettingService } from '../../../services/promotion/promotion-setting.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';

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
  inputKuota:boolean = false;
  perhiasan:boolean = false;
  berlian:boolean = false;
  mulia:boolean = false;
  kuotaProduk:boolean = false;

  section1_penjualan: FormGroup = null;
  section2_perhiasan: FormGroup = null;

  public options:Options;
  public options2:Options;
  nikUser:any;

  // select2
  productCategory:Array<Select2OptionData>;
  // _hashProductCategory = [];
  // _hashPC:any;
  unit:Array<Select2OptionData>;
  _hashUnit:any;
  // select2 perhiasan 
  vendorPerhiasan:Array<Select2OptionData>;
  purityPerhiasan:Array<Select2OptionData>;
  jenisPerhiasan:Array<Select2OptionData>;
  umurPerhiasan:boolean = false;

  
  constructor(
    private unitService: UnitService,
    private productCategoryService : ProductCategoryService,
    private vendorService : VendorService,
    private productPurityService : ProductPurityService,
    private productJenisService : ProductJenisService,
    private promotionSetiingService : PromotionSettingService,
    private sessionService: SessionService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    // Maker
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser))} ;
    this.form();
    this.getUnit();
    // product category
    let pd = [];
    this.productCategoryService.list('?_hash=1').subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Get Product Category Error");
        return;
      }
      for (let data of response) {
        pd.push({id:data._hash,text:data.name});
        // this._hashProductCategory.push(JSON.parse(atob(data._hash)));
      }
      // this._hashPC = btoa(JSON.stringify(this._hashProductCategory)) 
      this.productCategory = pd ;
      console.debug(this.productCategory)
    })

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

  getUnit(){
    let data = [];
    let unitarry = [];
    this.unitService.list('?_hash=1').subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Get Unit Error");
        return;
      }
      for (let isi of response) {
        unitarry.push({id:isi._hash,text:isi.nama});
        data.push(JSON.parse(atob(isi._hash)));
      }
      this.unit = unitarry;
      this._hashUnit= btoa(JSON.stringify(data));
    });
  }

  select2Distro(val){
    if (val == 'pd'){
      this.selectdistro = true;
    }else{
      this.selectdistro = false;
      console.debug(val,"isi select")
    }
  }
  pickUmur(val){
    if (val == "du") {
      this.umurPerhiasan = true;
    }else{
      this.umurPerhiasan = false;
    }
  }
  selectKuota(val){
    let productCat:any;
    for (let section of this.section1_penjualan.get("product-category").value) {
      productCat = "";
      productCat = JSON.parse(atob(section));
      
      switch (productCat.code) {
        case "c00":
          this.formPerhiasan();
          this.perhiasan = true;
          break;        
        case "c01":
          this.berlian = true;
          break;
        case "c02":
          // this.perhiasan = true;
          break;
        case "c03":
          // this.perhiasan = true;
          break;
        case "c04":
          // this.perhiasan = true;
          break;
        case "c05":
          this.mulia = true;
          break;
        default:
          break;
      }
    }
    if (val == '0') {
      this.inputKuota = false;
      this.kuotaProduk = false;
    }else if (val == '1') {
      this.inputKuota = true;
      this.kuotaProduk = false;
    }else if (val == '2'){
      this.inputKuota = false;
      this.kuotaProduk = true;
    }
  }

  // setting
  settingPerhiasan(){
    let data = [];
    let data2 = [];
    let data3 = [];
    this.vendorService.list("?_hash=1&product-category.code=c00&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load vendor perhiasan failed");
        return;
      }
      for (let val of response) {
        data.push({id:val._hash,text:val.name})
      }
      this.vendorPerhiasan = data;
    })

    this.productPurityService.list("?_hash=1&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load purity perhiasan failed");
        return;
      }
      for (let val of response) {
        data2.push({id:val._hash,text:val.name})
      }
      this.purityPerhiasan = data2;
    })

    this.productJenisService.list("?_hash=1&product-category.code=c00&_sortby=name:1").subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("load jenis perhiasan failed");
        return;
      }
      for (let val of response) {
        data3.push({id:val._hash,text:val.name})
      }
      this.jenisPerhiasan = data3;
    })
  }

  // end setting

  // form
  form(){
    this.section1_penjualan = new FormGroup({
      nama : new FormControl ("", Validators.required),
      startDate : new FormControl ("", Validators.required),
      endDate : new FormControl ("", Validators.required),
      units : new FormControl ("", Validators.required),
      pickUnits : new FormControl (""),
      'product-category' : new FormControl ("", Validators.required),
      typeQuota : new FormControl ("", Validators.required),  
      quota : new FormControl (""),
    });
  }

  formPerhiasan(){
    this.settingPerhiasan();
    this.section2_perhiasan = new FormGroup({
      prmPromotion : new FormControl ("", Validators.required),
      minPrmPromotion : new FormControl ("", Validators.required),
      maxPrmPromotion : new FormControl ("", Validators.required),
      typePromotion : new FormControl ("", Validators.required),
      sizeTypePromotion : new FormControl ("", Validators.required),
      vendor: new FormControl ("", Validators.required),
      purity: new FormControl ("", Validators.required),
      typePerhiasan : new FormControl ("", Validators.required),
      age : new FormControl ("", Validators.required),
      minAge : new FormControl (""),
      maxAge : new FormControl (""),
      quota : new FormControl (""),
    })
  }
  // end form

  openWizard(val){
    console.debug(val, "selected")
    if (val=='manual') {
      
    }else if(val == 'penjualan'){
      this.form();
      this.penjualanWizard = true;
    }
  }

  viewProductcategory(){
    console.debug(this.section1_penjualan.get("product-category").value)
  }

  storePromotion(){
    let productCAT = [];    
    let PUnits = [];
    // section1
    let section1 = this.section1_penjualan.getRawValue();
    // product category
    for (let data of section1['product-category']) {
      productCAT.push(JSON.parse(atob(data)))
    }
    console.debug (productCAT,"product");
    section1['product-category']= btoa(JSON.stringify(productCAT));
    section1['product-category_encoded'] = "base64array";
    // units
    if (section1.units == "pd") {
      for (let data of section1.pickUnits) {
        PUnits.push(JSON.parse(atob(data)))      
      }
      console.debug (PUnits,"units");
      section1.units = btoa(JSON.stringify(PUnits));
      section1.units_encoded = "base64array";
      delete section1.pickUnits;
    }else{
      delete section1.pickUnits
      section1.units_encoded = "base64array";
    }
    // end section1

    // section 2
    let product = {};

    if (this.perhiasan == true) {
      let section2Perhiasan = this.section2_perhiasan.getRawValue();
      // perhiasan
      if (Object.keys(section2Perhiasan).length != 0) {
        let isiVendor = [];
        let isiPurity = [];
        let isiTypePerhiasan = [];
        // Vendors
        for (let vendor of section2Perhiasan.vendor) {
          isiVendor.push(JSON.parse(atob(vendor)))
        }
        section2Perhiasan.vendor= isiVendor;

        // purity
        for (let purity of section2Perhiasan.purity) {
          isiPurity.push(JSON.parse(atob(purity)))
        }
        section2Perhiasan.purity= isiPurity;

        // typePerhiasan
        for (let typePerhiasan of section2Perhiasan.typePerhiasan) {
          isiTypePerhiasan.push(JSON.parse(atob(typePerhiasan)))
        }
        section2Perhiasan.typePerhiasan= isiTypePerhiasan;
      }

      product['perhiasan'] = section2Perhiasan;
    }
    
    // end section 2   
        
    let data = Object.assign(section1,{
      'product' : btoa(JSON.stringify(product)),
      'product_encoded':'base64',
      'flag':'0'});
    console.debug (data,"isi data");
    // return;
    

    this.promotionSetiingService.add(data).subscribe((response:any)=>{
      if (response != false) {
        this.toastrService.success("add Succses");
        this.ChangeContentArea('10004');
        return;
      }else{
        this.toastrService.error("add Failed");
        return;
      }
    })
  }

  ChangeContentArea(pageId : string)
  {
    if(pageId.startsWith("x")) return;
    ContentPage.ChangeContent(pageId, true)
  }

  static key = EMenuID.PENGATURAN_PROMO;

}
