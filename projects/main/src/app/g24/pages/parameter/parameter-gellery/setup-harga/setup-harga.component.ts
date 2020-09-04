import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import {FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
//Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductCategoryService } from '../../../../services/product/product-category.service';

import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { DataTypeUtil } from '../../../../lib/helper/data-type-util';



@Component({
  selector: 'app-setup-harga',
  templateUrl: './setup-harga.component.html',
  styleUrls: ['./setup-harga.component.scss']
})
export class SetupHargaComponent implements OnInit {

  //title
  breadcrumb = "Setup Harga"
  title = "Setup Harga"
  // spinner 
  spinner = false;
 //placeholder datagrid
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  // ClrDatagrid
  loadingDg: boolean = false;
  //list
  vendors = null;
  product = null;
  perhiasan= null;
  setupHarga= null;
  nikUser= null;
  productSelect = null;
  tempProduct = null;
  //params
  params = null;
  vendorCategory= "product-category.code=c00";
  productFilter= "code=c00,c01,c02,c04";

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
    private ProductCategorySerevice: ProductCategoryService,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    //session
    private sessionService: SessionService,
    //parameter
    private prmJualService : PrmJualService,
  ) { }

  inputModel : any = {items : []};
  defaultInput(): any {
    return{
      keterangan : null, productSelect: null, harga_baku: 0, harga_buyback: 0
    }
  }

  ngOnInit(): void {
    this.onListVendor();
    this.onListCategory();
    this.onDataGrid();
    this.inputModel = this.defaultInput();
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]};
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
  //list jenis vendor 
  onListVendor(){
    this.vendorService.list("?_hash=1&"+this.vendorCategory).subscribe((response: any) => {
      if (response != false) {
        this.vendors = response;
      }      
    });
  }
  //list product category 
  onListCategory(){
    this.ProductCategorySerevice.list("?_hash=1&"+this.productFilter).subscribe((response : any) => {
      if (response != false) {
        this.product = response;
      }
    });
  }

  onDataGrid(){
    // CLR Datagrid loading
    this.loadingDg = true;

    this.params = null;
  
    this.params = "?_hash=1&product-category.code=c01,c00,c02,c04";
   
    // prmjual
    this.prmJualService.list(this.params).subscribe((response: any) => {
      if (response == false) {
        this.toastrService.error("Data Not Found", "Setup Harga");
        this.loadingDg = false;
        return;
      }  
      if (response["length"] == 0) {
        this.toastrService.error("Data Not Found", "Setup Harga");
        this.loadingDg = false;
        return;
      } 
      this.setupHarga = response;
      this.toastrService.success("Load "+response["length"]+" Data", "Setup Harga");
      this.loadingDg = false;
    }); 
  }

  // modal add 
  mainAdd() {
    this.inputModel = this.defaultInput();
    this.modalAddDialog = true;
    
    console.debug('mainAdd', this.modalAddDialog);
  }

  mainAddSubmit(){
    if(this.validateInput()) return;

    let now : Date = new Date;
    let sNow = now.toISOString().split("T");
    let time = sNow[1].split(".")[0];
      
    let setup = {
      "product-category": this.inputModel.productSelect,
      "product-category_encoded": "base64",
      "harga_buyback": this.inputModel.harga_buyback,
      "harga_baku": this.inputModel.harga_baku,
      "keterangan": this.inputModel.keterangan,
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : new Date().toISOString().split("T")[0],
      "create_time" : time,
      "flag": "submit",
    }

    this.spinner = true;
    this.prmJualService.add(setup).subscribe((response) => {
      this.spinner = false;
      this.modalAddDialog = false;
      if (response == false) {
        this.toastrService.error('Add Failed')
        return
      }
      this.setupHarga = response;
      this.toastrService.success('Add Success')
      this.onDataGrid();
    })
    console.debug('submitted data',  setup)
  }

  mainEdit(data) {
    console.debug("dataEdit", data);

    this.prmJualService.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.prmJualService.message());
      }
    });

    this.inputModel = data;
    this.tempProduct = data['product-category'];
    this.inputModel.productSelect = btoa(JSON.stringify(this.tempProduct)) ;
    this.modalEditDialog = true;
  }

  mainEditSubmit(){
    if(this.validateInput()) return;

    let now : Date = new Date;
    let sNow = now.toISOString().split("T");
    let time = sNow[1].split(".")[0];

    let setup = {
      "_id" : this.inputModel._id,
      "product-category": this.inputModel.productSelect,
      "product-category_encoded": "base64",
      "harga_buyback": parseInt(this.inputModel.harga_buyback),
      "harga_baku": parseInt(this.inputModel.harga_baku),
      "keterangan": this.inputModel.keterangan,
      "update_by" : this.nikUser["_hash"],
      "update_by_encoded" : "base64",
      "update_date" : new Date().toISOString().split("T")[0],
      "update_time" : time,
      "flag": "submit",
    }

    // let endcodeSetup = DataTypeUtil.Encode(setup);

    this.spinner = true;
    this.prmJualService.update(setup).subscribe((response) => {
      this.spinner = false;
      this.modalEditDialog = false;
      if (response == false) {
        this.toastrService.error('Edit Failed')
        return
      }
      this.setupHarga = response;
      this.toastrService.success('Edit Success')
      this.onDataGrid();
    })
    console.debug('submitted data',  setup)
  }

  mainDelete(row) {
    console.debug("dataDelete", row);

    this.inputModel = row;
    this.modalDeleteDialog = true;
  }

  mainDeleteSubmit() {
    
    let setup = {
      "_id" : this.inputModel._id,
    }

    this.spinner = true;
    this.prmJualService.delete(setup).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Delete Failed')
        return
      }
      this.spinner = false;
      this.modalDeleteDialog = false;
      this.onDataGrid();
      this.toastrService.success('Delete Success');
    })
    console.debug('submitted data',  setup)
  }

  mainConfirm(data) {
    console.debug("dataEdit", data);

    this.prmJualService.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.prmJualService.message());
      }
    });

    this.inputModel = data;
    this.tempProduct = data['product-category'];
    this.inputModel.productSelect = btoa(JSON.stringify(this.tempProduct)) ;
    this.modalConfirmDialog = true;
  }

  mainApproveSubmit(){
    if(this.validateInput()) return;

    let now : Date = new Date;
    let sNow = now.toISOString().split("T");
    let time = sNow[1].split(".")[0];

    let setup = {
      "_id" : this.inputModel._id,
      "approve_by" : this.nikUser["_hash"],
      "approve_by_encoded" : "base64",
      "approve_date" : new Date().toISOString().split("T")[0],
      "approve_time" : time,
      "flag": "approved",
    }

    // let endcodeSetup = DataTypeUtil.Encode(setup);

    this.spinner = true;
    this.prmJualService.update(setup).subscribe((response) => {
      this.spinner = false;
      this.modalConfirmDialog = false;
      if (response == false) {
        this.toastrService.error('Edit Failed')
        return
      }
      this.setupHarga = response;
      this.toastrService.success('Edit Success')
      this.onDataGrid();
    })
    console.debug('submitted data',  setup)
  }

  mainDeclineSubmit() {
    if(this.validateInput()) return;

    let now : Date = new Date;
    let sNow = now.toISOString().split("T");
    let time = sNow[1].split(".")[0];

    let setup = {
      "_id" : this.inputModel._id,
      "decline_by" : this.nikUser["_hash"],
      "decline_by_encoded" : "base64",
      "decline_date" : new Date().toISOString().split("T")[0],
      "decline_time" : time,
      "flag" : "declined",
    }
    
    this.spinner = true;
    this.prmJualService.update(setup).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Decline Failed')
        return
      }
      this.spinner = false;
      this.modalConfirmDialog = false;
      this.toastrService.success('Decline Success');
      this.onDataGrid();
    })
    console.debug('submitted data',  setup)
  }

}


