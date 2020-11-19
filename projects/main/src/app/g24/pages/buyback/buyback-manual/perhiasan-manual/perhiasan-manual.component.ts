import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { EMenuID } from '../../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../../decorators/content/pages';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UnitService } from '../../../../services/system/unit.service';
import { ProductPurityService } from '../../../../services/product/product-purity.service';
import { VendorService } from '../../../../services/vendor.service';
import { ProductJenisService } from '../../../../services/product/product-jenis.service';
import { ProductGoldColorService } from '../../../../services/product/product-gold-color.service';
import { ProductCategoryService } from '../../../../services/product/product-category.service';
import { PricingService} from '../../../../services/pricing.service';
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { LM, GS, PERHIASAN } from '../../../../sample/cart-buyback-manual-lm';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { TransactionBuybackPriceService } from '../../../../services/transaction/transaction-buyback-price.service';


@Component({
  selector: 'app-perhiasan-manual',
  templateUrl: './perhiasan-manual.component.html',
  styleUrls: ['./perhiasan-manual.component.scss']
})
@DContent(PerhiasanManualComponent.key)
export class PerhiasanManualComponent implements OnInit {

 
  constructor(
    private unitService: UnitService,
    private productPurityService : ProductPurityService,
    private vendorService: VendorService,
    private productJenisService: ProductJenisService, 
    private productGoldColorService:ProductGoldColorService,
    private toastrService: ToastrService,
    private pricingService : PricingService,
    private prmJualService : PrmJualService,
    private productCategoryService : ProductCategoryService,
    private sessionService : SessionService,
    private transactionBuybackPriceService:TransactionBuybackPriceService
  ) { }

  ngOnInit(): void {
    this.loadFormData();
    this.onListUnit();
    this.onListKadar();
    this.onListVendor();
    this.onListWarna();
    this.onListJenis();
    this.onListKondisi();
    this.getUnit();
    this.totalCart
    PERHIASAN.splice(0)
  }

  hargaTotalPerhiasan = 0
  dataPerhiasan : any
  searchModel : any = {units:"pilih", kadars:"pilih", vendors:"pilih", jeniss: "pilih", warnas: "pilih", kondisis : "pilih"};
  units : any
  kadars: any
  jeniss: any
  warnas: any
  vendors : any
  kondisis : any
  dataperhiasans : any = []
  placeholderDatagrid = "kamu"
  loadingDg = false
  hargaBB = 0
  productCategory= "product-category.code=c00";
  hargaDasarBuyback = 0
  unitDistro : any

  sumHarga = 0

  cartList = PERHIASAN
  totalCart = 0

  loadFormData(){ 
    this.dataPerhiasan = new FormGroup({
      unitTransaksi: new FormControl ("", [Validators.required]),
      
    })

   
  }

  addToCart(data){
    this.cartList.splice(0)
    let detail : any
    let kondisi : any
    let ongkos : any
    let baku_tukar : any
    if (data[0].kondisi == "2"){
      kondisi = "Rusak"
      ongkos = -20
      baku_tukar = Number(data[0].kadarDet.name) -20
    }else{
      kondisi = "Baik"
      if ((Number(data[0].kadarDet.name) >= 750)) {
        ongkos = 90
        baku_tukar = (Number(data[0].kadarDet.name) +90) /10
      } else if (Number(data[0].kadarDet.name) < 750) {
        ongkos = 50
        baku_tukar = (Number(data[0].kadarDet.name) + 50) /10
      }

    }
    detail = {
                "product-category" : data[0].productCategory,
                "flag" : "stock",
                "hpp" : data[0].hargaBB,
                "hpp_inisiasi" : data[0].hargaBB,
                "unit" : data[0].unitDet,
                "vendor" : data[0].vendorDet,
                "product-purity" : data[0].kadarDet,
                "product-jenis" : data[0].jenisDet,
                "product-gold-color" : data[0].warnaDet,
                "berat" : data[0].berat,
                "kondisi" : kondisi,
                "ongkos" : ongkos,
                "baku_tukar" : baku_tukar,
                "tipe_stock" : "stock",
                "location" : "pusat",
                "sku" : "1234",
                "status" : 1
    }
    this.cartList.push({
      'vendor' : data[0].vendorName,
      'warna' : data[0].warnaName,
      'jenis' : data[0].jenisName,
      'kadar' : data[0].kadarName,
      'hargaBB' : data[0].hargaBB,
      'kondisi' : data[0].kondisi,
      'namaNasabahTransaksi' : data[0].namaNasabahTransaksi, 
      'alamatTransaksiPembelian' : data[0].alamatTransaksiPembelian,
      'tanggalTransaksiPembelian' : data[0].tanggalTransaksiPembelian,
      'unitTransaksiPembelian' : data[0].unitTransaksiPembelian,
      'detail' :  detail
    })
    // console.debug( data ,"data")
    this.totalCart = this.cartList.length
    this.refresh("p")
    console.debug( this.cartList ,"data")
    console.debug( this.totalCart ,"totalCart")
    
  }

  tampilHarga(val){
    this.totalCart = 0;
    this.cartList.splice(0)
    this.loadingDg = true
    this.dataperhiasans = null
    let unitCode : any
    unitCode = val.input_unit_transaksi
    let unitName: any;
    let unitDet: any;
    let vendorCode : any 
    vendorCode = val.input_vendor_product
    let vendorName: any;
    let vendorDet: any;
    let jenisCode: any;
    jenisCode = val.input_jenis_perhiasan
    let jenisName: any;
    let jenisDet: any;
    let kadarCode: any;
    kadarCode = val.input_kadar_product
    let kadarName: any;
    let kadarDet:any;
    let warnaCode:any;
    warnaCode = val.input_warna_perhiasan
    let warnaName: any;
    let warnaDet: any;
    let productCategory : any;
    let tanggalTransaksiPembelian :any 
    tanggalTransaksiPembelian  = val.input_tanggalTransaksiPembelian 
    let denomValue: any;
    let prmJual : any;
    let unit = this.sessionService.getUnit();
    let unitTransaksiPembelian : any

    if (val.input_namaNasabahPembelian == "" || val.input_namaNasabahPembelian == undefined) {
      this.loadingDg = false
      return this.toastrService.error("Input Nama Nasabah Terlebih Dahulu");
    }
    if (val.input_alamatTransaksiPembelian == "" || val.input_alamatTransaksiPembelian == undefined) {
      this.loadingDg = false
      return this.toastrService.error("Input Nama Alamat Terlebih Dahulu");
    }
    

    console.debug( tanggalTransaksiPembelian, "tanggalTransaksiPembelian")
    if (tanggalTransaksiPembelian == "" || tanggalTransaksiPembelian == null ) {
      this.toastrService.error("Harap Pilih Tanggal Transaksi Pembelian Terlebih Dahulu", "Perhiasan");
      this.loadingDg = false
      return
    }

    if (unitCode == "pilih") {
      this.toastrService.error("Harap Pilih Unit Terlebih Dahulu", "Perhiasan");
      this.loadingDg = false
      return
    }

    if (vendorCode == "pilih") {
      this.toastrService.error("Harap Pilih Vendor Terlebih Dahulu", "Perhiasan");
      this.loadingDg = false
      return
    }
    if (jenisCode == "pilih") {
      this.toastrService.error("Harap Pilih jenis Terlebih Dahulu", "Perhiasan");
      this.loadingDg = false
      return
    }
    
    if (kadarCode == "pilih") {
      this.toastrService.error("Harap Pilih Kadar Terlebih Dahulu", "Perhiasan");
      this.loadingDg = false
      return
    }

    if (warnaCode == "pilih") {
      this.toastrService.error("Harap Pilih Warna Terlebih Dahulu", "Perhiasan");
      this.loadingDg = false
      return
    }

    if (val.input_kondisi_perhiasan == "pilih") {
      this.toastrService.error("Harap Pilih Kondisi Terlebih Dahulu", "Perhiasan");
      this.loadingDg = false
      return
    }

    let paramsBB = "?_transactionType=b04&_ch=ch02&_productCat=c00&_unit="+this.unitDistro.code;
        paramsBB = paramsBB + "&_vendor="+vendorCode+"&_productJenis="+jenisCode+"&_productGoldColor="+warnaCode+"&_productPurity="+kadarCode;
        paramsBB = paramsBB + "&_kondisi="+val.input_kondisi_perhiasan+"&_berat="+val.input_beratPerhiasan+"&_manualBuyback=perhiasan";
                      
        this.transactionBuybackPriceService.get(paramsBB).subscribe((response:any)=>{
          let data = {};
          data = response;
            data["namaNasabahTransaksi"] = val.input_namaNasabahPembelian;
            data["tanggalTransaksiPembelian"] = val.input_tanggalTransaksiPembelian;
            data["alamatTransaksiPembelian"] = val.input_alamatTransaksiPembelian;

          this.dataperhiasans = [data];
          console.debug(val, "value")
          console.debug(this.dataperhiasans, "data")
          console.debug(this.totalCart, "data")
          this.loadingDg = false
        })
                        // this.dataperhiasans = [{
                        //   unitCode: unitCode, 
                        //   unitName : unitName, 
                        //   unitDet : unitDet,
                        //   vendorName : vendorName, 
                        //   vendorCode: vendorCode, 
                        //   vendorDet : vendorDet,
                        //   jenisCode : jenisCode, 
                        //   jenisName : jenisName,
                        //   jenisDet : jenisDet,
                        //   warnaCode : warnaCode,
                        //   warnaName : warnaName,
                        //   warnaDet : warnaDet,
                        //   kadarCode : kadarCode,
                        //   kadarName : kadarName,
                        //   kadarDet : kadarDet,
                        //   berat : val.input_beratPerhiasan,
                        //   kondisi : val.input_kondisi_perhiasan,
                        //   namaNasabahTransaksi : val.input_namaNasabahPembelian, 
                        //   alamatTransaksiPembelian : val.input_alamatTransaksiPembelian,
                        //   tanggalTransaksiPembelian : val.input_tanggalTransaksiPembelian,
                        //   unitTransaksiPembelian : unitTransaksiPembelian,
                        //   hargaBB : hargaResponse["hargaBB"],
                        //   productCategory : productCategory
                        // }]
                        
                      

                  

    // this.productCategoryService.get("?code=c00").subscribe((response: any) => {
    //   productCategory = response
    //   this.unitService.get("?code="+this.unitDistro.code).subscribe((response: any) => {
    //     unitTransaksiPembelian = response
    //     this.unitService.get("?code="+this.unitDistro.code).subscribe((response: any) => {
    //       unitName = response.nama;
    //       unitDet = response
    //       this.vendorService.get("?code="+vendorCode).subscribe((response: any) => {
    //         vendorName = response.name;
    //         vendorDet = response
    //         this.productJenisService.get("?code="+jenisCode).subscribe((response: any) => {
    //           jenisName = response.name;
    //           jenisDet = response
    //           this.productGoldColorService.get("?code="+warnaCode).subscribe((response: any) => {
    //             warnaName = response.name;
    //             warnaDet = response
    //             this.productPurityService.get("?code="+kadarCode).subscribe((response: any) => {
    //               kadarName = response.name;
    //               kadarDet = response
    //               this.productPurityService.get("?code="+kadarCode).subscribe((response: any) => {
    //                 kadarName = response.name;
    //                 kadarDet = response
    //                 // this.prmJualService.get("?"+this.productCategory+"&flag=approved").subscribe((BBresponse: any) => {
    //                   // this.hargaDasarBuyback = BBresponse.harga_buyback
    //                   // this.hargaBB = this.pricingService.buybackPricePerhiasan(val.input_kondisi_perhiasan, kadarName, val.input_beratPerhiasan,this.hargaDasarBuyback )
    //                   // this.hargaBB = this.pricingService.buybackPricePerhiasan(val.input_kondisi_perhiasan, Number(kadarName), val.input_beratPerhiasan ,Number(this.hargaDasarBuyback) )
                      
                      
    //                 // })
    //               })
    //             })
    //           })
    //         })
    //       })
    //     })
    //   })
    // })
    

    
  }

  onListUnit(){
    this.unitService.list("").subscribe((response: any) => {
      
      if (response != false) {
        this.units = response;
        this.units.sort(function (c, d) {
          if (c.value < d.value) { return -1; }
          if (c.value > d.value) { return 1; }
          return 0;
        })
      }      
    });
  }

  onListKadar(){
    this.productPurityService.list("").subscribe((response: any) => {
      
      if (response != false) {
        this.kadars = response;
        this.kadars.sort(function (c, d) {
          if (c.value < d.value) { return -1; }
          if (c.value > d.value) { return 1; }
          return 0;
        })
      }      
    });
  }

  onListVendor(){
    this.vendorService.list("?product-category.code=c00").subscribe((response: any) => {
      
      if (response != false) {
        this.vendors = response;
        this.vendors.sort(function (c, d) {
          if (c.value < d.value) { return -1; }
          if (c.value > d.value) { return 1; }
          return 0;
        })
      }      
    });
  }

  onListJenis(){
    this.productJenisService.list("").subscribe((response: any) => {
      
      if (response != false) {
        this.jeniss = response;
        this.jeniss.sort(function (c, d) {
          if (c.value < d.value) { return -1; }
          if (c.value > d.value) { return 1; }
          return 0;
        })
      }      
    });
  }

  onListWarna(){
    this.productGoldColorService.list("").subscribe((response: any) => {
      
      if (response != false) {
        this.warnas = response;
        this.warnas.sort(function (c, d) {
          if (c.value < d.value) { return -1; }
          if (c.value > d.value) { return 1; }
          return 0;
        })
      }      
    });
  }

  onListKondisi(){
    this.kondisis = [{name : "Baik", value: 1},{name : "Rusak", value: 2} ]
  }
  
  clearPerhiasan(data: any){
    this.totalCart = data.length;
    this.hargaTotalPerhiasan = data.harga;
  }

  refresh(sum: any){
    if (sum == "p" && this.cartList.length != 0) {
     this.sumHarga = 0;
     for (const i of this.cartList) {
       this.sumHarga += i.hargaBB;
     }
    }
    this.hargaTotalPerhiasan = this.sumHarga
 }

 getUnit(){
  this.unitDistro = this.sessionService.getUnit()
  console.debug(this.unitDistro, "this.unitDistro")
 }
  static key = EMenuID.BUYBACKMANUALPERHIASAN
}
