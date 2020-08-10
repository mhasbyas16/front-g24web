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

  vendor = null;
  denom = null;
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
  searchModel : any = {vendors:"all", denoms: "all"};
  
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
        this.denoms.sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
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

    console.debug(denom);
    const urlVendor = "vendor.code="+vendor;
    const urlDenom = "denom.code="+denom;

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
      this.datamulias = this.mulias;
      this.toastrService.success("Load "+response["length"]+" Data", "Mulia");
      this.loadingDg = false;
      let is = 0;

      const groupBy = (array, key) => {
        // Return the end result
        return array.reduce((result, currentValue) => {
          // If an array already present for key, push it to the array. Else create an array and push the object
          (result[currentValue[key]] = result[currentValue[key]] || []).push(
            currentValue
          );
          // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
          return result;
        }, {}); // empty object is the initial value for result object
      };

      let dia = groupBy(this.mulias, "vendor.name")//
      // for (let i=0, iLen=this.mulias.length; i<iLen; i++) {

      //   if (this.mulias[i].vendor.name == "Antam") 
      //   dia = this.mulias[i].vendor.name 
      //   console.debug(dia, "ka");
      // }
      console.debug(dia, "ka");
      // let kamus = this.mulias.find(o => o.flag === 'stock')
      
      
    });


    
   
      // const filteredperhiasan = this.getPerhiasan.filter(kamu =>  kamu.jenis == jenis && kamu.vendor == vendor);
    
  }
}
