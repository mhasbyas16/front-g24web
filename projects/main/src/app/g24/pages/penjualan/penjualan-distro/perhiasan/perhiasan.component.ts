import { Component, OnInit } from '@angular/core';
import { NgForm, Form, FormGroup } from '@angular/forms';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductService } from '../../../../services/product/product.service';
import { ProductJenisService } from '../../../../services/product/product-jenis.service';

//rumus harga 
import { PricingService }  from '../../../../services/pricing.service';

@Component({
  selector: 'app-perhiasan',
  templateUrl: './perhiasan.component.html',
  styleUrls: ['./perhiasan.component.scss']
})
export class PerhiasanComponent implements OnInit {
  //placeholder 
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  
  //list
  vendors = null;
  jenis = null;
  datalist = null;
  perhiasans = null;

  //params
  params = null;

  constructor(
    //app
    private vendorService: VendorService,
    private productService: ProductService,
    private productJenisService: ProductJenisService,

    //pricing
    private pricingService: PricingService,
  ) { }
  searchModel : any = {vendors:"all", jenisperhiasan: "all"};

  ngOnInit(): void {
    this.onListVendor();
    this.onListJenis();
  }

  onListVendor(){
    this.vendorService.list("?_hash=1").subscribe((response: any) => {
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

  onCariPerhiasan(data)
    {
      let vendor = data.input_vendor_perhiasan;
      let jenis = data.input_jenis_perhiasan;
      let berat = data.input_berat_perhiasan;

      const urlVendor = "vendor.code="+vendor;
      const urlJenis = "product-jenis.code="+jenis;
      const urlBerat = "berat="+berat;

      
      let filteredperhiasan = [];
      if (vendor != 'all' && jenis != 'all' && berat != null) {
        this.params = "?"+urlVendor+"&"+urlJenis+"&"+urlBerat;
         // filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.jenis == jenis && produk.vendor == vendor && produk.berat == berat);
      }else if (vendor == 'all' && jenis != 'all' && berat != null) {
        this.params = "?"+urlJenis+"&"+urlBerat;
         // filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.jenis == jenis && produk.berat == berat)
      }else if (vendor != 'all' && jenis == 'all' && berat != null) {
        this.params = "?"+urlVendor+"&"+urlBerat;
          //filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.vendor == vendor && produk.berat == berat)
      }else if (vendor != 'all' && jenis != 'all' && berat == null) {
        this.params = "?"+urlVendor+"&"+urlJenis;
         // filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.vendor == vendor && produk.jenis == jenis)
      }else if (vendor != 'all' && jenis == 'all' && berat == null) {
        this.params = "?"+urlVendor;
          //filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.vendor == vendor )
      }else if (vendor == 'all' && jenis != 'all' && berat == null) {
        this.params = "?"+urlJenis;
          //filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.jenis == jenis )
      }else if (vendor == 'all' && jenis == 'all' && berat != null) {
        this.params = "?"+urlBerat;
        //filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.berat == berat )
      }else if (vendor == 'all' && jenis == 'all' && berat == null ) {
        this.params = "";
          //filteredperhiasan = this.getPerhiasan
      }else{
        
      }

      this.productService.list(this.params).subscribe((response: any) => {
        if (response == false) {
            // error jika tidak ada data
        }    
        this.perhiasans = response;
        console.debug(this.perhiasans);

                        
                                       
       
      this.perhiasans.forEach(function (item) {
        //Berat        harga baku       baku tukar      margin baku   ppn baku              
        this.datalist=this.pricingService.pricePerhiasan(Number('8.35'),Number('850000'),Number('86.22'),Number('3.5'),Number('2'));
        console.debug([this.datalist,"dta"]); 
        console.debug(["hass",item.berat]);
      });
      
      });  
      
     
      // const filteredperhiasan = this.getPerhiasan.filter(kamu =>  kamu.jenis == jenis && kamu.vendor == vendor);
      
     
      console.log(jenis);
      console.log(vendor);
      console.log(berat);
      // console.log(this.getPerhiasan);
      console.log(filteredperhiasan.length);
    }

}
