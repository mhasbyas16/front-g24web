import { Component, OnInit, EventEmitter, Output } from '@angular/core';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductListService } from '../../../../services/product/product-list.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { ToastrService } from 'ngx-toastr';

// prm
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { PrmMarginService } from '../../../../services/parameter/prm-margin.service';

//rumus harga 
import { PricingService }  from '../../../../services/pricing.service';

import { DINAR } from '../../../../sample/cart';
import { CountCartService } from '../../../../services/count-cart.service';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';

@Component({
  selector: 'app-dinar',
  templateUrl: './dinar.component.html',
  styleUrls: ['./dinar.component.scss']
})
export class DinarComponent implements OnInit {

  @Output() data = new EventEmitter();
  @Output() dinar = new EventEmitter();
  @Output() totalHarga = new EventEmitter();

  //global declaration
  vendors = null;
  jenis = null;
  denoms = null;
  flags = null;
  loadingDg = null; 
  dinars = null;
  datadinars= null;
  vendor = null;
  denom = null;
  flag = null;
  qty = null;
  jumlah = null;
  hargaBaku = null;
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  cartList = DINAR;
  jumlahDinar : number ;
  total = 0;
  selected: any[] = [];

  //category
  dinarCategory = "product-category.code=c06";
  category = "?_hash&product-category.code=c06";

   //params
  params = null;
  channel = "channel.code=ch02";
  transactionType = "transaction-type.code=t01";
  flagApp = "flag=approved";
  jenisBarang = "jenis_barang=Jual";

  flagBarang = "flag=stock";


  constructor(
      //app
    private vendorService: VendorService,
    private denomService: ProductDenomService,
    private productService: ProductListService,
  
    //parameter
    private prmJualService : PrmJualService,
    private prmMarginService: PrmMarginService,
    
    //toast
    private toastrService: ToastrService,

    //count cart
    private countService: CountCartService,
    
    //pricing 
    private pricingService: PricingService,
    private sessionService:SessionService


  ) { }
  //model
  searchModel : any = {vendors:"pilih", denoms: "pilih", flags: "pilih"};

  ngOnInit(): void {
    this.onListDenom();
    this.onListVendor();
  }

  onListDenom(){
    this.denomService.list(this.category).subscribe((response: any) => {
      if (response != false) {
        this.denoms = response;
        this.denoms.sort(function (c, d) {
          if (c.value < d.value) { return -1; }
          if (c.value > d.value) { return 1; }
          return 0;
        })
      }      
    });
  }

  onListVendor(){
    this.vendorService.list("?_hash=1&"+this.dinarCategory).subscribe((response: any) => {
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
  onCariDinar(data){
    this.loadingDg = true;
   
    let denom = data.input_denom_dinar;
    let vendor = data.input_vendor_dinar;
    let cariDinar : any[] = [];

    let harga = 2000000;

    console.debug(denom, "denomnya")

    const urlDenom = "product-denom.code="+denom;
    const urlVendor = "vendor.code="+vendor;
    

    this.params = this.category;
    // Session
    const getUnit = this.sessionService.getUnit();
    this.params = this.params+"&unit.code="+getUnit["code"];
    this.params = this.params+"&"+urlDenom+"&"+urlVendor
    if (denom == "pilih") {
      this.toastrService.error("Pilih Denom Terlebih Dahulu");
      this.loadingDg = false;
    }else{
      this.productService.list(this.params+"&"+this.flagBarang+'&_transactionType=t01&_ch=ch02').subscribe((response: any) => {
        this.datadinars = null
        if (response == false) {
          this.toastrService.error("Data Not Found", "Dinar");
          this.loadingDg = false;
          return;
        }
        if (response["length"] == 0) {
          this.toastrService.error("Data Not Found", "Dinar");
          this.loadingDg = false;
          return;
        }
        this.dinars = response
        
        // this.productService.count(this.params+"&"+this.flagBarang).subscribe((response: any) => {
          this.qty = response["length"];
          cariDinar.push({
            "vendor" : this.dinars[0].vendor.name,
            "denom" : this.dinars[0]['product-denom'].name,
            "qty" : this.qty,
            "flag" : this.dinars[0].flag,
            "harga" :this.dinars[0].harga
          });
          this.datadinars = cariDinar
          this.loadingDg = false;
        // });
      });
    }
  }

  addCart(vendorDn: any, denomDn: any, qtyDinar: any, harga: any){
    this.loadingDg = true;
    if (qtyDinar < this.jumlahDinar) {
      this.toastrService.error("Jumlah Tidak Mencukupis", "Dinar");
      this.loadingDg = false;
    }else{
      let params : any;
      let urlVendor = "vendor.name="+vendorDn;
      let urlDenom = "product-denom.name="+denomDn;
      let dn: any;

      params = this.category;
      params = params+"&"+urlVendor;
      params = params+"&"+urlDenom;
      
      let codeDinar = this.cartList.map(el => el.code);
      let cekItem : any;
      
      this.productService.list(params+"&"+this.flagBarang+'&_transactionType=t01&_ch=ch02').subscribe((response: any) => {
        dn = response
        let udahDiCart = 0;
        console.debug(dn, 'awal')
        for (let index = 0; index < codeDinar.length; index++) {
          cekItem = dn.map(e => e.code).indexOf(codeDinar[index])
          if (cekItem != -1) {
            dn.splice(cekItem, 1)
            udahDiCart++
          }
        }
        let maks : any 
        let availableItem = qtyDinar - udahDiCart ;
        if ( this.jumlahDinar > availableItem) {
          this.toastrService.error("Jumlah Tidak Mencukupi", "Dinar");  
          this.loadingDg = false;
        } else {
           maks = this.jumlahDinar
           for (let index = 0; index < maks ; index++) {
            this.cartList.push({
                'code': dn[index].code,
                'vendor' : dn[index].vendor.name,
                'denom' : dn[index]['product-denom'].name,
                'harga' : dn[index].harga,
                'flag' : dn[index].flag,
                'detail' : JSON.parse(atob(dn[index]._hash))
            })
            this.refresh(harga, "p")
            console.debug(this.cartList)
            this.dinar.emit(this.cartList.length);
            this.data.emit(this.countService.countCart());
          } 
        }
        this.loadingDg = false;
      })
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
