import { Component, OnInit, EventEmitter, Output } from '@angular/core';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductService } from '../../../../services/product/product.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { ToastrService } from 'ngx-toastr';

import { ProductJenisService } from '../../../../services/product/product-jenis.service';
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { PrmMarginService } from '../../../../services/parameter/prm-margin.service';
import { PrmPpnService } from '../../../../services/parameter/prm-ppn.service';

//rumus harga 
import { PricingService }  from '../../../../services/pricing.service';

import { LM } from '../../../../sample/cart';



@Component({
  selector: 'app-mulia',
  templateUrl: './mulia.component.html',
  styleUrls: ['./mulia.component.scss']
})
export class MuliaComponent implements OnInit {
  @Output() data = new EventEmitter();
  @Output() logamMulia = new EventEmitter();
  @Output() totalHarga = new EventEmitter();

  vendors = null;
  jenis = null;
  denoms = null;
  loadingDg = null; 
  mulias = null;
  datamulias= null;
  tempdatamulias = null;
  vendor = null;
  denom = null;
  qty = null;
  jumlah = null;
  hargaBaku = null;
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  tampilMulia = [];
  cartList = LM;

  //category
  vendorCategory = "product-category.code=05";
  category = "?product-category.code=05";

   //params
   params = null;

  constructor(
  //app
  private vendorService: VendorService,
  private denomService: ProductDenomService,
  private productService: ProductService,
 
  //parameter
  private prmJualService : PrmJualService,
  private prmMarginService: PrmMarginService,
  private prmPpnService : PrmPpnService,

  //toast
  private toastrService: ToastrService,

  
  


  ) { }
  searchModel : any = {vendors:"pilih", denoms: "pilih"};
  
  ngOnInit(): void {
    this.onListVendor();
    this.onListDenom();
    // this.checkProduct();
  }
  onListVendor(){
    this.vendorService.list("?_hash=1&"+this.vendorCategory).subscribe((response: any) => {
      if (response != false) {
        this.vendors = response;
        this.vendors.sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        })
      }      
    });
  }

  onListDenom(){
    this.denomService.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.denoms = response;
        this.denoms.sort(function (c, d) {
          if (c.name < d.name) { return -1; }
          if (c.name > d.name) { return 1; }
          return 0;
        })
      }      
    });
  }
  // checkProduct(){
  //   this.productService.list(this.category).subscribe((response: any) => {
  //     this.mulias = response;
  //     this.datamulias = this.mulias;
  //     console.debug(this.datamulias, "wo")

  //   });  
  // }

 
  // filterVendor(wow){
    
  // }

  
  onCariMulia(data){
    this.loadingDg = true;
    let vendor = data.input_vendor_mulia;
    let denom = data.input_denom_mulia;
    let kamu = data.input_jumlah ;
    

    const urlVendor = "vendor.code="+vendor;
    const urlDenom = "product-denom.code="+denom;
    const urlQty = "_rows="+this.qty;

    this.params = this.category;
    if (vendor == "pilih" || denom == "pilih") {
      this.toastrService.error("Pilih Vendor dan Denom Terlebih Dahulu");
      this.loadingDg = false;
    } else {
        this.params = this.params+"&"+urlVendor;
        this.params = this.params+"&"+urlDenom;
        this.productService.list(this.params).subscribe((response: any) => {
          
          if (response == false) {
            this.toastrService.error("Data Not Found", "Mulia");
            this.loadingDg = false;
            return;
          }
          if (response["length"] == 0) {
            this.toastrService.error("Data Not Found", "Mulia");
            this.loadingDg = false;
            return;
          }  

          this.prmJualService.list(this.params).subscribe((Jualresponse: any) => {
            if (Jualresponse != false) {
              this.hargaBaku = Jualresponse;
            }
            console.debug(this.hargaBaku,"wow");
            this.mulias = response;
            this.productService.count(this.params).subscribe((response: any) => {
            this.qty = response;
            this.mulias[0].qty = this.qty.count;
            this.datamulias = this.mulias.slice(0,1);
            this.loadingDg = false;
          });
        });
      });
    }
      // const filteredperhiasan = this.getPerhiasan.filter(kamu =>  kamu.jenis == jenis && kamu.vendor == vendor);
  }
  
  cekItemArray(data: any){
    // const code = this.cartList.map(el => el.code);
    const code = this.cartList.map(el => el.code);
    const ARR = code.includes(data);
    return ARR;
  }

  addCart(vendor: any ,
     denom: any){
    
    this.cartList.push({
     
      'vendor': vendor, 
      
      'denom' : denom,
      
      'qty': 1});
      console.debug(this.cartList,"ISI HASH CART")

      this.logamMulia.emit(this.cartList.length);

     // this.cekItemArray(code);
  }
}
