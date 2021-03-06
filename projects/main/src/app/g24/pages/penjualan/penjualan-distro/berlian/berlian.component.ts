import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { CountCartService } from '../../../../services/count-cart.service';

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductListService } from '../../../../services/product/product-list.service';
import { ProductJenisService } from '../../../../services/product/product-jenis.service';
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { PrmMarginService } from '../../../../services/parameter/prm-margin.service';
import { PrmPpnService } from '../../../../services/parameter/prm-ppn.service';
//
import { BERLIAN } from '../../../../sample/cart';
import { PricingService }  from '../../../../services/pricing.service';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';

@Component({
  selector: 'app-berlian',
  templateUrl: './berlian.component.html',
  styleUrls: ['./berlian.component.scss']
})
export class BerlianComponent implements OnInit {

  @Output() data = new EventEmitter();
  @Output() berlian = new EventEmitter();
  @Output() totalHarga = new EventEmitter();

  selected:any;

  //placeholder 
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  // ClrDatagrid
  loadingDg: boolean = false;
  //params
  params = null;
  berlianCategory= "product-category.code=c03";
  category = "?_hash=1&product-category.code=c03&flag=stock";

  channel = "channel.code=ch02";
  transactionType = "transaction-type.code=t01";
  flagApp = "flag=approved";


  //list
  vendors = null;
  jenis = null;
  berlians = null;
  databerlians = null;
  datalist = null;

  cartList = BERLIAN;
  total = 0;

  //parameter
  margin = null;
  hargaBaku = null;
  constructor(
    private vendorService: VendorService,
    private productJenisService: ProductJenisService,
    private productService: ProductListService,

    private toastrService: ToastrService,

    //count cart
    private countService: CountCartService,
    //session
    private sessionService: SessionService,
    //pricing
    private pricingService: PricingService,

    //parameter
    private prmJualService : PrmJualService,
    private prmMarginService: PrmMarginService,
    private prmPpnService : PrmPpnService,

  ) { }
  searchModel : any = {vendors:"all", jenisperhiasan: "all"};

  ngOnInit(): void {
    this.onListVendor();
    this.onListJenis();
  }

  onListVendor(){
    this.vendorService.list("?_hash=1&"+this.berlianCategory).subscribe((response: any) => {
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

  onCariBerlian(data)    {
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
      if (jenis != 'all'){
        this.params = this.params+"&"+urlJenis;
      }
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
          this.toastrService.error("Data Not Found", "Berlian");
          this.loadingDg = false;
          this.databerlians = null;
          return;
        }  
        if (response["length"] == 0) {
          this.toastrService.error("Data Not Found", "Berlian");
          this.loadingDg = false;
          this.databerlians = null;
          return;
        }  
        this.berlians = response;
        this.databerlians = this.berlians;
              this.toastrService.success("Load "+response["length"]+" Data", "Berlian");
              this.loadingDg = false;
        // pricing
        // this.prmJualService.get("?"+this.berlianCategory+"&flag=approved").subscribe((Jualresponse: any) => {
        //   if (Jualresponse != false) {
        //     this.hargaBaku = Jualresponse.harga_baku;
        //   }
        //   this.prmPpnService.list().subscribe((PPNresponse: any) => {
        //     if (PPNresponse != false) {
        //       ppn = PPNresponse['0']['ppn'];
        //     }      
        //     this.prmMarginService.get("?"+this.berlianCategory+"&"+this.channel+"&"+this.transactionType+"&"+this.flagApp).subscribe((Marginresponse: any) => {
        //       if (Marginresponse != false) {
        //         this.margin = Marginresponse;
        //       }      
  
        //       for (let index = 0, len = this.berlians.length; index < len; index++) {
        //        this.datalist=this.pricingService.priceBatuMulia(
        //          this.hargaBaku,
        //          this.berlians[index]['product-purity']['name'],
        //          Number(this.berlians[index]['berat']),
        //          this.margin['margin'],
        //          Number(this.berlians[index]['hppBatu']),
        //          Number(this.margin['margin_batu']),
        //          Number(this.berlians[index]['hppBerlian']),
        //          Number(this.margin['margin_berlian']),
        //          Number(this.berlians[index]['ongkosPembuatan']));
        //         // harga_baku:any,kadar:any,berat:any,margin:any,hppBatu:any,marginBatu:any,hppBerlian:any,marginBerlian:any,ongkos:any
        //         this.datalist = this.datalist*((100/100)+(Number(ppn)/100));
        //         this.berlians[index].hargaJual = Math.ceil(this.datalist/10000)*10000  ;
        //         //Math.ceil(this.datalist/100000)*100000
        //         console.debug(this.berlians,"itungan")
        //       }

        //       this.databerlians = this.berlians;
        //       this.toastrService.success("Load "+response["length"]+" Data", "Berlian");
        //       this.loadingDg = false;
        //     });          
        //   });
        // }); 
      }); 
    }

    addCart(code: any,vendor: any, jenis: any, 
      warna: any, berat: any, kadar: any, harga: any, _hash:any){
      
      this.cartList.push({
        'code': code, 
        'vendor': vendor, 
        'jenis': jenis,
        'warna' : warna,
        'berat' : berat,
        'kadar': kadar, 
        'harga': harga,
        'detail':JSON.parse(atob(_hash)),
        'qty': 1});

        // harga
        this.refresh(harga, "p")
        //
        this.berlian.emit(this.cartList.length);
        this.data.emit(this.countService.countCart());

       // this.cekItemArray(code);
    }

    refresh(harga: any, sum: any){
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
