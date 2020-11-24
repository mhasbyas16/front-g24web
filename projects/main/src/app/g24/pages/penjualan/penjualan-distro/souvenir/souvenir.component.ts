import { Component, OnInit, EventEmitter, Output } from '@angular/core';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductListService } from '../../../../services/product/product-list.service';
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
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';



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

  //params
  souvenirCategory = "_or=product-category.code:c02,c04";
  category = "?_hash&_or=product-category.code:c02,c04";
  params = null;
  channel = "channel.code=ch02";
  transactionType = "transaction-type.code=t01";
  flagApp = "flag=approved";
  flagBarang = "flag=stock";

  constructor(
  //app
  private vendorService: VendorService,
  private denomService: ProductDenomService,
  private seriesService: ProductSeriesService,
  private productService: ProductListService,
 
 
  //parameter
  private prmJualService : PrmJualService,
  private prmMarginService: PrmMarginService,
  private prmPpnService : PrmPpnService,

  //toast
  private toastrService: ToastrService,

  //count cart
  private countService: CountCartService,

  //pricing 
  private pricingService: PricingService,
  private sessionService:SessionService

  
  


  ) { }
  searchModel : any = {vendors:"pilih", denoms: "pilih", serieses: "pilih"};
  
  ngOnInit(): void {
    this.onListVendor();
    this.onListDenom();
    this.onListSeries();
    // this.checkProduct();
  }
  onListVendor(){
    this.vendorService.list("?_hash=1&"+this.souvenirCategory).subscribe((response: any) => {
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
    // Session
    const getUnit = this.sessionService.getUnit();
    this.params = this.params+"&unit.code="+getUnit["code"];

    console.debug(this.params)
    if (vendor == "pilih" || denom == "pilih") {
      this.toastrService.error("Pilih Vendor dan Denom Terlebih Dahulu");
      this.loadingDg = false;
    } else {
        this.params = this.params+"&"+urlVendor;
        this.params = this.params+"&"+urlDenom;
        this.params = this.params+"&"+urlSeries;
        this.productService.list(this.params+'&'+this.flagBarang+'&_transactionType=t01&_ch=ch02').subscribe((response: any) => {
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

          this.souvenirs = response;

          console.debug(this.souvenirs[0].ongkos_pieces , "ongkos")
          // this.productService.count(this.params+'&'+this.flagBarang).subscribe((response: any) => {
            this.qty = response["length"];
            cariSouvenir.push({
              "vendor" : this.souvenirs[0].vendor.name,
              "denom" : this.souvenirs[0]['product-denom'].name,
              "series" : this.souvenirs[0]['product-series'].name,
              "vendorcode" : this.souvenirs[0].vendor.code,
              "denomcode" : this.souvenirs[0]['product-denom'].code,
              "seriescode" : this.souvenirs[0]['product-series'].code,
              "productcategory" : this.souvenirs[0]['product-category'].code,
              "qty" : this.qty,
              "harga" : this.souvenirs[0].harga

            });
            this.datasouvenirs = cariSouvenir;
            console.debug(cariSouvenir, "carisouvenir")
            this.loadingDg = false;
            // this.prmJualService.get("?"+this.souvenirCategory+"&"+this.flagApp).subscribe((Jualresponse: any) => {
            //   let prmJual = Jualresponse;
              
            // });
          // });
      });
    }
      
  }
  
  cekItemArray(data: any){
    
    const code = this.cartList.map(el => el.detail._id);
    const ARR = code.includes(data);
    return ARR;
  }

  addCart(vendorSV: any, denomSV: any, seriesSV: any,productcategorySV:any, qtySV: any, harga:any){
    this.loadingDg = true;
    this.total = 0;
    // Session
    const getUnit = this.sessionService.getUnit();
    

    if (qtySV < this.jumlahSouvenir) {
      this.toastrService.error("Jumlah Tidak Mencukupi", "Souvenir");
      this.loadingDg = false;
    }else{
      let params : any;
      let urlVendor = "&unit.code="+getUnit["code"]+"&vendor.code="+vendorSV;
      let urlDenom = "product-denom.code="+denomSV;
      let urlSeries = "product-series.code="+seriesSV;
      let urlProductcategory = "product-category.code="+productcategorySV;
      let sv: any;

      
      params = "?_hash&"+urlProductcategory+"&"+urlVendor+"&"+urlDenom+"&"+urlSeries+"&"+this.flagBarang;
      
      
      console.debug(params, "url product")
      
      let codeSV = this.cartList.map(el => el.code);
      let cekItem : any;

      console.debug(this.cartList, 'cart')
      console.debug(codeSV, 'codeLM')

      // lm = this.Souvenir
      // https://dev.g24sys.com/master-api/product-price/search?_hash&_or=product-category.code:c02,c04&unit.code=55086&vendor.code=g24&product-denom.code=0E&product-series.code=BO&flag=stock&_transactionType=t01&_ch=ch02
      this.productService.list(params+'&_transactionType=t01&_ch=ch02').subscribe((response: any) => {
        sv = response
        let udahDiCart = 0;

        
        for (let index = 0; index < codeSV.length; index++) {
          cekItem = sv.map(e => e.code).indexOf(codeSV[index])
          if (cekItem != -1) {
            sv.splice(cekItem, 1)
            udahDiCart++
          }
        }

        let maks : any 
        let availableItem = qtySV - udahDiCart ;
        console.debug(availableItem, 'availableItem')
        console.debug(sv, 'akhir')
        console.debug(this.jumlahSouvenir, 'enter')
        if ( this.jumlahSouvenir > availableItem) {
          this.toastrService.error("Jumlah Tidak Mencukupi", "Souvenir");  
          this.loadingDg = false;
        } else {
           maks = this.jumlahSouvenir
           for (let index = 0; index < maks ; index++) {
            this.cartList.push({
                'code': sv[index].code,
                'vendor' : sv[index].vendor.name,
                'denom' : sv[index]['product-denom'].name,
                'harga' : sv[index].harga,
                'detail' : JSON.parse(atob(sv[index]._hash))
            })
            this.refresh(harga, "p")
            console.debug(this.cartList)
            this.souvenir.emit(this.cartList.length);
            this.data.emit(this.countService.countCart());
          }       
        }
        this.loadingDg = false;
      });
    }
  }
  refresh(harga: any, sum: any){
    if (sum == "p") {
      this.total = 0;
      for (let i of this.cartList) {
        this.total += Number(i.harga);
      }
    }
    console.debug(this.total)
    this.totalHarga.emit(this.total);
 }
}
