import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PERHIASAN, LM, GS, BERLIAN, DINAR } from '../../sample/cart';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  //
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

  // data grid  
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
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
<<<<<<< HEAD
    // let compo = new PerhiasanComponent();
=======
>>>>>>> b53614a3693462881d96c644d9c5344eb9806f51
    // remove all item in array    
    this.cartPerhiasan.splice(0);
    // reset card modal
    this.perhiasan = 0;
    this.logam = 0;
    this.gift = 0;
    this.berlian = 0;
    this.dinar = 0;

    // reset harga
    this.hargaPerhiasan = 0;
    this.hargaLogam = 0;
    this.hargaBerlian = 0;
    this.hargaGift = 0;
    this.hargaDinar = 0;

    // refresh
<<<<<<< HEAD
    // compo.refresh(0,"m");
=======
>>>>>>> b53614a3693462881d96c644d9c5344eb9806f51
    this.total = this.total-this.total;
  }

  // remove item perhiasan
  removeItemPerhiasan(key: any, harga:any ){
    this.cartPerhiasan.splice(key,1);

    //pengrurangan harga
    this.hargaPerhiasan = this.hargaPerhiasan-harga;
    //pengurangan jumlah cart
    this.total = this.total-1;
    this.perhiasan = this.perhiasan-1;
  }

  modalView(){
    this.cartModal = true;
  }
}
