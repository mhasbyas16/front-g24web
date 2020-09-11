import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';
import { PERHIASAN } from "projects/main/src/app/g24/sample/cart-buyback";
import { PricingService } from '../../../../services/pricing.service';
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';


@Component({
  selector: 'app-perhiasan-bycode',
  templateUrl: './perhiasan-bycode.component.html',
  styleUrls: ['./perhiasan-bycode.component.scss']
})
export class PerhiasanBycodeComponent implements OnInit {
  
  @Output() perhiasan = new EventEmitter();
  //ouput Perhiasan
  @Output() totalIsiCartPerhiasan = new EventEmitter();
  @Output() totalHargaPerhiasan = new EventEmitter();

  
  @Input() totalIsiPerhiasan: any;
  @Input() isiPerhiasan: any;

  cekHarga : any = 0
  hargaBB: number;
  cartList = PERHIASAN
  tampilKondisi: string;
  sumHarga : any ;
  hargaDasarBuyback : any ;

  productCategory= "product-category.code=c00";
  loadingDg: boolean;

  constructor(
    //pricing
    private pricingService: PricingService,
    private prmJualService: PrmJualService

  ) { }

  ngOnInit(): void {
    
  }
  
  hitungHargaBB(kondisi: any , code : any, kadar : any, berat: any){
    this.loadingDg = true
    this.hargaBB = 0
    this.prmJualService.get("?"+this.productCategory+"&flag=approved").subscribe((BBresponse: any) => {
        this.hargaDasarBuyback = BBresponse.harga_buyback
        
    })

    if (kondisi == 1) {
      this.tampilKondisi = "Baik"
    }else if(kondisi == 2){
      this.tampilKondisi = "Rusak"
    }else{
      this.hargaBB = 0
    }
    this.hargaBB = this.pricingService.buybackPricePerhiasan(kondisi, kadar, berat,this.hargaDasarBuyback )
    
   for (let index = 0; index < this.isiPerhiasan.length; index++) {
    if (this.isiPerhiasan[index]["code"] == code) {
      this.isiPerhiasan[index]['hargaBB'] =  this.hargaBB
    }
   }
   this.loadingDg = false
  }

  addToCart(code, jenis, berat, kadar, hargaTbb ){
    this.cartList.push({
      "code" : code,
      "jenis" : jenis,
      "berat" : berat,
      "kadar" : kadar,
      "kondisi" : this.tampilKondisi,
      "hargaBB" : hargaTbb
    })
    console.debug(this.cartList, "isi cart")
    this.totalIsiCartPerhiasan.emit(this.cartList.length)
    
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
    this.totalHargaPerhiasan.emit(null);
     // harga
     if (sum == "p") {
      this.sumHarga = 0;
      for (const i of this.cartList) {
        this.sumHarga += i.hargaBB;
      }
     }
     this.totalHargaPerhiasan.emit(this.sumHarga);
    // this.totalHarga.emit(this.total);
  }

}
