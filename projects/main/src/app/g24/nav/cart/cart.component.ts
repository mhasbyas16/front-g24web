import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PERHIASAN, LM, GS, BERLIAN, DINAR } from '../../sample/cart';

import { PerhiasanComponent } from '../../pages/penjualan/penjualan-distro/perhiasan/perhiasan.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  // send remove item
  @Output() removePerhiasan = new EventEmitter();
  // send remove price
  @Output() removeHPerhiasan = new EventEmitter();
  //
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  @Input() total:any;
  @Input() perhiasan:any;
  @Input() logam:any;
  @Input() gift:any;
  @Input() berlian:any;
  @Input() dinar:any;
  //harga perhiasan
  @Input() hargaPerhiasan:any = 0;
  @Input() hargaLogam:any = 0;
  @Input() hargaBerlian:any = 0;
  @Input() hargaGift:any = 0;
  @Input() hargaDinar:any = 0;
  // modal
  cartModal: boolean = false; 

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
    let compo = new PerhiasanComponent();
    // remove all item in array    
    this.cartPerhiasan.splice(0);
    // reset card modal
    this.perhiasan = 0;
    this.logam = 0;
    this.gift = 0;
    this.berlian = 0;
    this.dinar = 0;

    // harga
    this.hargaPerhiasan = 0;
    this.hargaLogam = 0;
    this.hargaBerlian = 0;
    this.hargaGift = 0;
    this.hargaDinar = 0;
    this.removeHPerhiasan.emit(0);

    // refresh
    compo.refresh(0,"m");
    this.total = this.total-this.total;
  }

  removeItemPerhiasan(key: any, harga:any ){
    this.cartPerhiasan.splice(key,1);
    this.removeHPerhiasan.emit(harga);
    this.total = this.total-1;
  }

  modalView(){
    this.cartModal = true;
  }
}
