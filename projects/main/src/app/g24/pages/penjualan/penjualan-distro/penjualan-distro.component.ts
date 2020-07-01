import { Component, OnInit,Pipe, PipeTransform } from '@angular/core';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { NgForm, Form, FormGroup } from '@angular/forms';
import { JenisPerhiasan } from '../../../lib/enums/jenis.enum';
import { PERHIASAN } from '../../../sample/dataperhiasan';
import { MULIA } from '../../../sample/dataemas';
import { VENDOR } from '../../../sample/datavendor';
import { ToastrService } from 'ngx-toastr';

// import { Perhiasan } from 'src/app/lib/enums/jenis.enum';

// Database
import { VendorService } from '../../../services/vendor.service';
import { ProductService } from '../../../services/product/product.service';
import { ProductJenisService } from '../../../services/product/product-jenis.service';


@Component({
  selector: 'app-penjualan-distro',
  templateUrl: './penjualan-distro.component.html',
  styleUrls: ['./penjualan-distro.component.css']
})

@DContent(PenjualanDistroComponent.key)
export class PenjualanDistroComponent implements OnInit {

  //list
  vendors = null;
  jenis = null;
  datalist = null;

  //params
  params = null;

  constructor(
    //app
    private vendorService: VendorService,
    private productService: ProductService,
    private productJenisService: ProductJenisService,

    //
  ) {}
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

  static key = EMenuID.DISTRO;
  jeniss : any[] = [];
  perhiasans : any[] = [];
  ini = 5;
  pageSize: number = 5;
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  //jenisperhiasan = Object.values(JenisPerhiasan);
  //vendors = Object.values(VENDOR);
  
  getPerhiasan = PERHIASAN;
  // perhiasans = this.getPerhiasan;
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
        if (response != false) {
         
          this.datalist = response;
          
          if (this.datalist.length == 0) {
            //jika gaada data datagrid kosong
            this.perhiasans = [];
            this.placeholderDatagrid = "Pencarian Tidak Ditemukan, Periksa Kembali Parameter Pencarian";
          }else{
            this.perhiasans = response;
          }
          console.debug(this.datalist);
        }      
      });

      // const filteredperhiasan = this.getPerhiasan.filter(kamu =>  kamu.jenis == jenis && kamu.vendor == vendor);
      
     
      console.log(jenis);
      console.log(vendor);
      console.log(berat);
      // console.log(this.getPerhiasan);
      console.log(filteredperhiasan.length);
    }

    onCariMulia(data)
    {

    }
}

