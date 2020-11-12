import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EMenuID } from '../../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../../decorators/content/pages';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ToastrService } from 'ngx-toastr';
import { ProductCategoryService } from '../../../../services/product/product-category.service';
import { BuybackAcceptParameterService } from '../../../../services/buyback/buyback-accept-parameter.service';
import { BuybackTransactionService } from '../../../../services/buyback/buyback-transaction.service';
import { DatePipe } from "@angular/common";
import { TransactionBuybackPriceService } from '../../../../services/transaction/transaction-buyback-price.service';


// prm
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';

import { LM, GS, PERHIASAN } from '../../../../sample/cart-buyback-manual-lm';


@Component({
  selector: 'app-mulia-manual',
  templateUrl: './mulia-manual.component.html',
  styleUrls: ['./mulia-manual.component.scss'],
  providers:[DatePipe],
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
    this.namaProduct
    LM.splice(0)
    GS.splice(0)
    this.totalCart
    this.onGetParameterMax();
    
    
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
  maxGrDay : any;

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

  onGetParameterMax(){
    let bulan= Number(this.datePipe.transform(Date.now(),'MM'));
    let hari = this.datePipe.transform(Date.now(),'dd');
    let tahun = this.datePipe.transform(Date.now(),'yyyy');
    let fromPick = tahun+'-'+bulan+'-'+hari;
    
    this.buybackAcceptParameterService.get("?flag=active").subscribe((response: any) => {
      let paramMaxGr = Number(response.maxPrm)
      this.buybackTransactionService.list("?unit.code="+this.unitDetail.code+"&transaction-type.code=b02&approvalDate="+fromPick+"&flag=approved").subscribe((response: any) => {
        let databuyback = response
        let grTransaction = 0
        for (let index = 0; index < databuyback.length; index++) {
          for (let i = 0; i < databuyback[index].product.LM.length; i++) {
            grTransaction =  grTransaction + Number(databuyback[index].product.LM[i].detail['product-denom'].value)
          }
        }
        this.maxGrDay = paramMaxGr - grTransaction
      })
    })
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
    let denomValue: any;
    let prmJual : any;
  
    this.hargaBaku = 0

    this.vendorService.get("?code="+data.input_vendor_mulia).subscribe((response: any) => {
      vendorCode = response.code;
      vendorName = response.name;
        this.denomService.get("?code="+data.input_denom_mulia).subscribe((response: any) => {
          denomCode = response.code
          denomName = response.name
          denomValue = response.value
          const urlVendor = "vendor.code="+vendorCode;
          const urlJenisbarang = "jenis_barang=Buyback"

        // this.prmJualService.get(this.muliaCategory+"&"+urlVendor+"&"+urlJenisbarang).subscribe((Jualresponse: any) => {
        //   prmJual = Jualresponse.harga
        //   for (let index = 0; index < prmJual.length; index++) {
        //     if (prmJual[index]["product-denom"].code == denomCode) {
        //       this.hargaBaku = prmJual[index].harga_baku
        //     }
        //   }

        this.transactionBuybackPriceService.get("?_transactionType=b02&_ch=ch02&_vendorLM="+vendorCode+"&_denomLM="+denomValue+"&_manualBuyback=1").subscribe((response:any)=>{
          const hasil = response;
          this.detail = {}
          this.datamulias = [{vendor : vendorName, denom: denomName, harga : hasil.harga, denomCodes : denomCode, denomValues: denomValue}]
          this.loadingDg = false;
        })
          
        // })
      })
    })
      
  }


  addCart(vendorLM: any, denomLM: any, harga: any, denomCode:any, denomValue: any){
    //detail
    let detail : any
    let productCategory : any;
    let unit = this.sessionService.getUnit();
    
    let totalBeratLM = Number(denomValue) * Number(this.jumlahLM)

    if (this.maxGrDay < totalBeratLM) {
      this.toastrService.error("Terima LM Melebihi Maksimal Berat");
    } else {
      this.productCategoryService.get("?code=c05").subscribe((response: any) => {
        productCategory = response
        this.vendorService.get("?code=antamrtr").subscribe((response: any) => {
          let vendorDet = response
          this.denomService.get("?code="+denomCode).subscribe((response: any) => {
            let denomDet = response
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
                "status" : 1
              }
              console.debug(productCategory);
              for (let index = 0; index < this.jumlahLM ; index++) {
                this.cartList.push({
                    'vendor' : vendorLM,
                    'denom' : denomLM,
                    'hargaBB' : harga,
                    'detail' :  detail
                })
              }
              
              this.totalCart = this.cartList.length
              this.maxGrDay = this.maxGrDay - totalBeratLM
              console.debug(this.cartList , "cartlist")
              this.jumlahLM = 0
              this.refresh("p")
          })
        })
      })
    }
    
    
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

  refreshTotalBerat(val){
    this.maxGrDay = val
  }
}
