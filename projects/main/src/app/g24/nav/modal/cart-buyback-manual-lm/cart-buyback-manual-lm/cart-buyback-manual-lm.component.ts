import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { LM }  from "projects/main/src/app/g24/sample/cart-buyback-manual-lm"

@Component({
  selector: 'app-cart-buyback-manual-lm',
  templateUrl: './cart-buyback-manual-lm.component.html',
  styleUrls: ['./cart-buyback-manual-lm.component.scss']
})
export class CartBuybackManualLmComponent implements OnInit {

  @Input() total : any;
  constructor() { }

  ngOnInit(): void {
  }

  cartModal : any
  modalView(isi: any){
    this.cartModal = isi;
  }
}
