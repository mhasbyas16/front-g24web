import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { NgForm, Form, FormGroup } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

// Database
import { VendorService } from '../../../../services/vendor.service';
import { ProductService } from '../../../../services/product/product.service';
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
  category = "?product-category.code=00";

  //parameter
  margin = null;
  hargaBaku = null;

  cartList = PERHIASAN;
  total = 0;

  constructor(
    //app
    private vendorService: VendorService,
    private productService: ProductService,
    private productJenisService: ProductJenisService,

    //pricing
    private pricingService: PricingService,

    //parameter
    private prmJualService : PrmJualService,
    private prmMarginService: PrmMarginService,
    private prmPpnService : PrmPpnService,

    //ng
    private toastrService: ToastrService,
  ) { }
  searchModel : any = {vendors:"all", jenisperhiasan: "all"};

  ngOnInit(): void {
    this.onListVendor();
    this.onListJenis();
  }

  onListVendor(){
    this.vendorService.list("?_hash=1").subscribe((response: any) => {
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


      // if (vendor != 'all' && jenis != 'all' && berat != null && id != null) {
      //   this.params = this.category+"&"+urlVendor+"&"+urlJenis+"&"+urlBerat+"&"+urlid;
      //    // filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.jenis == jenis && produk.vendor == vendor && produk.berat == berat);
      // }else if (vendor == 'all' && jenis != 'all' && berat != null && id != null) {
      //   this.params = this.category+"&"+urlJenis+"&"+urlBerat+"&"+urlid;
      //    // filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.jenis == jenis && produk.berat == berat)
      // }else if (vendor != 'all' && jenis == 'all' && berat != null && id != null) {
      //   this.params = this.category+"&"+urlVendor+"&"+urlBerat+"&"+urlid;
      //     //filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.vendor == vendor && produk.berat == berat)
      // }else if (vendor != 'all' && jenis != 'all' && berat == null && id != null) {
      //   this.params = this.category+"&"+urlVendor+"&"+urlJenis+"&"+urlid;
      //    // filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.vendor == vendor && produk.jenis == jenis)
      // }else if (vendor != 'all' && jenis != 'all' && berat != null && id == null){
      //   this.params = this.category+"&"+urlVendor+"&"+urlJenis+"&"+urlBerat;
      // }else if (vendor != 'all' && jenis == 'all' && berat == null) {
      //   this.params = this.category+"&"+urlVendor;
      //     //filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.vendor == vendor )
      // }else if (vendor == 'all' && jenis != 'all' && berat == null) {
      //   this.params = this.category+"&"+urlJenis;
      //     //filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.jenis == jenis )
      // }else if (vendor == 'all' && jenis == 'all' && berat != null) {
      //   this.params = this.category+"&"+urlBerat;
      //   //filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.berat == berat )
      // }else if (vendor == 'all' && jenis == 'all' && berat == null ) {
      //   this.params = this.category;
      //     //filteredperhiasan = this.getPerhiasan
      // }else{
        
      // }

      
      // product
      this.productService.list(this.params).subscribe((response: any) => {
        if (response == false) {
          this.toastrService.error("Data Not Found", "Perhiasan");
          this.loadingDg = false;
          return;
        }  
        if (response["length"] == 0) {
          this.toastrService.error("Data Not Found", "Perhiasan");
          this.loadingDg = false;
          return;
        }  
        this.perhiasans = response;
        // pricing
        this.prmJualService.list("?product-category.code=00").subscribe((Jualresponse: any) => {
          if (Jualresponse != false) {
            this.hargaBaku = Jualresponse;
          }
          this.prmPpnService.list().subscribe((PPNresponse: any) => {
            if (PPNresponse != false) {
              ppn = PPNresponse['0']['ppn'];
            }      
            this.prmMarginService.list().subscribe((Marginresponse: any) => {
              if (Marginresponse != false) {
                this.margin = Marginresponse;
              }      
  
              for (let index = 0, len = this.perhiasans.length; index < len; index++) {
                
                this.datalist=this.pricingService.pricePerhiasan(Number(this.perhiasans[index]['berat']),this.hargaBaku['0']['harga-baku'],this.perhiasans[index]['baku-tukar'],this.margin['0']['margin'],ppn);
                
                this.perhiasans[index].hargaJual =  Math.ceil(this.datalist/1000)*1000;
              }

              this.dataperhiasans = this.perhiasans;
              this.toastrService.success("Load "+response["length"]+" Data", "Perhiasan");
              this.loadingDg = false;
            });          
          });
        }); 
      });  
      
     
      // const filteredperhiasan = this.getPerhiasan.filter(kamu =>  kamu.jenis == jenis && kamu.vendor == vendor);
    }

    addCart(code: any,vendor: any, jenis: any, 
      warna: any, berat: any, kadar: any, harga: any){
      
      this.cartList.push({
        'code': code, 
        'vendor': vendor, 
        'jenis': jenis,
        'warna' : warna,
        'berat' : berat,
        'kadar': kadar, 
        'harga': harga,
        'qty': 1});

        // harga
        this.refresh(harga, "p")
        //
        this.perhiasan.emit(this.cartList.length);
        this.data.emit(this.cartList.length);

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
      const code = this.cartList.map(el => el.code);
      const ARR = code.includes(data);
      return ARR;
    }
}
