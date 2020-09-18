import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';
import { DINAR } from "projects/main/src/app/g24/sample/cart-buyback";
import { PricingService } from '../../../../services/pricing.service';
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';

@Component({
  selector: 'app-dinar-bycode',
  templateUrl: './dinar-bycode.component.html',
  styleUrls: ['./dinar-bycode.component.scss']
})
export class DinarBycodeComponent implements OnInit {

  @Output() dinar = new EventEmitter();
  //ouput Perhiasan
  @Output() totalIsiCartDinar = new EventEmitter();
  @Output() totalHargaDinar = new EventEmitter();

  
  @Input() totalIsiDinar: any;
  @Input() isiDinar: any;

  productCategory= "product-category.code=c06";
  loadingDg: boolean;

  cekHarga : any = 0
  hargaBB: number;
  cartList = DINAR
  tampilKondisi: string;
  sumHarga : any ;
  hargaDasarBuyback : any ;

  constructor(
    private pricingService: PricingService,
    private prmJualService: PrmJualService
  ) { }

  ngOnInit(): void {
  }

  hitungHargaBB(kondisi: any , code : any, kadar : any, berat: any){
    this.loadingDg = true
    this.hargaBB = 0
    // this.prmJualService.get("?"+this.productCategory+"&flag=approved").subscribe((BBresponse: any) => {
    //     this.hargaDasarBuyback = BBresponse.harga_buyback
        
    // })

    if (kondisi == 1) {
      this.tampilKondisi = "Baik"
      this.hargaBB = 320000
      console.debug(this.hargaBB)
    }else if(kondisi == 2){
      this.tampilKondisi = "Rusak"
      this.hargaBB = 210000
    }else{
      this.hargaBB = 0
    }
    // this.hargaBB = this.pricingService.buybackPricePerhiasan(kondisi, kadar, berat,this.hargaDasarBuyback )
    
   for (let index = 0; index < this.isiDinar.length; index++) {
    if (this.isiDinar[index]["code"] == code) {
      this.isiDinar[index]['hargaBB'] =  this.hargaBB
    }
   }
   this.loadingDg = false
  }

  addToCart(code, vendor,denom, hargaTbb, detail ){
    this.cartList.push({
      "code" : code,
      "vendor" : vendor,
      "denom" : denom,
      "kondisi" : this.tampilKondisi,
      'detail': detail,
      "hargaBB" : hargaTbb
    })
    console.debug(this.cartList, "isi cart")
    this.totalIsiCartDinar.emit(this.cartList.length)
    
    this.refresh("p")
  }

  cekHitungHarga(cekHargaBB: any){
    if (cekHargaBB == 0 || cekHargaBB == null || isNaN(cekHargaBB) ) {
      this.cekHarga = 0
      return this.cekHarga
    }else{
      this.cekHarga = 1
      return this.cekHarga
    }
  }

  cekItemArray(data: any){
    // const code = this.cartList.map(el => el.code);
    const code = this.cartList.map(el => el.code);
    const ARR = code.includes(data);
    return ARR;
  }

  refresh(sum: any){
    this.totalHargaDinar.emit(null);
     // harga
     if (sum == "p") {
      this.sumHarga = 0;
      for (const i of this.cartList) {
        this.sumHarga += i.hargaBB;
      }
     }
     this.totalHargaDinar.emit(this.sumHarga);
    // this.totalHarga.emit(this.total);
  }
}
