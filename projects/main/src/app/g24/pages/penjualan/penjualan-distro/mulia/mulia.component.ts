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
  flags = null;
  loadingDg = null; 
  mulias = null;
  datamulias= null;
  tempdatamulias = null;
  vendor = null;
  denom = null;
  flag = null;
  qty = null;
  jumlah = null;
  hargaBaku = null;
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  tampilMulia = [];
  cartList = LM;
  jumlahLM : number ;
  total = 0;
  selected: any[] = [];
  
  ////params
  vendorCategory = "product-category.code=c05";
  category = "?_hash=1&product-category.code=c05";

  muliaCategory = "?product-category.code=c05";

  channel = "channel.code=ch02";
  transactionType = "transaction-type.code=t01";

  flagApp = "flag=approved";
  jenisBarang = "jenis_barang=Jual";
  params = null;

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
  


  ) { }
  searchModel : any = {vendors:"pilih", denoms: "pilih", flags: "pilih"};
  
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
    this.denomService.list("?product-category.code=c05").subscribe((response: any) => {
      
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

  
  onCariMulia(data){
    this.loadingDg = true;
    let vendor = data.input_vendor_mulia;
    let denom = data.input_denom_mulia;
    let flag = data.input_flag_mulia;
    // let jumlah = data.input_jumlah ;
    let cariMulia : any[] = [];
    this.hargaBaku = 0
    

    const urlVendor = "vendor.code="+vendor;
    const urlDenom = "product-denom.code="+denom;
    const urlFlag = "flag="+flag;
    // const urlQty = "_rows="+jumlah;

    this.params = this.category;
    if (vendor == "pilih" || denom == "pilih" || flag == "pilih") {
      this.toastrService.error("Pilih Vendor , Denom dan Flag Barang Terlebih Dahulu");
      this.loadingDg = false;
    } else {
        this.params = this.params+"&"+urlVendor;
        this.params = this.params+"&"+urlDenom;
        // this.params = this.params+"&"+urlFlag;

        //cari product
        this.productService.list(this.params+"&"+urlFlag+'&_transactionType=t01&_ch=ch02').subscribe((response: any) => {
          this.datamulias = null
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
          // count product
          // this.productService.count(this.params+"&"+urlFlag).subscribe((response: any) => {
            this.qty = response["length"];
            // cari prm-jual product
            this.prmJualService.get(this.muliaCategory+"&"+urlVendor+"&"+this.flagApp+"&"+this.jenisBarang).subscribe((Jualresponse: any) => {
              let prmJual = Jualresponse.harga;
              console.debug(prmJual)
              for (let index = 0; index < prmJual.length; index++) {
                  if (prmJual[index]["product-denom"].code == denom) {
                    this.hargaBaku = prmJual[index].harga_baku
                  }
              }
              console.debug(this.qty,response.count,"qty")
              cariMulia.push({
                "vendor" : this.mulias[0].vendor.name,
                "denom" : this.mulias[0]['product-denom'].name,
                "qty" : this.qty,
                "flag" : this.mulias[0].flag,
                "harga" : this.mulias[0].harga
                
              });
              this.datamulias = cariMulia;
              console.debug(this.datamulias, "kamu")
              this.loadingDg = false;
              console.debug(this.hargaBaku,"hargaBaku")
              //cari margin penjualan
              // this.prmMarginService.get(this.muliaCategory+"&"+this.channel+"&"+this.transactionType+"&"+this.flagApp).subscribe((Marginresponse: any) => {
              //   let prmMargin = Marginresponse.margin
              //   let hargaLM = this.pricingService.priceLogamMulia(this.hargaBaku, Number(prmMargin));
              //   hargaLM =  Math.ceil(hargaLM/1000)*1000;
                
                 
              // });
            });
        // });
      });
    }
      
  }
  
  cekItemArray(data: any){
    // const code = this.cartList.map(el => el.code);
    const code = this.cartList.map(el => el.detail._id);
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
      
      this.productService.list(params+'&_transactionType=t01&_ch=ch02').subscribe((response: any) => {
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
        let maks : any 
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
                'harga' : lm[index].harga,
                'flag' : lm[index].flag,
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
