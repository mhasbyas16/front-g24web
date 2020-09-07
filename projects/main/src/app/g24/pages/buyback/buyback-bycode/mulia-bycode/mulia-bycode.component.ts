import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LM } from "projects/main/src/app/g24/sample/cart-buyback";

@Component({
  selector: 'app-mulia-bycode',
  templateUrl: './mulia-bycode.component.html',
  styleUrls: ['./mulia-bycode.component.scss']
})
export class MuliaBycodeComponent implements OnInit {

  @Input() totalIsiEmasBatangan: any;
  @Input() isiEmasBatangan: any;

  //output Emas Batangan
  @Output() totalIsiCartEmasBatangan = new EventEmitter();
  @Output() totalHargaEmasBatangan = new EventEmitter();

  cartList =  LM;
  sumHarga: number;

  constructor() { }

  ngOnInit(): void {
  }
  
  addToCart(code, vendor, denom, noSeri ){
    this.cartList.push({
      "code" : code,
      "vendor": vendor,
      "denom" : denom,
      "noSeri" : noSeri,
      "hargaBB" : 20000000,
      
    })
    this.totalIsiCartEmasBatangan.emit(this.cartList.length)
    this.refresh("p")
  }

  cekItemArray(data: any){
    // const code = this.cartList.map(el => el.code);
    const code = this.cartList.map(el => el.code);
    const ARR = code.includes(data);
    return ARR;
  }

  refresh(sum: any){
    this.totalHargaEmasBatangan.emit(null);
     // harga
     if (sum == "p") {
      this.sumHarga = 0;
      for (const i of this.cartList) {
        this.sumHarga += i.hargaBB;
      }
     }
     this.totalHargaEmasBatangan.emit(this.sumHarga)
     ;
    // this.totalHarga.emit(this.total);
  }
}
