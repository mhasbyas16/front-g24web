import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormGroup } from '@angular/forms';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DatePipe } from '@angular/common';
//Database
import { VendorService } from '../../../services/vendor.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { JenisBarangService } from '../../../services/product/jenis-barang.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { PrmJualService } from '../../../services/parameter/prm-jual.service';

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
  title = "Setup Logam Mulia"
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
  params = null;
  myRole = null;
 

  vendorCategory= "product-category.code=c05";
  category = "?_hash=1&product-category.code=c05";
  produtCategory = "?_hash=1&product-category.code=c05";

  static key = EMenuID.PRM_GALLERY;
  // dialog
  modalAddDialog: boolean = false;
  modalEditDialog: boolean = false;
  modalDeleteDialog: boolean = false;
  modalConfirmDialog: boolean = false;
  // dialog  form
  form: FormGroup = null;

  constructor(
    //app
    private vendorService: VendorService,
    private JenisBarangService: JenisBarangService,
    private ProductDenom: ProductDenomService,
    private productCategoryService: ProductCategoryService,

    private toastrService: ToastrService,
    //session
    private sessionService: SessionService,
    //parameter
    private prmJualService : PrmJualService,
  ) { }

    defaultHarga() {
      return {
        "product-denom" : null,
        "harga_buyback" : 0,
        "harga_baku" : 0
      };
    }

    inputModel : any = {items : []};
    defaultInput(): any {
      return{
        keterangan : null, 'jenis_barang': null, vendor: null
      }
    }

  searchModel : any = {vendors:"all", jenisperhiasan: "all", jenisbarang: "all"};
  
  ngOnInit(): void {
    this.inputModel = this.defaultInput();
    this.onListVendor();
    this.onListBarang();
    this.onProductDenom();
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]};
    // this.myRole = JSON.stringify(this.sessionService.getRole());
    // console.debug(this.myRole + "Ini Role");
  }

   // modal add 
   mainAdd() {

    this.productCategoryService.get("?code=c05&_hash=1").subscribe(output => {
      if (output == false) {
        this.toastrService.error(this.productCategoryService.message())
        return
      }
      this.myproduct = output
    });
    this.modalAddDialog = true;
  }

  validateInput()
  {
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

    let now : Date = new Date;
    let sNow = now.toISOString().split("T");
    let time = sNow[1].split(".")[0];

    let prmJual = {
      "jenis_barang" : this.inputModel.jenis_barang,
      "product-category" : this.myproduct._hash,
      "product-category_encoded" : "base64",
      "vendor" : this.inputModel.vendor,
      "vendor_encoded" : "base64",
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : new Date().toISOString().split("T")[0],
      "create_time" : time,
      "flag" : "submit",
      "keterangan" : this.inputModel.keterangan,
      "harga" : btoa(JSON.stringify(this.harga)),
      "harga_encoded" : "base64array"
    }

    // untuk melakukan encoded tanpa mendeklarasikan
    // DataTypeUtil.Encode(prmJual)
    
    this.spinner = true;
    this.prmJualService.add(prmJual).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Add Failed')
        return
      }
      this.spinner = false;
      this.modalAddDialog = false;
      this.toastrService.success('Add Success')
    })
    console.debug('submitted data',  prmJual)
  }

  mainEdit(data) {
    console.debug("dataEdit", data);

    this.prmJualService.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.prmJualService.message());
      }
    });

    this.inputModel = data;
    this.harga = this.inputModel.harga
    this.modalEditDialog = true;
  }

  mainEditSubmit(){
    if(this.validateInput()) return;

    let now : Date = new Date;
    let sNow = now.toISOString().split("T");
    let time = sNow[1].split(".")[0];

    let prmJual = {
      "_id" : this.inputModel._id,
      "jenis_barang" : this.inputModel.jenis_barang,
      "vendor" : btoa(JSON.stringify(this.inputModel.vendor)),
      "vendor_encoded" : "base64",
      "update_by" : this.nikUser["_hash"],
      "update_by_encoded" : "base64",
      "update_date" : new Date().toISOString().split("T")[0],
      "update_time" : time,
      "flag" : "submit",
      "keterangan" : this.inputModel.keterangan,
      "harga" : btoa(JSON.stringify(this.harga)),
      "harga_encoded" : "base64array"
    }

    // untuk melakukan encoded tanpa mendeklarasikan
    // let dataEdit = DataTypeUtil.Encode(prmJual)
    
    this.spinner = true;
    this.prmJualService.update(prmJual).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Edit Failed')
        return
      }
      this.spinner = false;
      this.modalEditDialog = false;
      this.toastrService.success('Edit Success')
    })
    console.debug('submitted data',  prmJual)
  }

  mainDelete(data) {
    console.debug("dataDelete", data);

    this.prmJualService.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.prmJualService.message());
      }
    });

    this.inputModel = data;
    this.harga = this.inputModel.harga
    this.modalDeleteDialog = true;
  }

  // Submit delete data
  mainDeleteSubmit() {
    if(this.validateInput()) return;

    let now : Date = new Date;
    let sNow = now.toISOString().split("T");
    let time = sNow[1].split(".")[0];

    let prmJual = {
      "_id" : this.inputModel._id,
    }

    // untuk melakukan encoded tanpa mendeklarasikan
    // let dataEdit = DataTypeUtil.Encode(prmJual)
    
    this.spinner = true;
    this.prmJualService.delete(prmJual).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Delete Failed')
        return
      }
      this.spinner = false;
      this.modalDeleteDialog = false;
      this.toastrService.success('Delete Success')
    })
    console.debug('submitted data',  prmJual)
  }

  mainConfirm(data) {
    console.debug("dataConfirm", data);

    this.inputModel = data;
    this.harga = this.inputModel.harga;
    this.modalConfirmDialog = true;
  }

  mainApproveSubmit() {
    if(this.validateInput()) return;

    let now : Date = new Date;
    let sNow = now.toISOString().split("T");
    let time = sNow[1].split(".")[0];

    let prmJual = {
      "_id" : this.inputModel._id,
      "approve_by" : this.nikUser["_hash"],
      "approve_by_encoded" : "base64",
      "aprrove_date" : new Date().toISOString().split("T")[0],
      "approve_time" : time,
      "flag" : "approved",
    }
    
    this.spinner = true;
    this.prmJualService.update(prmJual).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Approve Failed')
        return
      }
      this.spinner = false;
      this.modalConfirmDialog = false;
      this.toastrService.success('Approve Success')
    })
    console.debug('submitted data',  prmJual)
  }

  mainDeclineSubmit() {
    if(this.validateInput()) return;

    let now : Date = new Date;
    let sNow = now.toISOString().split("T");
    let time = sNow[1].split(".")[0];

    let prmJual = {
      "_id" : this.inputModel._id,
      "decline_by" : this.nikUser["_hash"],
      "decline_by_encoded" : "base64",
      "decline_date" : new Date().toISOString().split("T")[0],
      "decline_time" : time,
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
      this.toastrService.success('Decline Success')
    })
    console.debug('submitted data',  prmJual)
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

  harga : any[] =[];

  onProductDenom(){
    this.ProductDenom.list(this.produtCategory+"&_sortby=name:1").subscribe((response :any) => {
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
