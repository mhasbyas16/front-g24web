import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { LM, GS, PERHIASAN }  from "projects/main/src/app/g24/sample/cart-buyback-manual-lm"


@Component({
  selector: 'app-cart-buyback-manual-lm',
  templateUrl: './cart-buyback-manual-lm.component.html',
  styleUrls: ['./cart-buyback-manual-lm.component.scss']
})
export class CartBuybackManualLmComponent implements OnInit {

  
  @Input() totalCart : any;
  @Input() hargaTotalEmasBatangan : any = 0
  @Input() hargaTotalSouvenir : any = 0
  @Input() hargaTotalPerhiasan : any = 0
  @Input() maxGrDay : any ;
  @Output() clearEmasBatangan:any = new EventEmitter();
  @Output() clearSouvenir:any = new EventEmitter();
  @Output() clearPerhiasan:any = new EventEmitter();
  @Output() clearParentCart:any = new EventEmitter();
  @Output() cartTotalBerat:any = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    this.onCartLength()
    
    
  }
  cartLogam = LM;
  cartSouvenir = GS;
  cartPerhiasan = PERHIASAN;
  
  cartModal : any
  hargaTotal  = 0

  kamu : any

  modalView(isi: any){
    this.cartModal = isi;
    
  }

  onCartLength(){
    this.kamu = LM.length
    console.debug(this.kamu)
  }
  removeCart(){
    this.totalCart = 0
    this.cartLogam.splice(0);
    this.hargaTotalEmasBatangan = null
    this.clearEmasBatangan.emit({length:0,harga:0});
    this.cartSouvenir.splice(0);
    this.hargaTotalSouvenir = null
    this.clearSouvenir.emit({length:0,harga:0});
    this.cartPerhiasan.splice(0);
    this.hargaTotalPerhiasan = null
    this.clearPerhiasan.emit({length:0,harga:0});
  }
  
  removeItemEmasBatangan(key: any, harga:any, denom: any ){
    //pengurangan jumlah item
    this.cartLogam.splice(key,1);

    //pengurangan jumlah cart
    this.totalCart-=1;
    this.maxGrDay = this.maxGrDay + Number(denom)
    this.cartTotalBerat.emit(this.maxGrDay);

    console.debug(this.maxGrDay, "this.maxGrDay")
    this.hargaTotalEmasBatangan = this.hargaTotalEmasBatangan - harga
    this.clearEmasBatangan.emit({length:this.cartLogam.length, harga:this.hargaTotalEmasBatangan });

    if (this.totalCart == 0) {
      console.debug("totallll 0");
      this.clearParentCart.emit(0);
    }
  }

  removeItemSouvenir(key: any, harga:any, denom: any ){
    //pengurangan jumlah item
    this.cartSouvenir.splice(key,1);
    //pengurangan jumlah cart
    this.totalCart-=1;
    this.hargaTotalSouvenir = this.hargaTotalSouvenir - harga
    this.clearSouvenir.emit({length:this.cartSouvenir.length, harga:this.hargaTotalSouvenir });

    if (this.totalCart == 0) {
      console.debug("totallll 0");
      this.clearParentCart.emit(0);
    }
  }

  removeItemPerhiasan(key: any, harga:any ){
    //pengurangan jumlah item
    this.cartPerhiasan.splice(key,1);
    //pengurangan jumlah cart
    this.totalCart-=1;
    this.hargaTotalPerhiasan = this.hargaTotalPerhiasan - harga
    this.clearPerhiasan.emit({length:this.cartPerhiasan.length, harga:this.hargaTotalPerhiasan });

    if (this.totalCart == 0) {
      console.debug("totallll 0");
      this.clearParentCart.emit(0);
    }
  }

 
}
