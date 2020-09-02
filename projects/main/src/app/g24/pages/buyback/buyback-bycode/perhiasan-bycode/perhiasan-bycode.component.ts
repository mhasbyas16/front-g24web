import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';
import { PERHIASAN } from "projects/main/src/app/g24/sample/cart-buyback";

@Component({
  selector: 'app-perhiasan-bycode',
  templateUrl: './perhiasan-bycode.component.html',
  styleUrls: ['./perhiasan-bycode.component.scss']
})
export class PerhiasanBycodeComponent implements OnInit {
  
  @Output() perhiasan = new EventEmitter();
  @Output() totalIsiCartPerhiasan = new EventEmitter();
  @Output() totalHargaPerhiasan = new EventEmitter();

  @Input() totalIsiPerhiasan: any;
  @Input() isiPerhiasan: any;

  cekHarga : any = 0
  hargaBB: number;
  cartList = PERHIASAN
  tampilKondisi: string;
  sumHarga : any ;

  constructor() { }

  ngOnInit(): void {
    
  }
  
  hitungHargaBB(kondisi , code){
    this.hargaBB = 0
    let cekKondisi = 0;
    cekKondisi = kondisi;
    
    if (cekKondisi == 1) {
      this.hargaBB = 2500000
      this.tampilKondisi = "Baik"
    }else if(cekKondisi == 2){
      this.hargaBB = 2300000
      this.tampilKondisi = "Rusak"
    }else{
      this.hargaBB = 0
    }
   for (let index = 0; index < this.isiPerhiasan.length; index++) {
    if (this.isiPerhiasan[index]["code"] == code) {
      this.isiPerhiasan[index]['hargaBB'] =  this.hargaBB
    }
   }
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
    if (cekHargaBB == 0 || cekHargaBB == null) {
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
