import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { LM }  from "projects/main/src/app/g24/sample/cart-buyback-manual-lm"

@Component({
  selector: 'app-cart-buyback-manual-lm',
  templateUrl: './cart-buyback-manual-lm.component.html',
  styleUrls: ['./cart-buyback-manual-lm.component.scss']
})
export class CartBuybackManualLmComponent implements OnInit {

  
  @Input() totalCart : any;
  @Input() hargaTotalEmasBatangan : any 
  @Output() clearEmasBatangan:any = new EventEmitter();
  @Output() clearParentCart:any = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    this.onCartLength()
    
  }
  cartLogam = LM;
  cartModal : any

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
    this.hargaTotalEmasBatangan = 0
    this.clearEmasBatangan.emit({length:0,harga:0});
  }
  
  removeItemEmasBatangan(key: any, harga:any ){
    //pengurangan jumlah item
    this.cartLogam.splice(key,1);

    //pengurangan jumlah cart
    this.totalCart-=1;
    
    this.hargaTotalEmasBatangan = this.hargaTotalEmasBatangan - harga
    this.clearEmasBatangan.emit({length:this.cartLogam.length, harga:this.hargaTotalEmasBatangan });

    if (this.totalCart == 0) {
      console.debug("totallll 0");
      this.clearParentCart.emit(0);
    }
  }
}
