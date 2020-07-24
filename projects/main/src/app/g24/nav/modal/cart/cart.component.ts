import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PERHIASAN, LM, GS, BERLIAN, DINAR } from '../../../sample/cart';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  //
  @Input() total:any=0;
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

  // modal 
  checkoutModal:any;

  constructor( ) { }

  ngOnInit(): void {
    this.removeCart();
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

    // reset harga
    this.hargaPerhiasan = 0;
    this.hargaLogam = 0;
    this.hargaBerlian = 0;
    this.hargaGift = 0;
    this.hargaDinar = 0;

    // refresh
    this.total=0;
  }

  // remove item perhiasan
  removeItemPerhiasan(key: any, harga:any ){
    this.cartPerhiasan.splice(key,1);

    //pengrurangan harga
    this.hargaPerhiasan = this.hargaPerhiasan-harga;
    //pengurangan jumlah cart
    this.total-=1;
    this.perhiasan = this.perhiasan-1;
  }
  modalView(isi: any){
    this.cartModal = isi;
  }
  totalAdd(){
    this.total+=1;
    console.debug(this.total,'sdasdasdsaas');
  }
}
