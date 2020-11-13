import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { EMenuID } from '../../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../../decorators/content/pages';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { ProductSeriesService } from '../../../../services/product/product-series.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ToastrService } from 'ngx-toastr';
import { ProductCategoryService } from '../../../../services/product/product-category.service';
import { BuybackAcceptParameterService } from '../../../../services/buyback/buyback-accept-parameter.service';
import { BuybackTransactionService } from '../../../../services/buyback/buyback-transaction.service';
import { DatePipe } from "@angular/common";
import { TransactionBuybackPriceService } from '../../../../services/transaction/transaction-buyback-price.service';


// prm
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';

import { LM,GS } from '../../../../sample/cart-buyback-manual-lm';


@Component({
  selector: 'app-souvenir-manual',
  templateUrl: './souvenir-manual.component.html',
  styleUrls: ['./souvenir-manual.component.scss'],
  providers:[DatePipe],
})
@DContent(SouvenirManualComponent.key)
export class SouvenirManualComponent implements OnInit {
  loadingDg: boolean;
  hargaBaku: number;
  cartList = GS;
  detail: {};
  sumHarga: number;

  constructor(
    private vendorService: VendorService,
    private denomService: ProductDenomService,
    private seriesService: ProductSeriesService,
    private sessionService: SessionService,
    private prmJualService: PrmJualService, 
    private productCategoryService : ProductCategoryService,
    private buybackAcceptParameterService : BuybackAcceptParameterService,
    private toastrService:ToastrService,
    private buybackTransactionService : BuybackTransactionService,
    private datePipe: DatePipe,
    private transactionBuybackPriceService:TransactionBuybackPriceService
  ) { }

  ngOnInit(): void {
    this.getUnit();
    this.getUser();
    this.onListVendor();
    this.onListDenom();
    this.onListSeries();
    this.namaProduct
    LM.splice(0)
    GS.splice(0)
    this.totalCart
  }
  static key = EMenuID.BUYBACKMANUALSOUVENIR

  @Output() totalIsiCartEmasBatangan = new EventEmitter();

  // @Output() hargaTotalEmasBatangan = new EventEmitter();
 
  hargaTotalSouvenir = 0
  vendors = null;
  jenis = null;
  denoms = null;
  serieses = null;
  jumlahLM = 0
  totalCart = 0
  souvenirCategory = "?product-category.code=c02";
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  dataSouvenir= null;
  maxGrDay : any;

  mulia:any;
  
 
  searchModel : any = {vendors:"pilih", denoms: "pilih", serieses : "pilih"};
  unitDetail : any
  userDetail : any
  namaProduct = "LM Non Pegadaian"

  // hargaTotalEmasBatangan : any = 0

  onListVendor(){
    this.vendorService.list(this.souvenirCategory).subscribe((response: any) => {
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
    this.denomService.list(this.souvenirCategory).subscribe((response: any) => {
      
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

  getUnit() {
    this.unitDetail = this.sessionService.getUnit();
    console.debug(this.unitDetail)
  }

  getUser(){
    this.userDetail = this.sessionService.getUser();
   
    console.debug(this.userDetail)
  }

  onCariSouvenir(data){
    this.loadingDg = true;
    let vendorCode : any;
    let vendorName : any;
    let denomCode : any;
    let denomName: any;
    let denomValue: any;
    let seriesCode : any;
    let seriesName: any;
    let prmJual : any;
  
    this.hargaBaku = 0

    let prm ="?_transactionType=b03&_ch=ch02&_vendor="+data.input_vendor_souvenir+"&_denom="+data.input_denom_souvenir+"&_series="+data.input_series_souvenir+"&_manualBuyback=souvenir"
    this.transactionBuybackPriceService.get(prm).subscribe((response:any)=>{
      const hasil = response;
      this.dataSouvenir =[hasil];
      this.loadingDg = false;
    })

    // this.vendorService.get("?code="+data.input_vendor_souvenir).subscribe((response: any) => {
    //   vendorCode = response.code;
    //   vendorName = response.name;
    //   this.denomService.get("?code="+data.input_denom_souvenir).subscribe((response: any) => {
    //     denomCode = response.code
    //     denomName = response.name
    //     denomValue = response.value
    //     this.seriesService.get("?code="+data.input_series_souvenir).subscribe((response: any) => {
    //       seriesCode = response.code
    //       seriesName = response.name
    //       this.prmJualService.get(this.souvenirCategory+"&flag=approved").subscribe((Jualresponse: any) => {
    //         prmJual = Jualresponse.harga_buyback
    //         let harga_buyback = Number(denomValue) * Number(prmJual)
    //         console.debug(harga_buyback, "harga_buyback")
    //         this.detail = {}
    //         this.dataSouvenir = [{
    //           vendor : vendorName,
    //           vendorCode : vendorCode, 
    //           denom: denomName, 
    //           harga : harga_buyback,
    //           denomCodes : denomCode, 
    //           seriesName: seriesName, 
    //           denomValues: denomValue, 
    //           seriesCode: seriesCode}]
    //         this.loadingDg = false;
    //       })
    //     })
    //   })
    // })
  }


  addCart(vendorLM: any, vendorCode: any, denomLM: any, harga: any, denomCode:any, denomValue: any, seriesName: any, seriesCode:any){
    //detail
    let detail : any
    let productCategory : any;
    let unit = this.sessionService.getUnit();
    
    let totalBeratLM = Number(denomValue) * Number(this.jumlahLM)
    this.productCategoryService.get("?code=c02").subscribe((response: any) => {
      productCategory = response
      this.vendorService.get("?code="+vendorCode).subscribe((response: any) => {
        let vendorDet = response
        this.denomService.get("?code="+denomCode).subscribe((response: any) => {
          let denomDet = response
          this.seriesService.get("?code="+seriesCode).subscribe((response: any) => {
            let seriesDet = response
            detail = {
              "product-category" : productCategory,
              "flag" : "stock",
              "hpp" : harga,
              "hpp_inisiasi" : harga,
              "unit" : unit,
              "vendor" : vendorDet,
              "tipe_stock" : "stock",
              "location" : "pusat",
              "sku" : "1234",
              "product-denom" : denomDet,
              'product-series' : seriesDet,
              "status" : 1
            }
            console.debug(productCategory);
            for (let index = 0; index < this.jumlahLM ; index++) {
              this.cartList.push({
                  'vendor' : vendorLM,
                  'denom' : denomLM,
                  'hargaBB' : harga,
                  'detail' :  detail,
                  'series' : seriesName
              })
            }
            
            this.totalCart = this.cartList.length
           
            console.debug(this.cartList , "cartlist")
            this.jumlahLM = 0
            this.refresh("p")
          })
        })
      })
    })
    
    
  }

  clearSouvenir(data: any){
    this.totalCart = data.length;
    this.hargaTotalSouvenir = data.harga;
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
     this.hargaTotalSouvenir = this.sumHarga
     console.debug(this.hargaTotalSouvenir, "tasad")
  }

  refreshTotalBerat(val){
    this.maxGrDay = val
  }

}
