import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LM } from "projects/main/src/app/g24/sample/cart-buyback";
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { PricingService } from '../../../../services/pricing.service';

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
  hargaBB : any;

  productCategory= "product-category.code=c05";

  constructor(

    private pricingService: PricingService,
    private prmJualService: PrmJualService

  ) { }

  ngOnInit(): void {
  }
  
  addToCart(code, vendor, denom, noSeri,hargaBB ){
    this.cartList.push({
      "code" : code,
      "vendor": vendor,
      "denom" : denom,
      "noSeri" : noSeri,
      "hargaBB" : hargaBB,
      
    })
    this.totalIsiCartEmasBatangan.emit(this.cartList.length)
    this.refresh("p")
   
  }
  
  hitungHargaBB(){
      
        console.debug(this.totalIsiEmasBatangan, "sada")
      
    //   this.prmJualService.get("?"+this.productCategory+"&flag=approved"+"&vendor="+codeVendor).subscribe((BBresponse: any) => {
    //   this.hargaBB = BBresponse
    //   console.debug(this.hargaBB, "wewe")
      
    // })
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
