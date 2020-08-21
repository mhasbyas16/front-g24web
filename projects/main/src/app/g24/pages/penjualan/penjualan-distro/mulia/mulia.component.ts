import { Component, OnInit, EventEmitter, Output } from '@angular/core';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductService } from '../../../../services/product/product.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { ToastrService } from 'ngx-toastr';

import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { PrmMarginService } from '../../../../services/parameter/prm-margin.service';
import { PrmPpnService } from '../../../../services/parameter/prm-ppn.service';

//rumus harga 
import { PricingService }  from '../../../../services/pricing.service';

import { LM } from '../../../../sample/cart';
import { CountCartService } from '../../../../services/count-cart.service';


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
  jumlahLM : number ;
  total = 0;
  selected: any[] = [];

  //category
  vendorCategory = "product-category.code=c05";
  category = "?_hash&product-category.code=c05";

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

  //count cart
  private countService: CountCartService,
  
  //pricing 
  private pricingService: PricingService,
  


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

  
  onCariMulia(data){
    this.loadingDg = true;
    let vendor = data.input_vendor_mulia;
    let denom = data.input_denom_mulia;
    // let jumlah = data.input_jumlah ;
    let cariMulia : any[] = [];
    

    const urlVendor = "vendor.code="+vendor;
    const urlDenom = "product-denom.code="+denom;
    // const urlQty = "_rows="+jumlah;

    this.params = this.category;
    if (vendor == "pilih" || denom == "pilih") {
      this.toastrService.error("Pilih Vendor dan Denom Terlebih Dahulu");
      this.loadingDg = false;
    } else {
        this.params = this.params+"&"+urlVendor;
        this.params = this.params+"&"+urlDenom;

        //cari product
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
          //count product
          this.productService.count(this.params).subscribe((response: any) => {
            this.qty = response.count;
            // cari prm-jual product
            this.prmJualService.list(this.params).subscribe((Jualresponse: any) => {
              let prmJual = Jualresponse;
              console.debug(prmJual[0]['harga-baku'],'hargabaku')
              //cari margin penjualan
              this.prmMarginService.list("?"+this.vendorCategory).subscribe((Marginresponse: any) => {
                let prmMargin = Marginresponse
                console.debug(prmMargin[0].margin,'margin')
                let hargaLM = this.pricingService.priceLogamMulia((prmJual[0]['harga-baku']), Number(prmMargin[0].margin));
                hargaLM =  Math.ceil(hargaLM/1000)*1000;
                console.debug( hargaLM,'hargaLM')
                cariMulia.push({
                  "vendor" : this.mulias[0].vendor.name,
                  "denom" : this.mulias[0]['product-denom'].name,
                  "qty" : this.qty,
                  "harga" : hargaLM
                });
                  this.datamulias = cariMulia;
                  this.loadingDg = false;
              });
            });
        });
      });
    }
      
  }
  
  cekItemArray(data: any){
    // const code = this.cartList.map(el => el.code);
    const code = this.cartList.map(el => el.code);
    const ARR = code.includes(data);
    return ARR;
  }

  addCart(vendorLM: any, denomLM: any, qtyLM: any, harga: any){
    this.loadingDg = true;

    if (qtyLM < this.jumlahLM) {
      this.toastrService.error("Jumlah Tidak Mencukupis", "Mulia");
      this.loadingDg = false;
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
      // lm = this.mulias
      
      this.productService.list(params).subscribe((response: any) => {
        lm = response
        let udahDiCart = 0;
        console.debug(lm, 'awal')
        for (let index = 0; index < codeLM.length; index++) {
          cekItem = lm.map(e => e.code).indexOf(codeLM[index])
          if (cekItem != -1) {
            lm.splice(cekItem, 1)
            udahDiCart++
          }
          
        }
        let maks : any;

        let availableItem = qtyLM - udahDiCart ;
        console.debug(availableItem, 'availableItem')
        console.debug(lm, 'akhir')
        console.debug(this.jumlahLM, 'enter')
        if ( this.jumlahLM > availableItem) {
          this.toastrService.error("Jumlah Tidak Mencukupi", "Mulia");  
          this.loadingDg = false;
        } else {
           maks = this.jumlahLM
           
           for (let index = 0; index < maks ; index++) {
            this.cartList.push({
                'code': lm[index].code,
                'vendor' : lm[index].vendor.name,
                'denom' : lm[index]['product-denom'].name,
                'harga' : harga,
               
                'detail' : JSON.parse(atob(lm[index]._hash))
            })
            this.refresh(harga, "p")
            console.debug(this.cartList)
        this.logamMulia.emit(this.cartList.length);
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
