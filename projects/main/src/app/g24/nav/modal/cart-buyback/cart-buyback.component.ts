import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-buyback',
  templateUrl: './cart-buyback.component.html',
  styleUrls: ['./cart-buyback.component.scss']
})
export class CartBuybackComponent implements OnInit {
  cartModal : any
  
  @Input() total : any;

  constructor() { }

  ngOnInit(): void {

  }
  modalView(isi: any){
    this.cartModal = isi;
  }
}
