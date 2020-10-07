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
import { PrmMarginService } from '../../../../services/parameter/prm-margin.service';

//rumus harga 
import { PricingService }  from '../../../../services/pricing.service';

import { LM } from '../../../../sample/cart';
import { CountCartService } from '../../../../services/count-cart.service';

@Component({
  selector: 'app-mulia-manual',
  templateUrl: './mulia-manual.component.html',
  styleUrls: ['./mulia-manual.component.scss']
})

@DContent(MuliaManualComponent.key)
export class MuliaManualComponent implements OnInit {
  loadingDg: boolean;
  hargaBaku: number;

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
  }
  static key = EMenuID.BUYBACKMANUAL

  vendors = null;
  jenis = null;
  denoms = null;
  jumlahLM = 0
  total = 0
  muliaCategory = "?product-category.code=c05";
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  datamulias= null;
 
  searchModel : any = {vendors:"pilih", denoms: "pilih"};
  unitDetail : any
  userDetail : any
  namaProduct = "LM Non Pegadaian"

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
    // let vendor = data.input_vendor_mulia;
    // let denom = data.input_denom_mulia;
    let vendor : any;
    let denom : any;
    let harga : any;
    
    

    let cariMulia : any[] = [];
    this.hargaBaku = 0

    this.vendorService.get("?code="+data.input_vendor_mulia).subscribe((response: any) => {
        vendor = response.code
        this.denomService.get("?code="+data.input_denom_mulia).subscribe((response: any) => {
          denom = response.code
          const urlVendor = "vendor.code="+vendor;
          const urlDenom = "product-denom.code="+denom;
          const urlJenisbarang = "jenis_barang=Buyback"

        this.prmJualService.get(this.muliaCategory+"&"+urlVendor+"&"+urlJenisbarang).subscribe((Jualresponse: any) => {
          harga = Jualresponse
          this.datamulias = [{vendor : vendor, denom: denom, harga : 10000}]
          this.hargaBaku = 0
        })
      })
    })

   
    
    


    console.debug(vendor , "vendor")
    console.debug(denom , "denom")
    console.debug(this.datamulias , "denom")

    this.loadingDg = false;
    
      
  }


  addCart(vendorLM: any, denomLM: any, qtyLM: any, harga: any){
    
    
    this.total = Number(this.total) + Number(this.jumlahLM)
  }
}
