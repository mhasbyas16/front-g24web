import { Component, OnInit } from '@angular/core';
import { CART } from '../../sample/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  // cart
  cart = CART;
  // modal
  cartModal: boolean = false; 
  // total cart
  total: any;
  price: any;

  constructor( ) { }

  ngOnInit(): void {
  
  }

  removeCart(){
    // remove all item in array
    this.cart.splice(0);
  }

  cartTotal(){
    this.total = this.cart.length;
  }
}