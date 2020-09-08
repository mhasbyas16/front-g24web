import { Component, OnInit, ViewChild } from '@angular/core';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { ClrWizard } from '@clr/angular'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ToastrService } from 'ngx-toastr';
import { ContentPage } from '../../../lib/helper/content-page';
import { DatePipe } from "@angular/common";

// services
import { PromoService } from '../promo.service';
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
  styleUrls: ['./pengaturan-promo.component.scss'],
  providers:[DatePipe],
})

@DContent(PengaturanPromoComponent.key)
export class PengaturanPromoComponent implements OnInit {

  @ViewChild("manual") wizardManual: ClrWizard;
  @ViewChild("penjualan") wizardPenjualan: ClrWizard;

  // Wizard
  perhiasan:boolean = false;
  berlian:boolean = false;
  mulia:boolean = false;
  giftSouvenir:boolean = false;
  dinar:boolean = false;

  manualWizard: boolean = false;
  penjualanWizard: boolean = false;
  selectdistro:boolean = false;
  selectProduct:boolean = false;
  inputKuota:boolean = false;  
  kuotaProduk:boolean = false;

  // get data ke child
  getDataPerhiasan:boolean = false;
  getDataMulia:boolean = false;
  getDataGiftSouvenir:boolean = false;
  getDataBerlian:boolean = false;
  getDataDinar:boolean = false;

  // passing data strore promosi
  passingPerhiasan:boolean = false;
  passingMulia:boolean = false;
  passingDinar:boolean = false;
  passingGiftSouvenir:boolean = false;
  passingBerlian:boolean = false;

  section1_penjualan: FormGroup = null;
  // Data 
  dataPerhiasan:any;
  product = [];

  public options:Options;
  public options2:Options;
  nikUser:any;
  tipeGS:any;

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
    private datePipe: DatePipe,
    private promoService:PromoService
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
        // data.push(JSON.parse(atob(isi._hash)));
      }
      this.unit = unitarry;
      // this._hashUnit= btoa(JSON.stringify(data));
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

  select2Product(val){
    if (val == 'pp'){
      this.selectProduct = true;
    }else{
      this.selectProduct = false;
    }
    this.section1_penjualan.patchValue({typeQuota:""})
  }

  selectKuota(val){
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

  productSelect(){
    this.promoService.product.splice(0);
    let arr = [];
    if (this.selectProduct != true) {
      this.perhiasan = true;
      this.berlian = true;
      this.mulia = true;
    }else{
      let productCat:any;
    for (let section of this.section1_penjualan.get("pickProduct-category").value) {
      productCat = "";
      productCat = JSON.parse(atob(section));
      arr.push(productCat)
      console.debug(arr,"isi product arr")
       
    }
    
    if (arr.some(function(el){ return el.code === "c00"}) == true) {
      this.perhiasan = true;
    }else{
      this.perhiasan = false;
    }

    if (arr.some(function(el){ return el.code === "c01"}) == true) {
      this.berlian = true;
    }else{
      this.berlian = false;
    }  

    if (arr.some(function(el){ return el.code === "c06"}) == true) {
      this.dinar = true;
    }else{
      this.dinar = false;
    }  

    if (arr.some(function(el){ return el.code === "c02"}) == true || arr.some(function(el){ return el.code === "c04"}) == true) {
      this.giftSouvenir = true;
      this.tipeGS ='s';
    }else{
      this.giftSouvenir = false;
      this.tipeGS ='';
    } 

    if (arr.some(function(el){ return el.code === "c05"}) == true) {
      this.mulia = true;
    }else{
      this.mulia = false;
    }
    }
    
  }

  // form
  form(){
    this.section1_penjualan = new FormGroup({
      name : new FormControl ("", Validators.required),
      startDate : new FormControl ("", Validators.required),
      endDate : new FormControl ("", Validators.required),
      units : new FormControl ("", Validators.required),
      pickUnits : new FormControl (""),
      'product-category' : new FormControl ("", Validators.required),
      'pickProduct-category' : new FormControl (""),
      typeQuota : new FormControl ("", Validators.required),  
      quota : new FormControl (""),
      maker : new FormControl (this.nikUser._hash, Validators.required),
      maker_encoded : new FormControl ("base64"),
      makerDate: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy'), Validators.required),
      makerTime: new FormControl(this.datePipe.transform(Date.now(),'h:mm:ss a'), Validators.required),
      approval : new FormControl (""),
      approvalDate: new FormControl(""),
      approvalTime: new FormControl(""),
    });
  }

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

  // get data
  getPerhiasan(data){
      this.passingPerhiasan = data;
      this.passingData();
  }
  getMulia(data){
    this.passingMulia = data;
    this.passingData();
  }
  getDinar(data){
    this.passingDinar = data;
    this.passingData();
  }
  getGiftSouvenir(data){
    this.passingGiftSouvenir = data;
    this.passingData();
  }

  getBerlian(data){
    this.passingBerlian = data;
    this.passingData();
  }

  passingData(){
    if (this.passingPerhiasan == this.getDataPerhiasan && 
      this.passingMulia == this.getDataMulia &&
      this.passingDinar == this.getDataDinar &&
      this.passingGiftSouvenir == this.getDataGiftSouvenir &&
      this.passingBerlian == this.getDataBerlian) {

      this.getDataPromosi();
    }    
  }

  getDataPromosi(){
    let productCAT = [];    
    let PUnits = [];
    // section1
    let section1 = this.section1_penjualan.getRawValue();
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
      // section1.units_encoded = "base64array";
    }

    // product
    if (section1["product-category"] == "pp") {
      for (let data of section1["pickProduct-category"]) {
        productCAT.push(JSON.parse(atob(data)))      
      }
      section1["product-category"] = btoa(JSON.stringify(productCAT));
      section1["product-category_encoded"] = "base64array";
      delete section1["pickProduct-category"];
    }else{
      delete section1["pickProduct-category"];
      // section1.units_encoded = "base64array";
    }
    // end section1
        
    let data = Object.assign(section1,{
      'product' : btoa(JSON.stringify(this.promoService.product)),
      'product_encoded':'base64array',
      'flag':'0'});
    console.debug (data,"isi data");
    // return;
    this.storePromotion(data);
  }

  storePromotion(data){   

    this.promotionSetiingService.add(data).subscribe((response:any)=>{
      if (response != false) {
        this.toastrService.success("add Succses");
        this.ChangeContentArea('10005');
        return;
      }else{
        this.toastrService.error("add Failed");
        return;
      }
    })
  }
  
  // child get data
  childView(){
    if (this.perhiasan == true) {
      this.getDataPerhiasan = true;
    }    

    if(this.mulia == true){
      this.getDataMulia = true;
    }
    
    if (this.dinar == true) {
      this.getDataDinar = true;
    }

    if(this.giftSouvenir == true){
      this.getDataGiftSouvenir = true;
    }

    if(this.berlian == true){
      this.getDataBerlian = true;
    }
    
  }

  ChangeContentArea(pageId : string)
  {
    if(pageId.startsWith("x")) return;
    ContentPage.ChangeContent(pageId, true)
  }

  static key = EMenuID.PENGATURAN_PROMO;

}
