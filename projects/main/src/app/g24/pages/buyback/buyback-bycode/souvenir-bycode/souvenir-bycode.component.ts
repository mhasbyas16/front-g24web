import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';
import { GS } from "projects/main/src/app/g24/sample/cart-buyback";
import { PricingService } from '../../../../services/pricing.service';
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';

@Component({
  selector: 'app-souvenir-bycode',
  templateUrl: './souvenir-bycode.component.html',
  styleUrls: ['./souvenir-bycode.component.scss']
})
export class SouvenirBycodeComponent implements OnInit {

  @Output() souvenir = new EventEmitter();
  //ouput Perhiasan
  @Output() totalIsiCartSouvenir = new EventEmitter();
  @Output() totalHargaSouvenir = new EventEmitter();

  
  @Input() totalIsiSouvenir: any;
  @Input() isiSouvenir: any;

  cekHarga : any = 0
  hargaBB: number;
  cartList = GS
  tampilKondisi: string;
  sumHarga : any ;
  hargaDasarBuyback : any ;

  productCategory= "product-category.code=c02";
  loadingDg: boolean;

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
    
   for (let index = 0; index < this.isiSouvenir.length; index++) {
    if (this.isiSouvenir[index]["code"] == code) {
      this.isiSouvenir[index]['hargaBB'] =  this.hargaBB
    }
   }
   this.loadingDg = false
  }

  addToCart(code, vendor,denom, series, hargaTbb, detail, idTransaction ){
    this.cartList.push({
      "code" : code,
      "vendor" : vendor,
      "denom" : denom,
      "series" : series,
      "kondisi" : this.tampilKondisi,
      "detail" : detail,
      "hargaBB" : hargaTbb,
      "idTransaction" : idTransaction
    })
    console.debug(this.cartList, "isi cart")
    this.totalIsiCartSouvenir.emit(this.cartList.length)
    
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
    this.totalHargaSouvenir.emit(null);
     // harga
     if (sum == "p") {
      this.sumHarga = 0;
      for (const i of this.cartList) {
        this.sumHarga += i.hargaBB;
      }
     }
     this.totalHargaSouvenir.emit(this.sumHarga);
    // this.totalHarga.emit(this.total);
  }


}
