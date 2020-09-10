import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";
import { ClrWizard } from '@clr/angular';
import { Select2OptionData } from 'ng-select2';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';

// import { EMenuID } from '../../../../lib/enums/emenu-id.enum';
// import { DContent } from '../../../../decorators/content/pages';
import { ContentPage } from '../../../../lib/helper/content-page';

// Services
import { PromoService } from '../../promo.service';
import { PromotionSettingService } from '../../../../services/promotion/promotion-setting.service';

import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { UnitService } from '../../../../services/system/unit.service';
import { ProductCategoryService } from '../../../../services/product/product-category.service';
import { BudgetCostService } from '../../../../services/promotion/budget-cost.service';


@Component({
  selector: 'app-edit-promo',
  templateUrl: './edit-promo.component.html',
  styleUrls: ['./edit-promo.component.scss'],
  providers:[DatePipe],
})
export class EditPromoComponent implements OnInit {
  section1_edit:FormGroup = null;

  // Wizard
  perhiasan:boolean = false;
  berlian:boolean = false;
  mulia:boolean = false;
  giftSouvenir:boolean = false;
  dinar:boolean = false;

  selectdistro:boolean = false;
  selectProduct:boolean = false;
  editPromosi:boolean = false;
  inputKuota:boolean = false;
  kuotaProduk:boolean = false;
  passingPromoMargin:boolean = false;

  tipeGS:any;

  nikUser:any;
  dataEdit:any;
  dataToChild:any;
  valuePC:string[]=[];
  valueUnit:string[];
  public options:Options;
  public options2:Options;
  budgetCost:any;

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

  // select2
  unit:Array<Select2OptionData>=[];
  productCategory:Array<Select2OptionData>=[];
  constructor(
    private datePipe: DatePipe,
    private sessionService: SessionService,
    private unitService:UnitService,
    private productCategoryService:ProductCategoryService,
    private toastrService: ToastrService,
    private promoService:PromoService,
    private promotionSetiingService : PromotionSettingService,
    private budgetCostService:BudgetCostService

  ) { }

  ngOnInit(): void {
    this.form();
    
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
    let section1 = this.section1_edit.getRawValue();
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
    this.editPromotion(data);
  }

  editPromotion(data){   
    console.debug (data,"isi data1211212");
    this.promotionSetiingService.update(data).subscribe((response:any)=>{
      if (response != false) {
        this.toastrService.success("Update Succses");
        this.ChangeContentArea('10005');
        return;
      }else{
        this.toastrService.error("Update Failed");
        return;
      }
    })
  }

  productSelect(data:any){
    console.debug (data,"datasatsatat575756")
    this.promoService.product.splice(0);
    
    let arr = [];
    if (this.selectProduct != true) {
      // perhiasan
      this.perhiasan = true;
      this.dinar = true;
      this.berlian = true;
      this.mulia = true;
      this.giftSouvenir = true;

      this.dataToChild = data;
    }else{
      let productCat:any;
    for (let section of this.section1_edit.get("pickProduct-category").value) {
      productCat = "";
      productCat = JSON.parse(atob(section));
      arr.push(productCat)
      console.debug(arr,"isi product arr")
       
    }
    
    if (arr.some(function(el){ return el.code === "c00"}) == true) {   
      this.perhiasan = true;
      this.dataToChild = data;
    }else{
      this.perhiasan = false;
    }

    if (arr.some(function(el){ return el.code === "c01"}) == true) {
      this.berlian = true;
      this.dataToChild = data;
    }else{
      this.berlian = false;
    }  
    
    if (arr.some(function(el){ return el.code === "c06"}) == true) {
      this.dinar = true;
      this.dataToChild = data;
    }else{
      this.dinar = false;
    }  

    if (arr.some(function(el){ return el.code === "c02"}) == true || arr.some(function(el){ return el.code === "c04"}) == true) {
      this.giftSouvenir = true;
      this.dataToChild = data;
      this.tipeGS ='s';
    }else{
      this.giftSouvenir = false;
      this.tipeGS ='';
    } 

    if (arr.some(function(el){ return el.code === "c05"}) == true) {
      this.mulia = true;
      this.dataToChild = data;
    }else{
      this.mulia = false;
    }
    }
    
  }

  openEdit(_hash:any){
    // Maker
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser))} ;
    
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

    this.dataEdit = JSON.parse(atob(_hash));
    this.addToForm(this.dataEdit);
    console.debug(this.dataEdit,"data Edit");
    this.editPromosi = true;
  }

  addToForm(data:any){
    this.valueUnit=[];
    this.valuePC=[];
    this.productCategory=[];
    this.unit=[];

    this.section1_edit.patchValue({
      _id: data._id,
      name: data.name,
      startDate : data.startDate,
      endDate : data.endDate,
      typeQuota: data.typeQuota,
      quota : data.quota
    });
    this.selectKuota(data.typeQuota);

    let bcs=[];
    this.budgetCostService.list('?_hash=1').subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Get Budget Cost Failed");
        return;
      }
      for (let isi of response ) {
        bcs.push(isi)
        if (isi.code == data['budget-cost'].code) {
          this.section1_edit.patchValue({'budget-cost':isi._hash});
        }
      }
      this.budgetCost = bcs;
      this.select2BudgetCost(data['budget-cost'].code);
    })

    // units
    let Unit=[];
    let UnitVal = [];

    this.unitService.list('?_hash=1&_sortby=nama:1').subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Get Units Error");
        return;
      }

      if (data.units == '1') {
        for (let res of response) {
          Unit.push({id:res._hash,text:res.nama});          
        }
        this.section1_edit.patchValue({units:'1'})
        this.select2Distro('1');
      }else{
        for (let res of response) {
          Unit.push({id:res._hash,text:res.nama});
  
          for (let isi of data.units) {
            if (res.code == isi.code) {
              UnitVal.push(res._hash);
            }
          }          
        }
        
        this.valueUnit = UnitVal;
        this.section1_edit.patchValue({units:'pd'})
        this.select2Distro('pd');
      }
        this.unit = Unit ;
    })

    

    // product category
    let PC=[];
      let hash:any ;
      this.productCategoryService.list('?_hash=1&_sortby=name:1').subscribe((response:any)=>{
        if (response == false) {
          this.toastrService.error("Get Product Category Error");
          return;
        }

        if (data['product-category'] == '1') {
          for (let res of response) {
            PC.push({id:res._hash,text:res.name});       
          }
          this.section1_edit.patchValue({'product-category':'1'})
          this.select2Product('1');
        }else{
          
          for (let res of response) {
            PC.push({id:res._hash,text:res.name});
  
            for (let isi of data['product-category']) {
              if (res.code == isi.code) {
                this.valuePC.push(res._hash);
              }
            }          
          }
          this.section1_edit.patchValue({'product-category':'pp'});
          this.select2Product('pp');
          // looping ke select2
          //   'pickProduct-category' : new FormControl (""),
        }       
        
        this.productCategory = PC ;
      })
    
  }

  select2Distro(val){
    if (val == 'pd'){
      this.selectdistro = true;
    }else{
      this.selectdistro = false;
      console.debug(val,"isi select")
    }
  }

  select2BudgetCost(val){
    let isi = JSON.parse(atob(val));
    if (isi.code == 'promomargin') {
      this.passingPromoMargin= true;
      console.debug('promo margin')
    }else{
      this.passingPromoMargin = false;
    }
  }

  select2Product(val){
    if (val == 'pp'){
      this.selectProduct = true;
    }else{
      this.selectProduct = false;
    }
    // this.section1_edit.patchValue({typeQuota:""})
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

  // form
  form(){
    this.section1_edit = new FormGroup({
      _id: new FormControl ("", Validators.required),
      name : new FormControl ("", Validators.required),
      startDate : new FormControl ("", Validators.required),
      endDate : new FormControl ("", Validators.required),
      units : new FormControl ("", Validators.required),
      pickUnits : new FormControl (""),
      'product-category' : new FormControl ("", Validators.required),
      'pickProduct-category' : new FormControl (""),
      typeQuota : new FormControl ("", Validators.required),  
      quota : new FormControl (""),
      'budget-cost': new FormControl ("", Validators.required),
      'budget-cost_encoded': new FormControl ("base64")
      // maker : new FormControl (this.nikUser._hash, Validators.required),
      // maker_encoded : new FormControl ("base64"),
      // makerDate: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy'), Validators.required),
      // makerTime: new FormControl(this.datePipe.transform(Date.now(),'h:mm:ss a'), Validators.required),
      // approval : new FormControl (""),
      // approvalDate: new FormControl(""),
      // approvalTime: new FormControl(""),
    });
  }

  cancelWizard(){
    this.form();
    this.dataToChild = "";
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
}
