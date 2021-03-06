import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormGroup } from '@angular/forms';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DatePipe } from '@angular/common';
import { ServerDateTimeService } from "../../../services/system/server-date-time.service";
//Database
import { VendorService } from '../../../services/vendor.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { JenisBarangService } from '../../../services/product/jenis-barang.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { PrmJualService } from '../../../services/parameter/prm-jual.service';
import { TransactionTypeService } from '../../../services/transaction/transaction-type.service';
import { PrmMarginService } from '../../../services/parameter/prm-margin.service';

import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';

export interface channel {
  id: number;
  name: string;
}

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
  title = "Setup Logam Mulia/Dinar"
  // spinner 
  spinner = false;
  //placeholder datagrid
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  // ClrDatagrid
  loadingDg: boolean = false;
  //datetime
  timezone = "string";
  date_now = "string";
  time = "string";
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
  params = null;
  myRole = null;
  product = null;
  list_vendors = null;
  getDataold = null;
  transactionType = null;
  margin = null;
  totaljual = [];
  tempVendor = [];
 
  vendorCategory= "product-category.code=c05,c06";
  category = "?_ne=flag:expired&product-category.code=c05,c06&_sortby=_id:2";
  produtCategory = null;
  filterProduct = "?code=c05,c06";
  
  static key = EMenuID.PRM_GALLERY;
  // dialog
  modalAddDialog: boolean = false;
  modalEditDialog: boolean = false;
  modalDeleteDialog: boolean = false;
  modalConfirmDialog: boolean = false;
  modalDetailDialog: boolean = false;
  // dialog  form
  form: FormGroup = null;

  constructor(
    //app
    private vendorService: VendorService,
    private JenisBarangService: JenisBarangService,
    private ProductDenom: ProductDenomService,
    private productCategoryService: ProductCategoryService,
    private transactionTypeService: TransactionTypeService,
    private prmJualService : PrmJualService,
    private prmMargin: PrmMarginService,
    //session
    private sessionService: SessionService,
    private dateServices : ServerDateTimeService,
    //parameter
    private toastrService: ToastrService,
  ) { }

  defaultHarga() {
    return {
      "product-denom" : null,
      "harga_baku" : 0
    };
  }

  inputModel : any = {items : []};
  defaultInput(): any {
    return{
      keterangan : null, 'jenis_barang': null, selectVendor: null, selectProduct: null
    }
  }

  searchModel : any = {vendors:"all", jenisperhiasan: "all", jenisbarang: "all"};
  
  ngOnInit(): void {
    this.inputModel = this.defaultInput();
    this.onListBarang();
    this.onListProduct();
    this.onSearchVendor();
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]};
    this.myRole = this.sessionService.getRole().name;
    let params = "?";
    this.dateServices.task(params).subscribe(output=>{
      if(output!=false){
        this.timezone = output;
        let tgl = this.timezone.split("T");
          this.date_now = tgl[0];
          this.time = tgl[1].split("Z")[0];
      }
    })
  }

  muter(){
    this.loadingDg = true
  }

   // modal add 
   mainAdd() {
    this.inputModel = this.defaultInput();
    this.modalAddDialog = true;
  }

  validateInput(){
    for(let key in this.inputModel)
    {
      let value = this.inputModel[key];
      console.log(value, key, 'key')
      if(value == null || value == "null" || value == 0 || (typeof value === 'number' && value === 0))
      {
        this.toastrService.warning("Field belum diisi / sama dengan 0 ");
        return true
      }
    }
    return false
  }

  mainAddSubmit(){
    if(this.validateInput()) return;

    //get data productCategory
    let prod = null;
    let codeProd = null;
    for(let i of this.product){
      if (this.inputModel.selectProduct == i.code) {
        prod = btoa(JSON.stringify(i));
        codeProd = i.code;
      }
    }

    //get data vendor
    let vnd = null;
    let codeVnd = null;
    for(let i of this.list_vendors){
      if (this.inputModel.selectVendor == i.code) {
        vnd = btoa(JSON.stringify(i));
        codeVnd = i.code;
      }
    }

    let prmJual = {
      "jenis_barang" : this.inputModel.jenis_barang,
      "product-category" : prod,
      "product-category_encoded" : "base64",
      "vendor" : vnd,
      "vendor_encoded" : "base64",
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : this.date_now,
      "create_time" : this.time,
      "flag" : "submit",
      "keterangan" : this.inputModel.keterangan,
      "harga" : btoa(JSON.stringify(this.harga)),
      "harga_encoded" : "base64array"
    }

    this.spinner = true;
    this.prmJualService.add(prmJual).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Add Failed')
        return
      }
      this.spinner = false;
      this.modalAddDialog = false;
      this.onCariDefault();
      this.toastrService.success('Add Success')
    })
    console.debug('submitted data',  prmJual)
  }

  mainDetail(data) {
    console.debug("dataDetail", data);

    this.transactionTypeService.list().subscribe((out) => {
      if (out != false) {
        this.transactionType = out;
      }  
    });

    this.inputModel = data;
    this.harga = this.inputModel.harga;
    this.inputModel.selectProduct = data['product-category'].name;
    this.inputModel.selectP = data['product-category'].code;
    this.inputModel.selectVendor = data['vendor'].name;
    this.inputModel.jenis_barang = data.jenis_barang;
    this.inputModel.keterangan = data.keterangan;

    this.modalDetailDialog = true;
  }

  onChangeTrans(data){
    let product = this.inputModel.selectP;
    let prm = "?product-category.code="+product+"&transaction-type.code="+data+"&flag=approved";
    
    this.prmMargin.get(prm).subscribe((out) => {
      if (out == false) {
        this.toastrService.info("Data margin not found");
      }
      this.margin = out.margin;
      //hitung harga jual
      // let itung = null;
      // for(let i of this.harga){
      //   itung = (i.harga_baku * this.margin/100)+i.harga_baku;
      //   this.totaljual.push(itung);
      //   console.log(this.totaljual,'wk');
      // }
    })
  }

  mainConfirm(data) {
    console.debug("dataConfirm", data);

    this.inputModel = data;
    this.harga = this.inputModel.harga;
    // console.log('rego',this.harga);
    this.inputModel.selectProduct = data['product-category'].name;
    this.inputModel.selectVendor = data['vendor'].name;
    this.inputModel.selectP = data['product-category'].code;
    this.inputModel.selectV = data['vendor'].code;
    this.inputModel.jenis_barang = data.jenis_barang;
    this.inputModel.keterangan = data.keterangan;
    // this.onChange(this.inputModel.selectProduct);

    this.modalConfirmDialog = true;
  }

  mainApproveSubmit() {
    if(this.validateInput()) return;

    let prmJual = {
      "_id" : this.inputModel._id,
      "keterangan" : this.inputModel.keterangan,
      "approve_by" : this.nikUser["_hash"],
      "approve_by_encoded" : "base64",
      "approve_date" : this.date_now,
      "approve_time" : this.time,
      "flag" : "approved",
    }

    //get data approve lama
    this.spinner = true;
    this.prmJualService.get("?flag=approved&product-category.code="+this.inputModel.selectP+"&vendor.code="+this.inputModel.selectV+"&jenis_barang="+this.inputModel.jenis_barang).subscribe((out) => {
      this.getDataold = out._id;

      if (out == false){
        this.prmJualService.update(prmJual).subscribe((response1) => {
          if (response1 == false) {
            this.toastrService.error('Approved Failed')
            return
          }
          this.spinner = false;
          this.modalConfirmDialog = false;
          this.toastrService.success('Approved Success')
          return
        })
      }else{
        let histori = {
          "_id" : this.getDataold,
          "expired_date" : this.date_now,
          "expired_time" : this.time,
          "flag" : "expired",
        }
  
        //ubah data lama menjadi histori
        this.prmJualService.update(histori).subscribe((response) => {
          if (response == false) {
            this.toastrService.error('Update Existing Failed')
            return
          }
          this.prmJualService.update(prmJual).subscribe((response1) => {
            if (response1 == false) {
              this.toastrService.error('Approved Failed')
              return
            }
            this.spinner = false;
            this.modalConfirmDialog = false;
            this.onCariDefault();
            this.toastrService.success('Approved Success')
          })
        })
      console.debug('submitted data',  prmJual)
      console.debug('submitted data',  histori)
      }
    })
  }

  mainDeclineSubmit() {
    if(this.validateInput()) return;

    let prmJual = {
      "_id" : this.inputModel._id,
      "decline_by" : this.nikUser["_hash"],
      "decline_by_encoded" : "base64",
      "decline_date" : this.date_now,
      "decline_time" : this.time,
      "flag" : "declined",
    }
    
    this.spinner = true;
    this.prmJualService.update(prmJual).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Decline Failed')
        return
      }
      this.spinner = false;
      this.modalConfirmDialog = false;
      this.onCariDefault();
      this.toastrService.success('Decline Success')
    })
    console.debug('submitted data',  prmJual)
  }

  onListVendor(){
    this.vendorService.list("?product-category.code="+this.produtCategory).subscribe((response: any) => {
      if (response != false) {
        this.list_vendors = response;
      }      
    });
  }

  onSearchVendor(){
    this.vendorService.list("?"+this.vendorCategory).subscribe((response: any) => {
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

  onListProduct(){
    this.productCategoryService.list(this.filterProduct).subscribe((response : any) => {
      if (response != false) {
        this.product = response;
      }
    });
  }

  onChangeProduct(data){
    if (data == false) {
      this.toastrService.error("Product not found");
    }else{
      this.produtCategory = data;
      this.onProductDenom();
      this.onListVendor();
    }
  }

  onChange(data){
    if (data == false) {
      this.toastrService.error("Product not found");
    }else{
      this.produtCategory = data;
      this.onProductDenom();
    }
  }

  harga : any[] =[];

  onProductDenom(){
    this.ProductDenom.list("?product-category.code="+this.produtCategory+"&_sortby=value:1").subscribe((response :any) => {
      if (response != false) {
        this.denom = response;
        while(this.harga.length > 0) this.harga.pop(); // clear array

        for(let i = 0; i < response.length; i++)
        {
          let harga = this.defaultHarga();
          harga["product-denom"] = response[i];
          this.harga.push(harga);
        }
      }
    }); 
  }

  onCariLogamMulia(data){
    // CLR Datagrid loading
    this.loadingDg = true;

    this.params = null;
    let vendor = data.input_vendor_perhiasan;
    let barang = data.input_jenis_barang;
  
    const urlVendor = "_ne=flag:expired&_hash=1&vendor.code="+vendor+"&_sortby=_id:2";
    const urlBarang = "_ne=flag:expired&jenis_barang="+barang+"&_sortby=_id:2";
    
    this.params = this.category;
    
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

  onCariDefault(){
    // CLR Datagrid loading
    this.loadingDg = true;
    
    this.params = this.category;

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
