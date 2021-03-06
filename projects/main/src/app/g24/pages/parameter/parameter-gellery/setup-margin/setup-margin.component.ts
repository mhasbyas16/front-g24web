import { Component, OnInit, Output } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { trigger, transition, animate, style } from '@angular/animations'
import { FormGroup } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
//select2
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
import { ServerDateTimeService } from "../../../../services/system/server-date-time.service";
import { DataTypeUtil } from '../../../../lib/helper/data-type-util';

@Component({
  selector: 'app-setup-margin',
  templateUrl: './setup-margin.component.html',
  styleUrls: ['./setup-margin.component.scss'],

  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('500ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class SetupMarginComponent implements OnInit {
  //title
  breadcrumb = "Parameter"
  title = "Setup Margin"
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
  tempVendor = null;
  getProduct= null;
  getTransaction = null;
  show = false;
  showlm = false;
  allVendor = null;
  myRole = null;
  getDataold = null;

  //datetime
  timezone = "string";
  date_now = "string";
  time = "string";
  // dialog
  modalAddDialog: boolean = false;
  modalEditDialog: boolean = false;
  modalDeleteDialog: boolean = false;
  modalConfirmDialog: boolean = false;
  modalDetailDialog: boolean = false;
  // select2
  listVendor : Array<Select2OptionData>;
  vendorSelected: Array<any> = [];
  vendors: any[] = [];
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
    private dateServices: ServerDateTimeService,
  ) { }
  
  searchModel : any = {margin:"all", productCat: "all", transaction: "all"};
  channel: any[] = [];
  ven: any[] = [];
  inputModel : any = {items : []};
  defaultInput(): any {
    return{
      mychannel: null ,keterangan : null, product_category: null,
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
    // this.options = {
    //   multiple: true,
    //   closeOnSelect: false,
    //   width: '200',
    //   placeholder: 'Please Select the Product Category First'
    // };
  }

  muter(){
    this.loadingDg = true
  }

  validateInput(){
    for(let key in this.inputModel)
    {
      let value = this.inputModel[key];
      // console.log(value, key, 'key')
      if(value == null || value == "null" || value == 0 || (typeof value === 'number' && value === 0))
      {
        this.toastrService.warning("Field belum diisi / sama dengan 0 ");
        return true
      }
    }
    return false
  }

  onListTrasaction(){
    this.transactionTypeService.list().subscribe((output: any) => {
      if (output != false) {
        this.transactionType = output;
      }      
    });
  }

  onListProductCategory(){
    this.productCategoryService.list("?_sortby=name:1").subscribe((output: any) => {
      if (output != false) {
        this.productCat = output;
      }      
    });
  }

  onChangeProduct(data){
    this.getProduct = data;
    if (data == 'c01' || data == 'c03') {
      this.show = true;
      this.showlm = false;
    }else if (this.getProduct == 'c05' && this.getTransaction == 't06'){
      this.showlm = true;
      this.show = false;
    }else{
      this.show = false;
      this.showlm = false;
    }
    // if (data == null) {
    //   this.toastrService.error(this.productCategoryService.message());
    //   return;
    // } else {
    //   this.getProduct = data;
    //   this.loadVendors();
    // }
  }

  onChangeTransaction(data){
    this.getTransaction = data;
    if (this.getProduct == 'c05' && data == 't06') {
      this.showlm = true;
    }else{
      this.showlm = false;
    }
  }

  loadVendors(){
    this.vendorService.list("?product-category._id="+this.getProduct).subscribe(output => {
      if (output == false) {
        this.toastrService.error("Vendor not found")
      }
      this.allVendor = output

      let vd =[]
      for(let data of output){
        vd.push({id:data._id,text:data.name});
      }
      this.listVendor = vd;
      console.log('listVendor',this.listVendor);
    })
  }

  async loadChannel(){
    let channel = await this.channelService.list("").toPromise();
    for (let i = 0; i < channel.length; i++) {
      this.channel.push(channel[i]);
    }
    this.channel.sort((a,b) => (''+ a.name).localeCompare(b.name));
    console.log(this.channel);
  }

  onCariMargin(data){
    // CLR Datagrid loading
    this.loadingDg = true;

    this.params = "?&_sortby=_id:2&_ne=flag:expired";
    let transaction = data.input_transaction;
    let product = data.input_product;
  
    const urlTransaction = "&_ne=flag:expired&transaction-type.code="+transaction;
    const urlProduct = "&_ne=flag:expired&product-category.code="+product;

    if (transaction != 'all') {
      this.params = this.params+urlTransaction;
    }
    if (product != 'all') {
      this.params = this.params+urlProduct;
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

  onCariMarginDefault(){
    // CLR Datagrid loading
    this.loadingDg = true;

    this.params = "?&_sortby=_id:2&_ne=flag:expired";

   
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

  //modalAdd
  mainAdd(){
    this.inputModel = this.defaultInput();
    this.modalAddDialog = true;
  }
  //saveAdd
  mainAddSubmit(){
    if(this.validateInput()) return;

    //get data channel
    let ch = null;
    for(let i of this.channel){
      if (this.inputModel.mychannel == i.code) {
        ch = btoa(JSON.stringify(i));
      }
    }
    //get product
    let prod = null;
    for(let i of this.productCat){
      if (this.inputModel.product_category == i.code) {
        prod = btoa(JSON.stringify(i));
      }
    }

    let trans = null;
    for(let i of this.transactionType){
      if (this.inputModel.transaction_type == i.code) {
        trans = btoa(JSON.stringify(i));
      }
    }

    //get data vendor array
    // for(let i of this.allVendor){
    //   for(let j of this.inputModel.selectVendor){
    //     if (j == i._id) {
    //       this.ven.push(i);
    //     }
    //   }
    // }
      
    let margin = {
      "channel" : ch,
      "channel_encoded" : "base64",
      "product-category" : prod,
      "product-category_encoded" : "base64",
      "transaction-type" : trans,
      "transaction-type_encoded" : "base64",
      "margin" : this.inputModel.margin,
      "margin_encoded": "double",
      // "vendor" : btoa(JSON.stringify(this.ven)),
      // "vendor_encoded" : "base64array",
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : this.date_now,
      "create_time" : this.time,
      "flag" : "submit",
      "keterangan" : this.inputModel.keterangan,
    }

    let margin1 = {
      "channel" : ch,
      "channel_encoded" : "base64",
      "product-category" : prod,
      "product-category_encoded" : "base64",
      "transaction-type" : trans,
      "transaction-type_encoded" : "base64",
      "margin" : this.inputModel.margin,
      "margin_encoded": "double",
      "margin_batu" : this.inputModel.margin_batu,
      "margin_batu_encoded": "double",
      "margin_berlian" : this.inputModel.margin_berlian,
      "margin_berlian_encoded": "double",
      // "vendor" : btoa(JSON.stringify(this.ven)),
      // "vendor_encoded" : "base64array",
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : this.date_now,
      "create_time" : this.time,
      "flag" : "submit",
      "keterangan" : this.inputModel.keterangan,
    }

    let margin2 = {
      "channel" : ch,
      "channel_encoded" : "base64",
      "product-category" : prod,
      "product-category_encoded" : "base64",
      "transaction-type" : trans,
      "transaction-type_encoded" : "base64",
      "margin" : this.inputModel.margin,
      "margin_encoded": "double",
      "periode" : this.inputModel.periode,
      "periode_encoded": "double",
      // "vendor" : btoa(JSON.stringify(this.ven)),
      // "vendor_encoded" : "base64array",
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : this.date_now,
      "create_time" : this.time,
      "flag" : "submit",
      "keterangan" : this.inputModel.keterangan,
    }

    let tempSave = null;
    if (this.getProduct == 'c01' || this.getProduct == 'c03'){
      tempSave = margin1;
    } else if (this.getProduct == 'c05' && this.getTransaction == 't06'){
      tempSave = margin2;
    } else {
      tempSave = margin;
    }
    
    this.spinner = true;
    this.prmMarginService.add(tempSave).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Add Failed')
        return
      }
      this.spinner = false;
      this.modalAddDialog = false;
      this.onCariMarginDefault();
      this.toastrService.success('Add Success')
    });
    console.log("submitted data", tempSave);
  }
  

  mainDetail(data){
    console.debug("dataDetail", data);

    this.prmMarginService.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.prmMarginService.message());
      }
    });

    this.inputModel = data;
    this.inputModel.product_category = data['product-category'].name;
    this.inputModel.product = data['product-category'].code;
    this.onChangeProduct(this.inputModel.product);
    this.getProduct = this.inputModel.product;
    this.onChangeTransaction(data['transaction-type'].code);
    this.inputModel.transaction_type = data['transaction-type'].name;
    this.inputModel.mychannel = data.channel.name;
    this.inputModel.keterangan = data.keterangan;

    this.modalDetailDialog = true;
  }

  mainConfirm(data){
    console.debug("dataConfirm", data);

    this.prmMarginService.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.prmMarginService.message());
      }
    });

    this.inputModel = data;
    this.inputModel.product_category = data['product-category'].code;
    this.onChangeProduct(this.inputModel.product_category);
    this.inputModel.transaction_type = data['transaction-type'].code;
    this.inputModel.mychannel = data.channel.code;

    // let productSelect = data['product-category']._id;
    // this.getProduct = productSelect;

    // this.vendorService.list("?product-category._id="+this.getProduct).subscribe(output =>{
    //   let vd =[]
    //   for(let data of output){
    //     vd.push({id:data._id,text:data.name});
    //   }
    //   this.listVendor = vd;
    //   console.log('listVendor',this.listVendor);
    // });
    // this.tempVendor = data.vendor;
    // let myselect= [];
    // let Selected= [];

    // for (let vs of this.tempVendor){
    //   myselect.push(vs._id);
    // }

    // Selected = myselect

    // for (let i = 0; i < myselect.length; i++) {
    //   this.vendorSelected.push(myselect);
    // }
    // this.inputModel.selectVendor =  Selected;
    // console.log('vselected',this.inputModel.selectVendor)

    this.modalConfirmDialog = true;
  }

  //submitapprove
  mainApproveSubmit() {
    if(this.validateInput()) return;
      
    let margin = {
      "_id" : this.inputModel._id,
      "margin" : parseFloat(this.inputModel.margin),
      "margin_encoded": "double",
      "keterangan" : this.inputModel.keterangan,
      "approve_by" : this.nikUser["_hash"],
      "approve_by_encoded" : "base64",
      "approve_date" : this.date_now,
      "approve_time" : this.time,
      "flag" : "approved",
    }

    let margin1 = {
      "_id" : this.inputModel._id,
      "margin" : parseFloat(this.inputModel.margin),
      "margin_encoded": "double",
      "margin_batu" : parseFloat(this.inputModel.margin_batu),
      "margin_batu_encoded": "double",
      "margin_berlian" : parseFloat(this.inputModel.margin_berlian),
      "margin_berlian_encoded": "double",
      "keterangan" : this.inputModel.keterangan,
      "approve_by" : this.nikUser["_hash"],
      "approve_by_encoded" : "base64",
      "approve_date" : this.date_now,
      "approve_time" : this.time,
      "flag" : "approved",
    }

    let tempSave = null;
    if (this.getProduct == 'c01' || this.getProduct == 'c03'){
      tempSave = margin1;
    } else {
      tempSave = margin;
    }

    //get data approve lama
    this.spinner = true;
    this.prmMarginService.get("?flag=approved&product-category.code="+this.inputModel.product_category+"&channel.code="+this.inputModel.mychannel+"&transaction-type.code="+this.inputModel.transaction_type).subscribe((out) => {
      this.getDataold = out._id;

      if (out == false){
        this.prmMarginService.update(tempSave).subscribe((response1) => {
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
        this.prmMarginService.update(histori).subscribe((response) => {
          if (response == false) {
            this.toastrService.error('Update Existing Failed')
            return
          }
          this.prmMarginService.update(tempSave).subscribe((response1) => {
            if (response1 == false) {
              this.toastrService.error('Approved Failed')
              return
            }
            this.spinner = false;
            this.modalConfirmDialog = false;
            this.onCariMarginDefault();
            this.toastrService.success('Approved Success')
          })
        })
        console.debug('submitted data',  tempSave)
        console.debug('submitted data',  histori)
      }
    })
  }

  mainDeclineSubmit() {
    if(this.validateInput()) return;

    let margin = {
      "_id" : this.inputModel._id,
      "margin" : parseInt(this.inputModel.margin),
      "margin_encoded": "int",
      "keterangan" : this.inputModel.keterangan,
      "decline_by" : this.nikUser["_hash"],
      "decline_by_encoded" : "base64",
      "decline_date" : this.date_now,
      "decline_time" : this.time,
      "flag" : "declined",
    }

    let margin1 = {
      "_id" : this.inputModel._id,
      "margin" : parseInt(this.inputModel.margin),
      "margin_encoded": "int",
      "margin_batu" : parseInt(this.inputModel.margin_batu),
      "margin_batu_encoded": "int",
      "margin_berlian" : parseInt(this.inputModel.margin_berlian),
      "margin_berlian_encoded": "int",
      "keterangan" : this.inputModel.keterangan,
      "decline_by" : this.nikUser["_hash"],
      "decline_by_encoded" : "base64",
      "decline_date" : this.date_now,
      "decline_time" : this.time,
      "flag" : "declined",
    }

    let tempSave = null;
    if (this.getProduct == 'c01' || this.getProduct == 'c03'){
      tempSave = margin1;
    } else {
      tempSave = margin;
    }
    
    this.spinner = true;
    this.prmMarginService.update(tempSave).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Declined Failed')
        return
      }
      this.spinner = false;
      this.modalConfirmDialog = false;
      this.onCariMarginDefault();
      this.toastrService.success('Declined Success')
    });
    console.log("submitted data", tempSave);
  }
}
