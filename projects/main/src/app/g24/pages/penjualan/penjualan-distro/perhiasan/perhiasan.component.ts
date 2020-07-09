import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import { NgForm, Form, FormGroup } from '@angular/forms';

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

  onCariPerhiasan(data)
    {
      let vendor = data.input_vendor_perhiasan;
      let jenis = data.input_jenis_perhiasan;
      let berat = data.input_berat_perhiasan;
      let ppn :string;

      const urlVendor = "vendor.code="+vendor;
      const urlJenis = "product-jenis.code="+jenis;
      const urlBerat = "berat="+berat;

      let filteredperhiasan = [];
      if (vendor != 'all' && jenis != 'all' && berat != null) {
        this.params = this.category+"&"+urlVendor+"&"+urlJenis+"&"+urlBerat;
         // filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.jenis == jenis && produk.vendor == vendor && produk.berat == berat);
      }else if (vendor == 'all' && jenis != 'all' && berat != null) {
        this.params = this.category+"&"+urlJenis+"&"+urlBerat;
         // filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.jenis == jenis && produk.berat == berat)
      }else if (vendor != 'all' && jenis == 'all' && berat != null) {
        this.params = this.category+"&"+urlVendor+"&"+urlBerat;
          //filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.vendor == vendor && produk.berat == berat)
      }else if (vendor != 'all' && jenis != 'all' && berat == null) {
        this.params = this.category+"&"+urlVendor+"&"+urlJenis;
         // filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.vendor == vendor && produk.jenis == jenis)
      }else if (vendor != 'all' && jenis == 'all' && berat == null) {
        this.params = this.category+"&"+urlVendor;
          //filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.vendor == vendor )
      }else if (vendor == 'all' && jenis != 'all' && berat == null) {
        this.params = this.category+"&"+urlJenis;
          //filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.jenis == jenis )
      }else if (vendor == 'all' && jenis == 'all' && berat != null) {
        this.params = this.category+"&"+urlBerat;
        //filteredperhiasan = this.getPerhiasan.filter(produk =>  produk.berat == berat )
      }else if (vendor == 'all' && jenis == 'all' && berat == null ) {
        this.params = this.category;
          //filteredperhiasan = this.getPerhiasan
      }else{
        
      }

      
      // product
      this.productService.list(this.params).subscribe((response: any) => {
        if (response == false) {
            // error jika tidak ada data
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
                
                this.datalist=this.pricingService.pricePerhiasan(Number(this.perhiasans[index]['berat']),this.hargaBaku['0']['harga-jual'],this.perhiasans[index]['baku-tukar'],this.margin['0']['margin'],ppn);
                
                this.perhiasans[index].hargaJual =  Math.ceil(this.datalist/1000)*1000;
              }

              this.dataperhiasans = this.perhiasans;
            });          
          });
        }); 
      });  
      
     
      // const filteredperhiasan = this.getPerhiasan.filter(kamu =>  kamu.jenis == jenis && kamu.vendor == vendor);
      
     
      console.log(jenis);
      console.log(vendor);
      console.log(berat);
      // console.log(this.getPerhiasan);
      console.log(filteredperhiasan.length);
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
      const code = this.cartList.map(el => el.code);
      const ARR = code.includes(data);
      return ARR;
    }
}
