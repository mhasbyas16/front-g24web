import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { trigger, transition, animate, style } from '@angular/animations'
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
//Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductCategoryService } from '../../../../services/product/product-category.service';
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { DataTypeUtil } from '../../../../lib/helper/data-type-util';
import { ServerDateTimeService } from "../../../../services/system/server-date-time.service";



@Component({
  selector: 'app-setup-harga',
  templateUrl: './setup-harga.component.html',
  styleUrls: ['./setup-harga.component.scss'],

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
  getDataold = null;
  getProduct = null;
  show = false;
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
  modalDetailDialog: boolean = false;
  // dialog  form
  form: FormGroup = null;
  constructor(
    //app
    private vendorService: VendorService,
    private ProductCategorySerevice: ProductCategoryService,
    private toastrService: ToastrService,
    private datePipe: DatePipe,
    private dateServices: ServerDateTimeService,
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

  onChangeProduct(data){
    this.getProduct = data;
    if (this.getProduct == 'c01') {
      this.show = true;
    }else{
      this.show = false;
    }
  }

  onDataGrid(data){
    // CLR Datagrid loading
    this.loadingDg = true;

    this.params = "?_ne=flag:expired&_hash=1&product-category.code=c00,c01,c02,c03,c04&_sortby=_id:2";
    let prod = data.inputProduct;
  
    const urlProduct = "?_ne=flag:expired&_sortby=_id:2&_hash=1&product-category.code="+prod;

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
      this.setupHarga = response;
      this.toastrService.success("Load "+response["length"]+" Data", "Setup Harga");
      this.loadingDg = false;
    }); 
  }

  onDataGridDefault(){
    // CLR Datagrid loading
    this.loadingDg = true;

    this.params = "?_ne=flag:expired&_hash=1&product-category.code=c00,c01,c02,c03,c04&_sortby=_id:2";
   
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

    let hbk = this.inputModel.harga_baku;
    let hbb = this.inputModel.harga_buyback;

    if(hbb >= hbk){
      this.toastrService.warning("Harga Buyback tidak boleh besar atau sama dengan harga baku");
      return
    }
    
    //mencari product berdasarkan id
    for (let i of this.product){
      if(this.inputModel.productSelect == i.code){
        this.findProduct = btoa(JSON.stringify(i));
      }
    }

    let setup = {
      "product-category": this.findProduct,
      "product-category_encoded": "base64",
      "harga_buyback": this.inputModel.harga_buyback,
      "harga_buyback_encoded": "int",
      "harga_baku": this.inputModel.harga_baku,
      "harga_baku_encoded": "int",
      "keterangan": this.inputModel.keterangan,
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : this.date_now,
      "create_time" : this.time,
      "flag": "submit",
    }

    let setup1 = {
      "product-category": this.findProduct,
      "product-category_encoded": "base64",
      "harga_buyback": this.inputModel.harga_buyback,
      "harga_buyback_encoded": "int",
      "harga_baku": this.inputModel.harga_baku,
      "harga_baku_encoded": "int",
      "potongan_bb_batu": this.inputModel.potongan_batu,
      "potongan_bb_batu_encoded": "double",
      "potongan_bb_berlian": this.inputModel.potongan_berlian,
      "potongan_bb_berlian_encoded": "double",
      "potongan_ongkos": this.inputModel.potongan_ongkos,
      "potongan_ongkos_encoded": "double",
      "keterangan": this.inputModel.keterangan,
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : this.date_now,
      "create_time" : this.time,
      "flag": "submit",
    }

    let tempSetup = null;
    if (this.inputModel.productSelect == 'c01'){
      tempSetup = setup1;
    }else{
      tempSetup = setup;
    }

    this.spinner = true;
    this.prmJualService.add(tempSetup).subscribe((response) => {
      this.spinner = false;
      this.modalAddDialog = false;
      this.onDataGridDefault();
      if (response == false) {
        this.toastrService.error('Add Failed')
        return
      }
      this.toastrService.success('Add Success')
    })
    console.debug('submitted data',  tempSetup)
  }

  mainDetail(data) {
    console.debug("dataConfirm", data);

    this.prmJualService.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.prmJualService.message());
      }
    });

    this.inputModel = data;
    this.inputModel.productSelect = data['product-category'].name;
    this.inputModel.productS = data['product-category'].code;
    this.onChangeProduct(this.inputModel.productS);
    this.inputModel.potongan_batu = data.potongan_bb_batu;
    this.inputModel.potongan_berlian = data.potongan_bb_berlian;
    this.inputModel.potongan_ongkos = data.potongan_ongkos;
    this.inputModel.harga_buyback = data.harga_buyback;
    this.inputModel.harga_baku = data.harga_baku;
    this.inputModel.keterangnan = data.keterangan;
    this.modalDetailDialog = true;
  }

  mainConfirm(data) {
    console.debug("dataConfirm", data);

    this.prmJualService.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.prmJualService.message());
      }
    });

    this.inputModel = this.defaultInput();
    this.inputModel = data;
    this.inputModel.productSelect = data['product-category'].name;
    this.inputModel.productS = data['product-category'].code;
    this.onChangeProduct(this.inputModel.productS);
    if (this.inputModel.productS == 'c01') {
      this.inputModel.potongan_batu = data.potongan_bb_batu;
      this.inputModel.potongan_berlian = data.potongan_bb_berlian;
      this.inputModel.potongan_ongkos = data.potongan_ongkos;
    }
    this.modalConfirmDialog = true;
  }

  mainApproveSubmit(){
    if(this.validateInput()) return;

    let setup = {
      "_id" : this.inputModel._id,
      "harga_buyback": this.inputModel.harga_buyback,
      "harga_buyback_encoded": "int",
      "harga_baku": this.inputModel.harga_baku,
      "harga_baku_encoded": "int",
      "keterangan": this.inputModel.keterangan,
      "approve_by" : this.nikUser["_hash"],
      "approve_by_encoded" : "base64",
      "approve_date" : this.date_now,
      "approve_time" : this.time,
      "flag": "approved",
    }

    let setup1 = {
      "_id" : this.inputModel._id,
      "harga_buyback": this.inputModel.harga_buyback,
      "harga_buyback_encoded": "int",
      "harga_baku": this.inputModel.harga_baku,
      "harga_baku_encoded": "int",
      "potongan_bb_batu": this.inputModel.potongan_batu,
      "potongan_bb_batu_encoded": "int",
      "potongan_bb_berlian": this.inputModel.potongan_berlian,
      "potongan_bb_berlian_encoded": "int",
      "potongan_ongkos": this.inputModel.potongan_ongkos,
      "potongan_ongkos_encoded": "int",
      "keterangan": this.inputModel.keterangan,
      "approve_by" : this.nikUser["_hash"],
      "approve_by_encoded" : "base64",
      "approve_date" : this.date_now,
      "approve_time" : this.time,
      "flag": "approved",
    }

    let tempSetup = null;
    if (this.inputModel.productSelect == 'c01'){
      tempSetup = setup1;
    }else{
      tempSetup = setup;
    }

    //get data approve lama
    this.spinner = true;
    this.prmJualService.get("?flag=approved&product-category.code="+this.inputModel.productS).subscribe((out) => {
      this.getDataold = out._id;

      if (out == false){
        this.prmJualService.update(tempSetup).subscribe((response1) => {
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
          this.prmJualService.update(tempSetup).subscribe((response1) => {
            if (response1 == false) {
              this.toastrService.error('Approved Failed')
              return
            }
            this.spinner = false;
            this.modalConfirmDialog = false;
            this.onDataGridDefault();
            this.toastrService.success('Approved Success')
          })
        })
        console.debug('submitted data',  setup)
        console.debug('submitted data',  histori)
      }
    })
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
      this.onDataGridDefault();
      this.toastrService.success('Decline Success');
    })
    console.debug('submitted data',  setup)
  }

}


