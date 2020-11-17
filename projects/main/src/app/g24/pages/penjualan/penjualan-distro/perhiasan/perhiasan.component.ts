import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { CountCartService } from '../../../../services/count-cart.service';

//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductListService } from '../../../../services/product/product-list.service';
import { ProductJenisService } from '../../../../services/product/product-jenis.service';
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { PrmMarginService } from '../../../../services/parameter/prm-margin.service';
import { PrmPpnService } from '../../../../services/parameter/prm-ppn.service';

//rumus harga 
import { PricingService }  from '../../../../services/pricing.service';
import { PERHIASAN } from '../../../../sample/cart';

//cart component

@Component({
  selector: 'app-perhiasan',
  templateUrl: './perhiasan.component.html',
  styleUrls: ['./perhiasan.component.scss']
})
export class PerhiasanComponent implements OnInit {
  @Output() data = new EventEmitter();
  @Output() perhiasan = new EventEmitter();
  @Output() totalHarga = new EventEmitter();

  //placeholder 
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  // ClrDatagrid
  loadingDg: boolean = false;
  //list
  vendors = null;
  jenis = null;
  datalist = null;
  perhiasans = null;
  dataperhiasans = null;

  //params
  params = null;
  perhiasanCategory= "product-category.code=c00";
  category = "?_hash=1&product-category.code=c00&flag=stock";
  flagApp = "flag=approved";

  channel = "channel.code=ch02";
  transactionType = "transaction-type.code=t01";

  //parameter
  margin = null;
  hargaBaku = null;

  cartList = PERHIASAN;
  total = 0;

  constructor(
    //app
    private vendorService: VendorService,
    private productService: ProductListService,
    private productJenisService: ProductJenisService,

    //pricing
    private pricingService: PricingService,

    //parameter
    private prmJualService : PrmJualService,
    private prmMarginService: PrmMarginService,
    private prmPpnService : PrmPpnService,

    //ng
    private toastrService: ToastrService,

    //count cart
    public countService: CountCartService,
    //session
    private sessionService: SessionService,
  ) { }
  searchModel : any = {vendors:"all", jenisperhiasan: "all"};

  ngOnInit(): void {
    this.onListVendor();
    this.onListJenis();
  }

  onListVendor(){
    this.vendorService.list("?_hash=1&"+this.perhiasanCategory).subscribe((response: any) => {
      if (response != false) {
        this.vendors = response;
      }      
    });
  }

  onListJenis(){
    this.productJenisService.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.jenis = response;
      }      
    });
  }

  onCariPerhiasan(data)    {
    // CLR Datagrid loading
      this.loadingDg = true;

      this.params = null;
      let vendor = data.input_vendor_perhiasan;
      let jenis = data.input_jenis_perhiasan;
      let berat = data.input_berat_perhiasan;
      let id = data.input_idProduk;
      let ppn :string;

      const urlVendor = "vendor.code="+vendor;
      const urlJenis = "product-jenis.code="+jenis;
      const urlBerat = "berat="+berat;
      const urlid = "id="+id;

      let filteredperhiasan = [];
      this.params = this.category;

      // Session
      const getUnit = this.sessionService.getUnit();
      this.params = this.params+"&unit.code="+getUnit["code"];

      if (vendor != 'all') {
        this.params = this.params+"&"+urlVendor;
      }
      if (jenis == 'all'){
        this.loadingDg = false;
        return this.toastrService.error("Pilih Jenis Barang");
      }
      this.params = this.params+"&"+urlJenis;
      if (berat != null) {
        this.params = this.params+"&"+urlBerat;
      }
      if (id == "") {
        this.params = this.params;
        id = null;
      } else if (id != null ){
        this.params = this.params+"&"+urlid;
      }
      
      // product
      this.productService.list(this.params+'&_transactionType=t01&_ch=ch02').subscribe((response: any) => {
        if (response == false) {
          this.toastrService.error("Data Not Found", "Perhiasan");
          this.loadingDg = false;
          this.dataperhiasans= null;
          return;
        }  
        if (response["length"] == 0) {
          this.toastrService.error("Data Not Found", "Perhiasan");
          this.loadingDg = false;
          this.dataperhiasans= null;
          return;
        }  
        this.perhiasans = response;
        this.dataperhiasans = this.perhiasans;
        
        console.debug(this.dataperhiasans,"dataperhiasan")
        this.toastrService.success("Load "+response["length"]+" Data", "Perhiasan");
        this.loadingDg = false;
        // // pricing
        // this.prmJualService.get("?"+this.perhiasanCategory+"&"+this.flagApp).subscribe((Jualresponse: any) => {
        //   if (Jualresponse != false) {
        //     this.hargaBaku = Jualresponse.harga_baku;
        //   }
        //   this.prmPpnService.list().subscribe((PPNresponse: any) => {
        //     if (PPNresponse != false) {
        //       ppn = PPNresponse['0']['ppn']; 
        //     }      
        //     this.prmMarginService.get("?"+this.perhiasanCategory+"&"+this.channel+"&"+this.transactionType).subscribe((Marginresponse: any) => {
        //       if (Marginresponse != false) {
        //         this.margin = Marginresponse;
        //       }      
  
        //       for (let index = 0, len = this.perhiasans.length; index < len; index++) {
                
        //         this.datalist=this.pricingService.pricePerhiasan(Number(this.perhiasans[index]['berat']),this.hargaBaku,this.perhiasans[index]['baku_tukar'],this.margin['margin'],ppn);
                
        //         this.perhiasans[index].hargaJual =  Math.ceil(this.datalist/1000)*1000;
        //       }

        //       this.dataperhiasans = this.perhiasans;
        //       console.debug(this.dataperhiasans,"dataperhiasan")
        //       this.toastrService.success("Load "+response["length"]+" Data", "Perhiasan");
        //       this.loadingDg = false;
        //     });          
        //   });
        // }); 
      });  
      
     
      // const filteredperhiasan = this.getPerhiasan.filter(kamu =>  kamu.jenis == jenis && kamu.vendor == vendor);
    }

    addCart(code: any,vendor: any, jenis: any, 
      warna: any, berat: any, kadar: any, harga: any, _hash:any){
        this.perhiasan.emit(null);
        this.data.emit(null);
      this.cartList.push({
        'code': code, 
        'vendor': vendor, 
        'jenis': jenis,
        'warna' : warna,
        'berat' : berat,
        'kadar': kadar, 
        'harga': harga,
        'detail': JSON.parse(atob(_hash)),
        'qty': 1});
        console.debug(this.cartList,"ISI HASH CART")
        // harga
        this.refresh("p")
        //
        this.perhiasan.emit(this.cartList.length);
        this.data.emit(this.countService.countCart());

       // this.cekItemArray(code);
    }

    refresh(sum: any){
      this.totalHarga.emit(null);
       // harga


       if (sum == "p") {
        this.total =0;
        for (const i of this.cartList) {
          this.total += i.harga;
        }
       }
       this.totalHarga.emit(this.total);
      // this.totalHarga.emit(this.total);
    }

    cekItemArray(data: any){
      // const code = this.cartList.map(el => el.code);
      const code = this.cartList.map(el => el.detail._id);
      const ARR = code.includes(data);
      return ARR;
    }
}
