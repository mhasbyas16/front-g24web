import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { FormGroup } from '@angular/forms';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DatePipe } from '@angular/common';
//Database
import { ChannelService } from '../../../../services/channel.service';
import { TransactionTypeService } from '../../../../services/transaction/transaction-type.service';
import { ProductCategoryService } from '../../../../services/product/product-category.service';
import { VendorService } from '../../../../services/vendor.service';
import { PrmMarginService } from '../../../../services/parameter/prm-margin.service';

import { DataTypeUtil } from '../../../../lib/helper/data-type-util';

export interface channel {
  id: number;
  name: string;
}
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
  listVendor = null;
  getProduct= null;

  // vendorCategory= "product-category.code=c05";
  // category = "?_hash=1&product-category.code=c05";
  // produtCategory = "?_hash=1&product-category.code=c05";

  // dialog
  modalAddDialog: boolean = false;
  modalEditDialog: boolean = false;
  modalDeleteDialog: boolean = false;
  modalConfirmDialog: boolean = false;
  // dialog  form
  form: FormGroup = null;

  constructor(
    //app
    private channelService: ChannelService,
    private transactionTypeService : TransactionTypeService,
    private vendorService: VendorService,
    private prmMarginService: PrmMarginService,
    private productCategoryService: ProductCategoryService,

    private toastrService: ToastrService,
    //session
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    this.onListTrasaction();
    this.onListProductCategory();
  }

  searchModel : any = {margin:"all", productCat: "all", transaction: "all"};

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
      this.onListVedor();
    }
    console.debug(this.getProduct);
  }

  onListVedor(){
    // this.filterVendorProd = this.getProduct;
    this.vendorService.list("?_hash=1&product-category.code="+this.getProduct).subscribe((output: any) => {
      if (output != false) {
        this.listVendor = output;
        console.debug(this.listVendor);
      }      
    });
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
    this.modalAddDialog = true;
  }
  mainAddSubmit(data){}
  mainEdit(data){}
  mainDelete(data){}

}
