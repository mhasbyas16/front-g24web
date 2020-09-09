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
import { DateService } from "../../../../services/system/date.service";



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
  findProduct = null;
  myRole = null;
  //params
  params = null;
  vendorCategory= "product-category.code=c00";
  productFilter= "code=c00,c01,c02,c03,c04&_sortby=name:1";

  //datetime
  timezone = "string";
  date_now = "string";
  time = "string";
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
    private dateServices: DateService,
    //session
    private sessionService: SessionService,
    //parameter
    private prmJualService : PrmJualService,
  ) { }

  searchModel : any = {product:"all"};

  inputModel : any = {items : []};
  defaultInput(): any {
    return{
      keterangan : null, productSelect: null, harga_baku: 0, harga_buyback: 0
    }
  }

  ngOnInit(): void {
    this.onListCategory();
    this.inputModel = this.defaultInput();
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
    this.loadingDg = true;
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

  

  //list product category 
  onListCategory(){
    this.ProductCategorySerevice.list("?"+this.productFilter).subscribe((response : any) => {
      if (response != false) {
        this.product = response;
      }
    });
  }

  onDataGrid(data){
    // CLR Datagrid loading
    this.loadingDg = true;

    this.params = "?_hash=1&product-category.code=c00,c01,c02,c03,c04&_sortby=_id:2";
    let prod = data.inputProduct;
  
    const urlProduct = "?_sortby=_id:2&_hash=1&product-category.code="+prod;

    if (prod != 'all') {
      this.params = urlProduct;
    }
   
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
    //mencari product berdasarkan id
    for (let i of this.product){
      if(this.inputModel.productSelect == i._id){
        this.findProduct = btoa(JSON.stringify(i));
      }
    }

    let setup = {
      "product-category": this.findProduct,
      "product-category_encoded": "base64",
      "harga_buyback": parseInt(this.inputModel.harga_buyback),
      "harga_buyback_encoded": "int",
      "harga_baku": parseInt(this.inputModel.harga_baku),
      "harga_baku_encoded": "int",
      "keterangan": this.inputModel.keterangan,
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : this.date_now,
      "create_time" : this.time,
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
      this.toastrService.success('Add Success')
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
    this.inputModel.productSelect = data['product-category']._id;
    this.modalEditDialog = true;
  }

  mainEditSubmit(){
    if(this.validateInput()) return;

    let now : Date = new Date;
    let sNow = now.toISOString().split("T");
    let time = sNow[1].split(".")[0];

    // this.dateServices.task().subcribe(output => {
      
    // });
    // console.log('jam',this.dateServices.task());



    let setup = {
      "_id" : this.inputModel._id,
      "product-category": this.inputModel.productSelect,
      "product-category_encoded": "base64",
      "harga_buyback": parseInt(this.inputModel.harga_buyback),
      "harga_buyback_encoded": "int",
      "harga_baku": parseInt(this.inputModel.harga_baku),
      "harga_baku_encoded": "int",
      "keterangan": this.inputModel.keterangan,
      "update_by" : this.nikUser["_hash"],
      "update_by_encoded" : "base64",
      "update_date" : new Date().toISOString().split("T")[0],
      "update_time" : time,
      "flag": "submit",
    }

    // let endcodeSetup = DataTypeUtil.Encode(setup);
    return;
    this.spinner = true;
    this.prmJualService.update(setup).subscribe((response) => {
      this.spinner = false;
      this.modalEditDialog = false;
      if (response == false) {
        this.toastrService.error('Edit Failed')
        return
      }
      this.toastrService.success('Edit Success')
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
      this.toastrService.success('Delete Success');
    })
    console.debug('submitted data',  setup)
  }

  mainConfirm(data) {
    console.debug("dataConfirm", data);

    this.prmJualService.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.prmJualService.message());
      }
    });

    this.inputModel = data;
    this.inputModel.productSelect = data['product-category']._id;
    this.modalConfirmDialog = true;
  }

  mainApproveSubmit(){
    if(this.validateInput()) return;

    let setup = {
      "_id" : this.inputModel._id,
      "harga_buyback": parseInt(this.inputModel.harga_buyback),
      "harga_buyback_encoded": "int",
      "harga_baku": parseInt(this.inputModel.harga_baku),
      "harga_baku_encoded": "int",
      "keterangan": this.inputModel.keterangan,
      "approve_by" : this.nikUser["_hash"],
      "approve_by_encoded" : "base64",
      "approve_date" : this.date_now,
      "approve_time" : this.time,
      "flag": "approved",
    }

    // let endcodeSetup = DataTypeUtil.Encode(setup);

    this.spinner = true;
    this.prmJualService.update(setup).subscribe((response) => {
      this.spinner = false;
      this.modalConfirmDialog = false;
      if (response == false) {
        this.toastrService.error('Approved Failed')
        return
      }
      this.toastrService.success('Approved Success')
    })
    console.debug('submitted data',  setup)
  }

  mainDeclineSubmit() {
    if(this.validateInput()) return;

    let setup = {
      "_id" : this.inputModel._id,
      "harga_buyback": parseInt(this.inputModel.harga_buyback),
      "harga_buyback_encoded": "int",
      "harga_baku": parseInt(this.inputModel.harga_baku),
      "harga_baku_encoded": "int",
      "keterangan": this.inputModel.keterangan,
      "decline_by" : this.nikUser["_hash"],
      "decline_by_encoded" : "base64",
      "decline_date" : this.date_now,
      "decline_time" : this.time,
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
    })
    console.debug('submitted data',  setup)
  }

}


