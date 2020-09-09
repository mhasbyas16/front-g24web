import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PERHIASAN, LM, GS, BERLIAN, DINAR }  from "projects/main/src/app/g24/sample/cart-buyback"

@Component({
  selector: 'app-cart-buyback',
  templateUrl: './cart-buyback.component.html',
  styleUrls: ['./cart-buyback.component.scss']
})
export class CartBuybackComponent implements OnInit {

  @Output() clearParentCart:any = new EventEmitter();
  @Output() clearPerhiasan:any = new EventEmitter();
  @Output() clearEmasBatangan:any = new EventEmitter();
  @Output() clearBerlian:any = new EventEmitter();

  @Output() data:any = new EventEmitter();

  @Input() totalCart : any;
  @Input() hargaTotalPerhiasan : any = 0
  @Input() hargaTotalEmasBatangan : any = 0
  @Input() hargaTotalBerlian : any = 0

  cartModal : any
  
  cartPerhiasan = PERHIASAN;
  cartLogam = LM;
  cartSouvenir = GS;
  cartBerlian = BERLIAN;
  cartDinar = DINAR;

  hargaPerhiasan: number;
  perhiasan: number;

  constructor() { }

  ngOnInit(): void {

  }
  modalView(isi: any){
    this.cartModal = isi;
  }
  
  removeCart(){
    this.cartPerhiasan.splice(0);
    this.hargaTotalPerhiasan = 0
    this.clearPerhiasan.emit({length:0,harga:0});

    this.cartLogam.splice(0);
    this.hargaTotalEmasBatangan = 0
    this.clearEmasBatangan.emit({length:0,harga:0});

    this.cartBerlian.splice(0);
    this.hargaTotalBerlian = 0
    this.clearBerlian.emit({length:0,harga:0});
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

  removeItemBerlian(key: any, harga:any ){
    //pengurangan jumlah item
    this.cartBerlian.splice(key,1);

    //pengurangan jumlah cart
    this.totalCart-=1;
    
    this.hargaTotalBerlian = this.hargaTotalBerlian - harga
    this.clearBerlian.emit({length:this.cartBerlian.length, harga:this.hargaTotalBerlian });

    if (this.totalCart == 0) {
      console.debug("totallll 0");
      this.clearParentCart.emit(0);
    }
  }

 
}
