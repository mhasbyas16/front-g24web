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

@Component({
  selector: 'app-wizard-perhiasan',
  templateUrl: './wizard-perhiasan.component.html',
  styleUrls: ['./wizard-perhiasan.component.scss']
})
export class WizardPerhiasanComponent implements OnInit, OnChanges {
  
  @Output() dataPerhiasan:any = new EventEmitter();

  @Input() kuotaProduk:boolean = false;
  @Input() getData:boolean = false;

  selectVendor:boolean = false;
  selectPurity:boolean = false;
  selectTypePerhiasan:boolean = false;

  section2_perhiasan: FormGroup = null;

    public options:Options;
    public options2:Options;
    // select2 perhiasan 
    vendorPerhiasan:Array<Select2OptionData>;
    purityPerhiasan:Array<Select2OptionData>;
    jenisPerhiasan:Array<Select2OptionData>;
    umurPerhiasan:boolean = false;
  constructor(
    public vendorService : VendorService,
    public productPurityService : ProductPurityService,
    public productJenisService : ProductJenisService,
    public toastrService: ToastrService,
    private promoService:PromoService,
  ) { }

  ngOnChanges(){
    this.passingData(this.getData);
  }
  ngOnInit(): void {
    this.formPerhiasan();
    this.settingPerhiasan();


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

  select2TypePerhiasan(val){
    if (val == 'pj'){
      this.selectTypePerhiasan = true;
    }else{
      this.selectTypePerhiasan = false;
    }
  }

  formPerhiasan(){
    this.section2_perhiasan = new FormGroup({
      prmPromotion : new FormControl ("", Validators.required),
      minPrmPromotion : new FormControl ("", Validators.required),
      maxPrmPromotion : new FormControl ("", Validators.required),
      typePromotion : new FormControl ("", Validators.required),
      sizeTypePromotion : new FormControl ("", Validators.required),
      vendor: new FormControl ("", Validators.required),
      pickVendor: new FormControl (""),
      purity: new FormControl ("", Validators.required),
      pickPurity: new FormControl (""),
      typePerhiasan : new FormControl ("", Validators.required),
      pickTypePerhiasan : new FormControl (""),
      age : new FormControl ("", Validators.required),
      minAge : new FormControl (""),
      maxAge : new FormControl (""),
      quota : new FormControl (""),
    })
  }

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

  pickUmur(val){
    if (val == "du") {
      this.umurPerhiasan = true;
    }else{
      this.umurPerhiasan = false;
    }
  }

  passingData(getData){
    if (getData != false) {
      console.debug("isi data from perhiasan")
      this.promoService.perhiasanData(this.section2_perhiasan.getRawValue());
      this.dataPerhiasan.emit(true);
    }      
  }
}
