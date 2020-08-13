import { Component, OnInit } from '@angular/core';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductService } from '../../../../services/product/product.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-mulia',
  templateUrl: './mulia.component.html',
  styleUrls: ['./mulia.component.scss']
})
export class MuliaComponent implements OnInit {
  
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
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";


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
 
  
  //toast
  private toastrService: ToastrService,

  
  


  ) { }
  searchModel : any = {vendors:"Pilih Vendor", denoms: "Pilih Denom"};
  
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
    let vendor = data.vendors;
    let denom = data.denoms;
    

    const urlVendor = "vendor.code="+vendor;
    const urlDenom = "product-denom.code="+denom;

    this.params = this.category;
    if (vendor != 'all') {
      this.params = this.params+"&"+urlVendor;
    }
    if (denom != 'all'){
      this.params = this.params+"&"+urlDenom;
    }    
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
      this.mulias = response;
      this.productService.count(this.params).subscribe((response: any) => {
        this.qty = response;
        this.mulias[0].qty = this.qty.count;
        this.datamulias = this.mulias.slice(0,1);
       
      });
      
      

      this.loadingDg = false;
      
      
      
    });


    
   
      // const filteredperhiasan = this.getPerhiasan.filter(kamu =>  kamu.jenis == jenis && kamu.vendor == vendor);
    
  }
}
