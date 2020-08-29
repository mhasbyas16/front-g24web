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
  //params
  params = null;
  vendorCategory= "product-category.code=c00";
  productFilter= "code=c00,c01";

  // dialog
  modalAddDialog: boolean = false;
  modalEditDialog: boolean = false;
  modalDeleteDialog: boolean = false;
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

  ngOnInit(): void {
    this.onListVendor();
    this.onListCategory();
    this.onDataGrid();
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]};
  }
  // modal add 
  mainAdd() {
    this.form = new FormGroup({
      product_category: new FormControl('', [Validators.required]),
      harga_beli: new FormControl('', [Validators.required]),
      harga_jual: new FormControl('', [Validators.required]),
      product_category_encoded: new FormControl('base64'),
      keterangan: new FormControl('', [Validators.required]),
      maker: new FormControl (this.nikUser["_hash"], [Validators.required]),
      maker_encoded: new FormControl("base64"),
      makerDate: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy'), Validators.required),
      makerTime: new FormControl(this.datePipe.transform(Date.now(),'h:mm:ss a'), Validators.required),
      flag: new FormControl("1"),
    });
    this.modalAddDialog = true;
    // tslint:disable-next-line:no-console
    console.debug('mainAdd', this.modalAddDialog);
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
  
    this.params = "?_hash=1&product-category.code=c01,c00";
   
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

  mainAddSubmit(){
    if (!this.form.valid) {
      this.toastrService.error('Form not complete yet', this.title);
      return;
    }
      
    let data = this.form.getRawValue();
    let setup = {
      "product-category": data.product_category,
      "product-category_encoded": data.product_category_encoded,
      "harga-buyback": data.harga_beli,
      "harga-baku": data.harga_jual,
      "keterangan": data.keterangan,
      "maker": data.maker,
      "maker_encoded": data.maker_encoded,
      "makerDate": data.makerDate,
      "makerTime": data.makerTime,
      "flag": data.flag,
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

  mainEdit(row) {
    this.form = new FormGroup({
      product_category: new FormControl('', [Validators.required]),
      harga_beli: new FormControl('', [Validators.required]),
      harga_jual: new FormControl('', [Validators.required]),
      product_category_encoded: new FormControl('base64'),
      keterangan: new FormControl('', [Validators.required]),
      maker: new FormControl (this.nikUser["_hash"], [Validators.required]),
      maker_encoded: new FormControl("base64"),
      makerDate: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy'), Validators.required),
      makerTime: new FormControl(this.datePipe.transform(Date.now(),'h:mm:ss a'), Validators.required),
      flag: new FormControl("1"),
    });

    console.debug("dataEdit", row);

    this.form.patchValue(row);
    //this.form.controls["role"].setValue(btoa(JSON.stringify(row.role)));

    this.modalEditDialog = true;
  }

  mainDelete(row) {
    this.form = new FormGroup({
      _id: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]*$/)])
    });

    this.form.patchValue(row);    
    console.debug("delete data", row);
    this.modalDeleteDialog = true;
  }

}


