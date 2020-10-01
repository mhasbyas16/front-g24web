import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Select2OptionData  } from "ng-select2";
import { Options } from "select2";
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
//Database
import { ChannelService } from '../../../../services/channel.service';
import { TransactionTypeService } from '../../../../services/transaction/transaction-type.service';
import { ProductCategoryService } from '../../../../services/product/product-category.service';
import { VendorService } from '../../../../services/vendor.service';
import { PrmMarginService } from '../../../../services/parameter/prm-margin.service';

import { DataTypeUtil } from '../../../../lib/helper/data-type-util';

@Component({
  selector: 'app-setup-margin',
  templateUrl: './setup-margin.component.html',
  styleUrls: ['./setup-margin.component.scss']
})
export class SetupMarginComponent implements OnInit {
  //title
  breadcrumb = "Parameter"
  title = "Setup Logam Mulia"
  // spinner 
  spinner = false;
  //placeholder datagrid
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  // ClrDatagrid
  loadingDg: boolean = false;
  dataMargin = null;
  //list
  margin = null;
  productCat = null;
  transactionType= null;
  datalist = null;
  nikUser = null;
  params = null;
  filterVendorProd = null;
  // listVendor = null;
  getProduct= null;

  // vendorCategory= "product-category.code=c05";
  // category = "?_hash=1&product-category.code=c05";
  // produtCategory = "?_hash=1&product-category.code=c05";

  // dialog
  modalAddDialog: boolean = false;
  modalEditDialog: boolean = false;
  modalDeleteDialog: boolean = false;
  modalConfirmDialog: boolean = false;
  // select2
  listVendor : Array<Select2OptionData>;
  public options:Options;

  constructor(
    //service
    private channelService: ChannelService,
    private transactionTypeService : TransactionTypeService,
    private vendorService: VendorService,
    private prmMarginService: PrmMarginService,
    private productCategoryService: ProductCategoryService,

    private toastrService: ToastrService,
    //session
    private sessionService: SessionService,
  ) { }
  
  searchModel : any = {margin:"all", productCat: "all", transaction: "all"};
  vendors : any[] = [];
  channel : any[] = [];
  inputModel : any = {items : []};
  defaultInput(): any {
    return{
     channel: null ,keterangan : null, product_category: null,
     transaction_type : null, margin: 0
    }
  }

  ngOnInit(): void {
    this.inputModel = this.defaultInput();
    this.onListTrasaction();
    this.onListProductCategory();
    this.loadChannel();
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]};

    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false,
      width: '200',
    };
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

  onListTrasaction(){
    this.transactionTypeService.list("?_hash=1&").subscribe((output: any) => {
      if (output != false) {
        this.transactionType = output;
      }      
    });
  }

  onListProductCategory(){
    this.productCategoryService.list("?_hash=1&_sortby=name:2").subscribe((output: any) => {
      if (output != false) {
        this.productCat = output;
      }      
    });
  }

  onChangeProduct(data){
    let prod = JSON.parse(atob(data));
    if (prod == null) {
      this.toastrService.error(this.productCategoryService.message());
      return;
    } else {
      this.getProduct = prod.code;
      this.loadVendor();
    }
    console.debug(this.getProduct);
  }

  async loadVendor(){
    let vendors = await this.vendorService.list("?_hash=1&product-category.code="+this.getProduct).toPromise();
    for (let i = 0; i < vendors.length; i++) {
      this.vendors.push({id:vendors[i]._hash,text:vendors[i].name});
    }
    setTimeout(() => {
      this.listVendor = this.vendors;
    });
    console.log(this.listVendor);
  }

  async loadChannel(){
    let channel = await this.channelService.list("?_hash").toPromise();
    for (let i = 0; i < channel.length; i++) {
      this.channel.push(channel[i]);
    }
    this.channel.sort((a,b) => (''+ a.name).localeCompare(b.name));
    console.log(this.channel);
  }

  onCariMargin(data){
    // CLR Datagrid loading
    this.loadingDg = true;

    this.params = null;
    let transaction = data.input_transaction;
    let product = data.input_product;
  
    const urlTransaction = "transaction-type.code="+transaction;
    const urlProduct = "product-category.code="+product;
    
    // Session
    const getUnit = this.sessionService.getUnit();
    console.debug(getUnit + "Ini Unit");
    // this.params = this.params+"&unit.code="+getUnit["code"];
    this.params = this.params;

    if (transaction != 'all') {
      this.params = this.params+"&"+urlTransaction;
    }
    if (product != 'all') {
      this.params = this.params+"&"+urlProduct;
    }
   
    // prmMargin
    this.prmMarginService.list(this.params).subscribe((response: any) => {
      if (response == false) {
        this.toastrService.error("Data Not Found", "Setup Margin");
        this.loadingDg = false;
        return;
      }  
      if (response["length"] == 0) {
        this.toastrService.error("Data Not Found", "Setup Margin");
        this.loadingDg = false;
        return;
      } 
      this.dataMargin = response;
      this.toastrService.success("Load "+response["length"]+" Data", "Setup Margin");
      this.loadingDg = false;
    }); 
  }

  mainAdd(){
    this.inputModel = this.defaultInput();
    this.modalAddDialog = true;
  }
  mainAddSubmit(){
    if(this.validateInput()) return;

    let now : Date = new Date;
    let sNow = now.toISOString().split("T");
    let time = sNow[1].split(".")[0];

    let margin = {
      "channel" : this.inputModel.channel,
      "product-category" : this.inputModel.product_category,
      "product-category_encoded" : "base64",
      "transaction-type" : this.inputModel.transaction_type,
      "transaction-type_encoded" : "base64",
      "margin" : this.inputModel.margin,
      "vendor" : this.inputModel.selectVendor,
      "vendor_encoded" : "base64array",
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : new Date().toISOString().split("T")[0],
      "create_time" : time,
      "flag" : "submit",
      "keterangan" : this.inputModel.keterangan,
    }

    this.spinner = true;
    this.prmMarginService.add(margin).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Add Failed')
        return
      }
      this.spinner = false;
      this.modalAddDialog = false;
      this.toastrService.success('Add Success')
    })
    console.log("submitted data",margin);
  }
  mainEdit(data){}
  mainDelete(data){}

}
