import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { PERHIASAN } from "projects/main/src/app/g24/sample/cart-buyback";

@Component({
  selector: 'app-perhiasan-bycode',
  templateUrl: './perhiasan-bycode.component.html',
  styleUrls: ['./perhiasan-bycode.component.scss']
})
export class PerhiasanBycodeComponent implements OnInit {

  @Input() total: any;
  @Input() totalIsiPerhiasan: any;
  @Input() isiPerhiasan: any;
  cekHarga : any = 0

  hargaBB: number;
  

  constructor() { }

  ngOnInit(): void {
    
  }
  
  
  cekItemArray(cekHargaBB: any){
    if (cekHargaBB == 0 || cekHargaBB == null) {
      this.cekHarga = 0
      return this.cekHarga
    }else{
      this.cekHarga = 1
      return this.cekHarga
    }
  }
  
  
  hitungHargaBB(kondisi , code){
    this.hargaBB = 0
    let cekKondisi = 0;
    cekKondisi = kondisi;
   
    if (cekKondisi == 1) {
      this.hargaBB = 2500000
    }else if(cekKondisi == 2){
      this.hargaBB = 2300000
    }else{
      this.hargaBB = 0
    }
   for (let index = 0; index < this.isiPerhiasan.length; index++) {
    if (this.isiPerhiasan[index]["code"] == code) {
      this.isiPerhiasan[index]['hargaBB'] =  this.hargaBB
    }
   }
  }

  addToCart(detail){
    console.debug(detail)
  }

}
