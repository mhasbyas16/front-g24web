import { Component, OnInit, Output, Input } from '@angular/core';
import { PERHIASAN, LM, GS, BERLIAN, DINAR } from '../../sample/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  @Input() total:any;
  @Input() perhiasan:any;
  @Input() logam:any;
  @Input() gift:any;
  @Input() berlian:any;
  @Input() dinar:any;
  
  // modal
  cartModal: boolean = false; 
  // total cart
  price: any;

  // isi cart cards

  cartPerhiasan = PERHIASAN;
  cartLogam = LM;
  cartGift = GS;
  cartBerlian = BERLIAN;
  cartDinar = DINAR;

  constructor( ) { }

  ngOnInit(): void {
  }

  removeCart(){
    // remove all item in array    
    this.cartPerhiasan.splice(0);
    // reset card modal
    this.perhiasan = 0;
    this.logam = 0;
    this.gift = 0;
    this.berlian = 0;
    this.dinar = 0;

    this.cartTotal();
  }

  removeItemPerhiasan(key: any){
    this.cartPerhiasan.splice(key,1);
    this.cartTotal();
  }

  cartTotal(){   
    // ambil dari cart
    this.total = this.cartPerhiasan.length+this.cartLogam.length+this.cartGift.length+this.cartBerlian.length+this.cartDinar.length; 
    return this.total; 
  }
}
