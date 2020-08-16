import { Component, OnInit, EventEmitter, Output } from '@angular/core';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductService } from '../../../../services/product/product.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { ToastrService } from 'ngx-toastr';

import { ProductJenisService } from '../../../../services/product/product-jenis.service';
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
  vendorCategory = "product-category.code=05";
  category = "?product-category.code=05";

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
        // this.params = this.params+"&"+urlQty;
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

          // this.prmJualService.list(this.params).subscribe((Jualresponse: any) => {
          //   if (Jualresponse != false) {
          //     this.hargaBaku = Jualresponse;
          //   }
          this.mulias = response;
          this.productService.count(this.params).subscribe((response: any) => {
          this.qty = response.count;
          cariMulia.push({
            "vendor" : this.mulias[0].vendor.name,
            "denom" : this.mulias[0]['product-denom'].name,
            "qty" : this.qty

          });
            // this.mulias = response;
            this.datamulias = cariMulia;
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
    

    if (qtyLM < this.jumlahLM) {
      this.toastrService.error("Jumlah Tidak Mencukupi", "Mulia");
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
      let harga = 20000000;
      this.productService.list(params).subscribe((response: any) => {
        lm = response
        for (let index = 0; index < codeLM.length; index++) {
          cekItem = lm.map(e => e.code).indexOf(codeLM[index])
          lm.splice(cekItem, 1)
        }
        let maks : any;
        let hargaTotalLM : number;
        if (lm.length == 0 || lm.length < this.jumlahLM) {
          this.toastrService.error("Jumlah Tidak Mencukupi", "Mulia");  
        } else {
           maks = this.jumlahLM
           
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
        this.logamMulia.emit(this.cartList.length);
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
