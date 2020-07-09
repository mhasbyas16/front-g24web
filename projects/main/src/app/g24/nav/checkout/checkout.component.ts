import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PERHIASAN, LM, GS, BERLIAN, DINAR } from '../../sample/cart';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  //
  @Output() cartModal = new EventEmitter();

  // cart
   perhiasan = PERHIASAN;
   lm = LM;
   gs = GS;
   berlian = BERLIAN;
   dinar = DINAR;

   // total harga
   totalBelanja: number;
   checkoutModal: boolean; 

  constructor() { }

  ngOnInit(): void {
  }
  
  openModal(totalHarga: any){
    this.checkoutModal = true;
    this.cartModal.emit(false);
    this.totalBelanja = totalHarga;
  }

  closeModal(){
    this.checkoutModal = false;
    this.cartModal.emit(true);
  }

  loadData(){
    this.perhiasan;
    this.lm;
    this.gs;
    this.berlian
    this.dinar;

  }
}
