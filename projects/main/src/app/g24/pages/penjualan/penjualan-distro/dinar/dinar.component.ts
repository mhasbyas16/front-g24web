import { Component, OnInit } from '@angular/core';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductService } from '../../../../services/product/product.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { ToastrService } from 'ngx-toastr';

// prm
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { PrmMarginService } from '../../../../services/parameter/prm-margin.service';

//rumus harga 
import { PricingService }  from '../../../../services/pricing.service';

import { DINAR } from '../../../../sample/cart';
import { CountCartService } from '../../../../services/count-cart.service';

@Component({
  selector: 'app-dinar',
  templateUrl: './dinar.component.html',
  styleUrls: ['./dinar.component.scss']
})
export class DinarComponent implements OnInit {

  //global declaration
  vendors = null;
  jenis = null;
  denoms = null;
  flags = null;
  loadingDg = null; 
  dinars = null;
  datadinars= null;
  tempdatamulias = null;
  vendor = null;
  denom = null;
  flag = null;
  qty = null;
  jumlah = null;
  hargaBaku = null;
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  tampilMulia = [];
  cartList = DINAR;
  jumlahLM : number ;
  total = 0;
  selected: any[] = [];

  //category
  vendorCategory = "product-category.code=c06";
  category = "?_hash&product-category.code=c06";

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
    
    //toast
    private toastrService: ToastrService,

    //count cart
    private countService: CountCartService,
    
    //pricing 
    private pricingService: PricingService,

  ) { }
  //model
  searchModel : any = {vendors:"pilih", denoms: "pilih", flags: "pilih"};

  ngOnInit(): void {
    this.onListDenom();
  }

  onListDenom(){
    this.denomService.list(this.category).subscribe((response: any) => {
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
  onCariDinar(data){
    this.loadingDg = true;
    this.loadingDg = false;
    let denom = data.input_denom_dinar;
    console.debug(denom, "denomnya")

    const urlDenom = "product-denom.code="+denom;
    this.params = this.category;
    if (denom == "pilih") {
      this.toastrService.error("Pilih Denom Terlebih Dahulu");
      this.loadingDg = false;
    }else{
      this.productService.list(this.params+"&"+urlDenom).subscribe((response: any) => {
      this.datadinars = null
      this.datadinars = response
     
      });
    }

  }


}
