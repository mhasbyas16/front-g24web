import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import {FormGroup, Validators, FormControl } from '@angular/forms';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DatePipe } from '@angular/common';
//Database
import { VendorService } from '../../../services/vendor.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { JenisBarangService } from '../../../services/product/jenis-barang.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { PrmJualService } from '../../../services/parameter/prm-jual.service';
import { PrmMarginService } from '../../../services/parameter/prm-margin.service';
import { PrmPpnService } from '../../../services/parameter/prm-ppn.service';

import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';

@Component({
  selector: 'app-parameter-gellery',
  templateUrl: './parameter-gellery.component.html',
  styleUrls: ['./parameter-gellery.component.scss'],
  providers: [DatePipe]
})

@DContent(ParameterGelleryComponent.key)
export class ParameterGelleryComponent implements OnInit {

   //title
   breadcrumb = "Parameter"
   title = "Parameter Logam Mulia"
   // spinner 
   spinner = false;
  //placeholder datagrid
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  // ClrDatagrid
  loadingDg: boolean = false;
  //list
  vendors = null;
  jenis = null;
  barang = null;
  denom = null;
  berlians = null;
  databerlians = null;
  datalist = null;
  logamMulia = null;
  myproduct = null;
  nikUser = null;
  //params
  params = null;
  //parameter
  margin = null;
  hargaBaku = null;

  vendorCategory= "product-category.code=c05";
  category = "?_hash=1&product-category.code=c05";
  produtCategory = "?_hash=1&product-category.code=c05";

  static key = EMenuID.PRM_GALLERY;
  // dialog
  modalAddDialog: boolean = false;
  modalEditDialog: boolean = false;
  modalDeleteDialog: boolean = false;
  // dialog  form
  form: FormGroup = null;
  constructor(
    //app
    private vendorService: VendorService,
    private JenisBarangService: JenisBarangService,
    private ProductDenom: ProductDenomService,
    private ProductCategoryService: ProductCategoryService,

    private toastrService: ToastrService,
    //session
    private sessionService: SessionService,
    private datePipe: DatePipe,
    //parameter
    private prmJualService : PrmJualService,
    private prmMarginService: PrmMarginService,
    private prmPpnService : PrmPpnService,
  ) { }

  searchModel : any = {vendors:"all", jenisperhiasan: "all", jenisbarang: "all"};
  checkboxModel : any = {online:"Online", offline: "Offline"};
  // checkboxModel = [
  //   { id: 'online', label: 'Online', isChecked: true},
  //   { id: 'offline', label: 'Offline', isChecked: true }
  // ];
  
 
  ngOnInit(): void {
    this.onListVendor();
    this.onListBarang();
    this.onProductDenom();
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]} ;
  }

   // modal add 
   mainAdd() {
    this.form = new FormGroup({
      jenis_barang: new FormControl('', [Validators.required]),
      jenis_barang_encoded: new FormControl('base64'),
      product_category: new FormControl("ewogICAgIl9pZCIgOiBPYmplY3RJZCgiNWViYmEwOTViOTgwYmQyNGI5MjAxY2NhIiksCiAgICAibmFtZSIgOiAiTXVsaWEiLAogICAgImNvZGUiIDogImMwNSIsCiAgICAiY2F0ZWdvcnkiIDogInByb2R1Y3QtY2F0ZWdvcnkiLAogICAgImRpc3BsYXkiIDogMSwKICAgICJzdGF0dXMiIDogMQp9"),
      product_category_encoded: new FormControl('base64'),
      vendor: new FormControl('', [Validators.required]),
      vendor_encoded: new FormControl('base64'),
      maker: new FormControl (this.nikUser["_hash"], [Validators.required]),
      maker_encoded: new FormControl("base64"),
      makerDate: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy'), Validators.required),
      makerTime: new FormControl(this.datePipe.transform(Date.now(),'h:mm:ss a'), Validators.required),
      flag: new FormControl("1"),
      online: new FormControl('', [Validators.required]),
      offline: new FormControl('', [Validators.required]),
      keterangan: new FormControl('', [Validators.required]),
      pembiayaan_pegadaian: new FormControl('', [Validators.required]),
      pembiayaan_perusahaan: new FormControl('', [Validators.required]),
      penjualan_koorporasi: new FormControl('', [Validators.required]),
      penjualan_bundling: new FormControl('', [Validators.required]),
      penjualan_pameran: new FormControl('', [Validators.required]),
      penjualan_agen: new FormControl('', [Validators.required]),
      penjualan_karyawan: new FormControl('', [Validators.required]),
      invoice_7hr: new FormControl('', [Validators.required]),
      invoice_14hr: new FormControl('', [Validators.required]),
      penjualan_cash: new FormControl('', [Validators.required]),
      penjualan_serahtunda: new FormControl('', [Validators.required]),
      penjualan_bulk: new FormControl('', [Validators.required]),
      hrg0E: new FormControl('', [Validators.required]),
      jual0E: new FormControl('', [Validators.required]),
      hrg02: new FormControl('', [Validators.required]),
      jual02: new FormControl('', [Validators.required]),
      hrg01: new FormControl('', [Validators.required]),
      jual01: new FormControl('', [Validators.required]),
      hrg0B: new FormControl('', [Validators.required]),
      jual0B: new FormControl('', [Validators.required]),
      hrg00: new FormControl('', [Validators.required]),
      jual00: new FormControl('', [Validators.required]),
      hrg0A: new FormControl('', [Validators.required]),
      jual0A: new FormControl('', [Validators.required]),
      hrg0F: new FormControl('', [Validators.required]),
      jual0F: new FormControl('', [Validators.required]),
      hrg0C: new FormControl('', [Validators.required]),
      jual0C: new FormControl('', [Validators.required]),
      hrg04: new FormControl('', [Validators.required]),
      jual04: new FormControl('', [Validators.required]),
      hrg05: new FormControl('', [Validators.required]),
      jual05: new FormControl('', [Validators.required]),
      hrg09: new FormControl('', [Validators.required]),
      jual09: new FormControl('', [Validators.required]),
      hrg0D: new FormControl('', [Validators.required]),
      jual0D: new FormControl('', [Validators.required]),
      hrg08: new FormControl('', [Validators.required]),
      jual08: new FormControl('', [Validators.required]),
      hrg06: new FormControl('', [Validators.required]),
      jual06: new FormControl('', [Validators.required]),
      hrg07: new FormControl('', [Validators.required]),
      jual07: new FormControl('', [Validators.required]),
      hrg03: new FormControl('', [Validators.required]),
      jual03: new FormControl('', [Validators.required]),
    });
    this.modalAddDialog = true;
  }

  mainAddSubmit(){
    // if (!this.form.valid) {
    //   this.toastrService.error('Form not complete yet', this.title);
    //   return;
    // }
    
    let data = this.form.getRawValue();

    let prmJual = {
      "jenis-barang" : data.jenis_barang,
      "jenis_barang_encoded" : data.jenis_barang_encoded,
      "product-category" : data.product_category,
      "product-category_encoded" : data.product_category_encoded,
      "vendor" : data.vendor,
      "vendor_encoded" : data.vendor_encoded,
      "maker" : data.maker,
      "maker_encoded" : data.maker_encoded,
      "makerDate" : data.makerDate,
      "makerTime" : data.makerTime,
      "flag" : data.flag,
    }

    let chanel1 = data["online"];
    let chanel2 = data["offline"];

    // validasi checkbox
    if (chanel1 == false && chanel2 == false) {
      this.toastrService.error('Checkbox harus diisi', this.title);
      return;
    }

    let arraych = [];
    delete data["online"]
    delete data["offline"]

    if (chanel1 != false && chanel2 != false) {
      arraych = [{"code":"ch01","name" : "Online"}, {"code":"ch02","name" : "Offline"}]
    }else if (chanel1 == false && chanel2 != false) {
      arraych = [{"code":"ch02","name" : "Offline"}]
    }else{
      arraych = [{"code":"ch01","name" : "Online"}]
    }
    data["channel"] = arraych
    
    // this.prmJualService.add(data).subscribe((response) => {
    //   if (response == false) {
    //     this.toastrService.error('Failed')
    //     return
    //   }
    //   this.toastrService.success('Success')
    // })

    // let parse = JSON.stringify(data)
    let encoded = btoa(JSON.stringify(data))
    let decode = JSON.parse(atob(encoded))
    // console.debug(encoded)
    console.debug('submitted data',  prmJual)
    // this.spinner = true;
  }

  onListVendor(){
    this.vendorService.list("?_hash=1&"+this.vendorCategory).subscribe((response: any) => {
      if (response != false) {
        this.vendors = response;
      }      
    });
  }
  onListBarang(){
    this.JenisBarangService.list("?_hash=1").subscribe((response : any) => {
      if (response != false) {
        this.barang = response;
      }
    });
  }
  onProductDenom(){
    this.ProductDenom.list(this.produtCategory+"&_sortby=name:1").subscribe((response :any) => {
      if (response != false) {
        this.denom = response;
      }
    }); 
  }

  onCariLogamMulia(data){
    // CLR Datagrid loading
    this.loadingDg = true;

    this.params = null;
    let vendor = data.input_vendor_perhiasan;
    let barang = data.input_jenis_barang;
  
    const urlVendor = "vendor.code="+vendor;
    const urlBarang = "jenis-barang.code="+barang;
    
    this.params = this.category;
    
    // Session
    const getUnit = this.sessionService.getUnit();
    console.debug(getUnit + "Ini Unit");
    // this.params = this.params+"&unit.code="+getUnit["code"];
    this.params = this.params;

    if (vendor != 'all') {
      this.params = this.params+"&"+urlVendor;
    }
    if (barang != 'all') {
      this.params = this.params+"&"+urlBarang;
    }
   
    // prmjual
    this.prmJualService.list(this.params).subscribe((response: any) => {
      if (response == false) {
        this.toastrService.error("Data Not Found", "Logam Mulia");
        this.loadingDg = false;
        return;
      }  
      if (response["length"] == 0) {
        this.toastrService.error("Data Not Found", "Logam Mulia");
        this.loadingDg = false;
        return;
      } 
      this.logamMulia = response;
      this.toastrService.success("Load "+response["length"]+" Data", "Logam Mulia");
      this.loadingDg = false;
    }); 
  }
}
