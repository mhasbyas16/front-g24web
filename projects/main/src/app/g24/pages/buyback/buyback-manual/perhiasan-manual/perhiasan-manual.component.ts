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
  ) { }

  ngOnInit(): void {
    this.loadFormData();
    this.onListUnit();
    this.onListKadar();
    this.onListVendor();
    this.onListWarna();
    this.onListJenis();
    this.onListKondisi();
  }


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
  cartList = PERHIASAN

  loadFormData(){ 
    this.dataPerhiasan = new FormGroup({
      unitTransaksi: new FormControl ("", [Validators.required]),
      
    })

   
  }

  addToCart(data){
    
    let detail : any
    detail = {


    }
    console.debug( data ,"data")
    
  }

  tampilHarga(val){
    this.loadingDg = true
    this.dataperhiasans = null
    let unitCode = val.input_unit_transaksi
    let unitName: any;
    let unitDet: any;
    let vendorCode = val.input_vendor_product
    let vendorName: any;
    let vendorDet: any;
    let jenisCode = val.input_jenis_perhiasan
    let jenisName: any;
    let jenisDet: any;
    let kadarCode = val.input_kadar_product
    let kadarName: any;
    let kadarDet:any;
    let warnaCode = val.input_warna_perhiasan
    let warnaName: any;
    let warnaDet: any;
    let productCategory : any;

    let denomValue: any;
    let prmJual : any;

    if (unitCode == "") {
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

    this.productCategoryService.get("?code=c05").subscribe((response: any) => {
      productCategory = response
      this.unitService.get("?code="+unitCode).subscribe((response: any) => {
        unitName = response.nama;
        unitDet = response
        this.vendorService.get("?code="+vendorCode).subscribe((response: any) => {
          vendorName = response.name;
          vendorDet = response
          this.productJenisService.get("?code="+jenisCode).subscribe((response: any) => {
            jenisName = response.name;
            jenisDet = response
            this.productGoldColorService.get("?code="+warnaCode).subscribe((response: any) => {
              warnaName = response.name;
              warnaDet = response
              this.productPurityService.get("?code="+kadarCode).subscribe((response: any) => {
                kadarName = response.name;
                kadarDet = response
                this.productPurityService.get("?code="+kadarCode).subscribe((response: any) => {
                  kadarName = response.name;
                  kadarDet = response
                  this.prmJualService.get("?"+this.productCategory+"&flag=approved").subscribe((BBresponse: any) => {
                    this.hargaDasarBuyback = BBresponse.harga_buyback
                    // this.hargaBB = this.pricingService.buybackPricePerhiasan(val.input_kondisi_perhiasan, kadarName, val.input_beratPerhiasan,this.hargaDasarBuyback )
                    this.hargaBB = this.pricingService.buybackPricePerhiasan(val.input_kondisi_perhiasan, Number(kadarName), val.input_beratPerhiasan ,Number(this.hargaDasarBuyback) )
                    
                    this.dataperhiasans = [{
                                    unitCode: unitCode, 
                                    unitName : unitName, 
                                    vendorName : vendorName, 
                                    vendorCode: vendorCode, 
                                    jenisCode : jenisCode, 
                                    jenisName : jenisName,
                                    warnaCode : warnaCode,
                                    warnaName : warnaName,
                                    kadarCode : kadarCode,
                                    kadarName : kadarName,
                                    berat : val.input_beratPerhiasan,
                                    kondisi : val.input_kondisi_perhiasan,
                                    namaNasabahTransaksi : val.input_namaNasabahPembelian, 
                                    alamatTransaksiPembelian : val.input_alamatTransaksiPembelian,
                                    tanggalTransaksiPembelian : val.input_tanggalTransaksiPembelian,
                                    hargaBB : this.hargaBB,
                                    productCategory : productCategory
                                  }]
                    console.debug(val, "value")
                    console.debug(this.dataperhiasans, "data")
                    this.loadingDg = false
                  })
                })
              })
            })
          })
        })
      })
    })
    

    
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

 

  static key = EMenuID.BUYBACKMANUALPERHIASAN
}
