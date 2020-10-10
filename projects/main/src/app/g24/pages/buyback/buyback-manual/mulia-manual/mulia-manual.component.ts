import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EMenuID } from '../../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../../decorators/content/pages';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ToastrService } from 'ngx-toastr';


// prm
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';

import { LM } from '../../../../sample/cart-buyback-manual-lm';

@Component({
  selector: 'app-mulia-manual',
  templateUrl: './mulia-manual.component.html',
  styleUrls: ['./mulia-manual.component.scss']
})

@DContent(MuliaManualComponent.key)
export class MuliaManualComponent implements OnInit {
  loadingDg: boolean;
  hargaBaku: number;
  cartList = LM;
  detail: {};
  sumHarga: number;

  constructor(
    private vendorService: VendorService,
    private denomService: ProductDenomService,
    private sessionService: SessionService,
    private prmJualService: PrmJualService
  ) { }

  ngOnInit(): void {
    this.getUnit();
    this.getUser();
    this.onListVendor();
    this.onListDenom();
    this.namaProduct
    LM.splice(0)
    this.totalCart
    
    
  }
  static key = EMenuID.BUYBACKMANUAL
  @Output() totalIsiCartEmasBatangan = new EventEmitter();

  // @Output() hargaTotalEmasBatangan = new EventEmitter();
 
  hargaTotalEmasBatangan = 0
  vendors = null;
  jenis = null;
  denoms = null;
  jumlahLM = 0
  totalCart = 0
  muliaCategory = "?product-category.code=c05";
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  datamulias= null;

  mulia:any;
  
 
  searchModel : any = {vendors:"pilih", denoms: "pilih"};
  unitDetail : any
  userDetail : any
  namaProduct = "LM Non Pegadaian"

  // hargaTotalEmasBatangan : any = 0

  onListVendor(){
    this.vendorService.list("?code=antamrtr").subscribe((response: any) => {
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

  getUnit() {
    this.unitDetail = this.sessionService.getUnit();
    console.debug(this.unitDetail)
  }

  getUser(){
    this.userDetail = this.sessionService.getUser();
   
    console.debug(this.userDetail)
  }

  onCariMulia(data){
    this.loadingDg = true;
    let vendorCode : any;
    let vendorName : any;
    let denomCode : any;
    let denomName: any;
    let prmJual : any;
  
    this.hargaBaku = 0

    this.vendorService.get("?code="+data.input_vendor_mulia).subscribe((response: any) => {
      vendorCode = response.code;
      vendorName = response.name;
        this.denomService.get("?code="+data.input_denom_mulia).subscribe((response: any) => {
          denomCode = response.code
          denomName = response.name
          const urlVendor = "vendor.code="+vendorCode;
          const urlJenisbarang = "jenis_barang=Buyback"

        this.prmJualService.get(this.muliaCategory+"&"+urlVendor+"&"+urlJenisbarang).subscribe((Jualresponse: any) => {
          prmJual = Jualresponse.harga
          for (let index = 0; index < prmJual.length; index++) {
            if (prmJual[index]["product-denom"].code == denomCode) {
              this.hargaBaku = prmJual[index].harga_baku
            }
          }
          this.detail = {}
          this.datamulias = [{vendor : vendorName, denom: denomName, harga : this.hargaBaku}]
          this.loadingDg = false;
        })
      })
    })
      
  }


  addCart(vendorLM: any, denomLM: any, harga: any){
    for (let index = 0; index < this.jumlahLM ; index++) {
      this.cartList.push({
          'vendor' : vendorLM,
          'denom' : denomLM,
          'hargaBB' : harga   
      })
    }
    
      this.totalCart = this.cartList.length
    
    
    this.jumlahLM = 0
    this.refresh("p")
    // this.totalIsiCartEmasBatangan.emit(this.cartList.length)
    console.debug(this.totalCart, "totalcart")
    
  }

  clearEmasBatangan(data: any){
    this.totalCart = data.length;
    this.hargaTotalEmasBatangan = data.harga;
  }

  totallogamMulia(isi: any){
    this.mulia = isi;
  }

  refresh(sum: any){
     if (sum == "p" && this.cartList.length != 0) {
      this.sumHarga = 0;
      for (const i of this.cartList) {
        this.sumHarga += i.hargaBB;
      }
     }
     this.hargaTotalEmasBatangan = this.sumHarga
  }
}
