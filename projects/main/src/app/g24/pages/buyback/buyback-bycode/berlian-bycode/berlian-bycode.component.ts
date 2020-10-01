import { Component, OnInit, Input, Output,  EventEmitter } from '@angular/core';
import { BERLIAN } from "projects/main/src/app/g24/sample/cart-buyback";
import { PricingService } from '../../../../services/pricing.service';
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';

@Component({
  selector: 'app-berlian-bycode',
  templateUrl: './berlian-bycode.component.html',
  styleUrls: ['./berlian-bycode.component.scss']
})
export class BerlianBycodeComponent implements OnInit {

  @Output() berlian = new EventEmitter();
  //ouput Perhiasan
  @Output() totalIsiCartBerlian = new EventEmitter();
  @Output() totalHargaBerlian = new EventEmitter();

  @Input() totalIsiBerlian: any;
  @Input() isiBerlian: any;

  cekHarga : any = 0
  hargaBB: number;
  cartList = BERLIAN
  tampilKondisi: string;
  sumHarga : any ;
  hargaDasarBuyback : any ;

  productCategory= "product-category.code=c01";
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
    
   for (let index = 0; index < this.isiBerlian.length; index++) {
    if (this.isiBerlian[index]["code"] == code) {
      this.isiBerlian[index]['hargaBB'] =  this.hargaBB
    }
   }
   this.loadingDg = false
  }

  addToCart(code, jenis, berat, kadar, hargaTbb, detail, idTransaction ){
    this.cartList.push({
      "code" : code,
      "jenis" : jenis,
      "berat" : berat,
      "kadar" : kadar,
      "kondisi" : this.tampilKondisi,
      'detail': detail,
      "hargaBB" : hargaTbb,
      "idTransaction" : idTransaction
    })
    console.debug(this.cartList, "isi cart")
    this.totalIsiCartBerlian.emit(this.cartList.length)
    
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
    this.totalHargaBerlian.emit(null);
    
     if (sum == "p") {
      this.sumHarga = 0;
      for (const i of this.cartList) {
        this.sumHarga += i.hargaBB;
      }
     }
     this.totalHargaBerlian.emit(this.sumHarga);
    
  }
}
