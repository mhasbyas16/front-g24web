import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import {FormGroup, Validators, FormControl } from '@angular/forms';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
//Database
import { VendorService } from '../../../services/vendor.service';
import { ProductJenisService } from '../../../services/product/product-jenis.service';


import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';

@Component({
  selector: 'app-parameter-gellery',
  templateUrl: './parameter-gellery.component.html',
  styleUrls: ['./parameter-gellery.component.scss']
})

@DContent(ParameterGelleryComponent.key)
export class ParameterGelleryComponent implements OnInit {

   //title
   breadcrumb = "Parameter"
   title = "Parameter Data"
   // spinner 
   spinner = false;
  //placeholder datagrid
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  // ClrDatagrid
  loadingDg: boolean = false;
  //list
  vendors = null;
  jenis = null;
  perhiasan= null;
  //params
  params = null;
  vendorCategory= "product-category.code=c00";

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
    private productJenisService: ProductJenisService,

    private toastr: ToastrService,
  ) { }

  searchModel : any = {vendors:"all", jenisperhiasan: "all"};

  ngOnInit(): void {
    this.onListVendor();
    this.onListJenis();
  }

   // modal add 
   mainAdd() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.pattern(/^[a-zA-Z]*$/)]),
      name_validation: new FormControl('unique:name')
    });
    this.modalAddDialog = true;
    // tslint:disable-next-line:no-console
    console.debug('mainAdd', this.modalAddDialog);
  }

  onListVendor(){
    this.vendorService.list("?_hash=1&"+this.vendorCategory).subscribe((response: any) => {
      if (response != false) {
        this.vendors = response;
      }      
    });
  }
  onListJenis(){
    this.productJenisService.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.jenis = response;
      }      
    });
  }

    

}
