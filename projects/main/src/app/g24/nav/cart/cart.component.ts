import { Component, OnInit, Output, Input } from '@angular/core';
import { CART } from '../../sample/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  @Input() total:any;
  // cart
  cart = CART;
  // modal
  cartModal: boolean = false; 
  // total cart
  price: any;

  constructor( ) { }

  ngOnInit(): void {
  
  }

  removeCart(){
    // remove all item in array    
    this.cart.splice(0);
    this.cartTotal();
  }

  cartTotal(){   
    this.total = this.cart; 
    return this.total; 
  }
}
