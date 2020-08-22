import { Component, OnInit, EventEmitter, Output } from '@angular/core';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductService } from '../../../../services/product/product.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { ProductSeriesService } from '../../../../services/product/product-series.service';

import { ToastrService } from 'ngx-toastr';

import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { PrmMarginService } from '../../../../services/parameter/prm-margin.service';
import { PrmPpnService } from '../../../../services/parameter/prm-ppn.service';

//rumus harga 
import { PricingService }  from '../../../../services/pricing.service';

import { GS } from '../../../../sample/cart';
import { CountCartService } from '../../../../services/count-cart.service';



@Component({
  selector: 'app-souvenir',
  templateUrl: './souvenir.component.html',
  styleUrls: ['./souvenir.component.scss']
})
export class SouvenirComponent implements OnInit {
  @Output() data = new EventEmitter();
  @Output() souvenir = new EventEmitter();
  @Output() totalHarga = new EventEmitter();

  vendors = null;
  jenis = null;
  denoms = null;
  serieses = null;
  loadingDg = null; 
  souvenirs = null;
  datasouvenirs= null;
  tempdatasouvenirs = null;
  vendor = null;
  denom = null;
  qty = null;
  jumlah = null;
  hargaBaku = null;
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  tampilSouvenirs = [];
  cartList = GS;
  jumlahSouvenir : number ;
  total = 0;
  selected: any[] = [];

  //category
  vendorCategory = "product-category.code=c02";
  category = "?product-category.code=c02";

   //params
   params = null;

  constructor(
  //app
  private vendorService: VendorService,
  private denomService: ProductDenomService,
  private seriesService: ProductSeriesService,
  private productService: ProductService,
 
 
  //parameter
  private prmJualService : PrmJualService,
  private prmMarginService: PrmMarginService,
  private prmPpnService : PrmPpnService,

  //toast
  private toastrService: ToastrService,

  //count cart
  private countService: CountCartService,
  
  


  ) { }
  searchModel : any = {vendors:"pilih", denoms: "pilih", serieses: "pilih"};
  
  ngOnInit(): void {
    this.onListVendor();
    this.onListDenom();
    this.onListSeries();
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
  onListSeries(){
    this.seriesService.list().subscribe((response: any) => {
      console.debug(response, "series")
      if (response != false) {
        this.serieses = response;
        this.serieses.sort(function (c, d) {
          if (c.name < d.name) { return -1; }
          if (c.name > d.name) { return 1; }
          return 0;
        })
      }      
    });
  }

  
  onCariSouvenir(data){
    this.loadingDg = true;
    this.datasouvenirs = null;
    let vendor = data.input_vendor_souvenir;
    let denom = data.input_denom_souvenir;
    let series = data.input_series_souvenir;
    let cariSouvenir : any[] = [];

    const urlVendor = "vendor.code="+vendor;
    const urlDenom = "product-denom.code="+denom;
    const urlSeries = "product-series.code="+series;

    this.params = this.category;

    console.debug(this.params)
    if (vendor == "pilih" || denom == "pilih") {
      this.toastrService.error("Pilih Vendor dan Denom Terlebih Dahulu");
      this.loadingDg = false;
    } else {
        this.params = this.params+"&"+urlVendor;
        this.params = this.params+"&"+urlDenom;
        this.params = this.params+"&"+urlSeries;
        this.productService.list(this.params).subscribe((response: any) => {
          console.debug(response, "bangsat")
          if (response == false) {
            this.toastrService.error("Data Not Found", "Souvenir");
            this.loadingDg = false;
            return;
          }
          if (response["length"] == 0) {
            this.toastrService.error("Data Not Found", "Souvenir");
            this.loadingDg = false;
            return;
          }  

          // this.prmJualService.list(this.params).subscribe((Jualresponse: any) => {
          //   if (Jualresponse != false) {
          //     this.hargaBaku = Jualresponse;
          //   }
          this.souvenirs = response;
          this.productService.count(this.params).subscribe((response: any) => {
          this.qty = response.count;
          cariSouvenir.push({
            "vendor" : this.souvenirs[0].vendor.name,
            "denom" : this.souvenirs[0]['product-denom'].name,
            "qty" : this.qty

          });
            // this.Souvenir = response;
            this.datasouvenirs = cariSouvenir;
            this.loadingDg = false;
          // });
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

  addCart(vendorLM: any, denomLM: any, qtyLM: any){
    this.loadingDg = true;
    this.total = 0;
    

    if (qtyLM < this.jumlahSouvenir) {
      this.toastrService.error("Jumlah Tidak Mencukupi", "Souvenir");
    }else{
      let params : any;
      let urlVendor = "vendor.name="+vendorLM;
      let urlDenom = "product-denom.name="+denomLM;
      let lm: any;

      params = this.category;
      params = params+"&"+urlVendor;
      params = params+"&"+urlDenom;
      
      let codeLM = this.cartList.map(el => el.code);
      let cekItem : any;

      console.debug(this.cartList, 'cart')
      console.debug(codeLM, 'codeLM')
      // lm = this.Souvenir
      let harga = 20000000;
      this.productService.list(params).subscribe((response: any) => {
        lm = response
        for (let index = 0; index < codeLM.length; index++) {
          cekItem = lm.map(e => e.code).indexOf(codeLM[index])
          lm.splice(cekItem, 1)
        }
        let maks : any;
        let hargaTotalLM : number;
        if (lm.length == 0 || lm.length < this.jumlahSouvenir) {
          this.toastrService.error("Jumlah Tidak Mencukupi", "Souvenir");  
        } else {
           maks = this.jumlahSouvenir
           
           for (let index = 0; index < maks ; index++) {
            this.cartList.push({
                'code': lm[index].code,
                'vendor' : lm[index].vendor.name,
                'denom' : lm[index]['product-denom'].name,
                'harga' : harga
            })
            
          }
         
        }
        console.debug(this.cartList)
        this.refresh(harga, "p")
        this.souvenir.emit(this.cartList.length);
        this.data.emit(this.countService.countCart());
        this.loadingDg = false;
      });

    }
    
  }
  refresh(harga: any, sum: any){
    
    if (sum == "p") {
    
     for (let i of this.cartList) {
       this.total += Number(i.harga);
       console.debug(this.cartList)
       
     }
    }
    
    console.debug(this.total)
    this.totalHarga.emit(this.total);
    
   
 }
}
