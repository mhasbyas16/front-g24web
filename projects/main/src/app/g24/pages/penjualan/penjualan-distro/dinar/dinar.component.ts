import { Component, OnInit, EventEmitter, Output } from '@angular/core';

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
          if (c.value < d.value) { return -1; }
          if (c.value > d.value) { return 1; }
          return 0;
        })
      }      
    });
  }
  onCariDinar(data){
    this.loadingDg = true;
   
    let denom = data.input_denom_dinar;
    
    let cariDinar : any[] = [];

    let harga = 2000000;

    console.debug(denom, "denomnya")

    const urlDenom = "product-denom.code="+denom;
    this.params = this.category;
    this.params = this.params+"&"+urlDenom;
    if (denom == "pilih") {
      this.toastrService.error("Pilih Denom Terlebih Dahulu");
      this.loadingDg = false;
    }else{
      this.productService.list(this.params).subscribe((response: any) => {
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
        this.productService.count(this.params).subscribe((response: any) => {
          this.qty = response.count;
          this.prmJualService.list(this.params).subscribe((Jualresponse: any) => {
            let prmJual = Jualresponse
            this.prmMarginService.list("?"+this.vendorCategory).subscribe((Marginresponse: any) => {
              let prmMargin = Marginresponse

              console.debug(this.dinars,"din")
              console.debug(prmJual,"jual")
              console.debug(prmMargin,"marg")

              let hargaDinar = this.pricingService.priceDinar((prmJual[0]['harga-baku']), Number(prmMargin[0].margin));
                cariDinar.push({
                  "vendor" : this.dinars[0].vendor.name,
                  "denom" : this.dinars[0]['product-denom'].name,
                  "qty" : this.qty,
                  "flag" : this.dinars[0].flag,
                  "harga" : hargaDinar
                });
                this.datadinars = cariDinar
                this.loadingDg = false;
            });
          });
        });
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
      
      this.productService.list(params).subscribe((response: any) => {
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
                'harga' : harga,
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
