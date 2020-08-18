import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { PERHIASAN, LM, GS, BERLIAN, DINAR } from '../../../sample/cart';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Output() clearParentCart:any = new EventEmitter();
  @Output() clearBerlian:any = new EventEmitter();
  @Output() clearPerhiasan:any = new EventEmitter();
  @Output() clearMulia:any = new EventEmitter();
  //
  @Input() total:any=0;
  @Input() perhiasan:any;
  @Input() logam:any;
  @Input() gift:any;
  @Input() berlian:any;
  @Input() dinar:any;
  //harga perhiasan
  @Input() hargaPerhiasan:any = 0;
  @Input() hargaLogamMulia:any ;
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
    this.cartBerlian.splice(0);
    this.cartLogam.splice(0);
    // reset card modal
    this.perhiasan = 0;
    this.logam = 0;
    this.gift = 0;
    this.berlian = 0;
    this.dinar = 0;

    // reset harga
    this.hargaPerhiasan = 0;
    this.hargaLogamMulia = 0;
    this.hargaBerlian = 0;
    this.hargaGift = 0;
    this.hargaDinar = 0;

    // refresh
    this.total=0;
    // clear
    this.clearParentCart.emit(0);
    this.clearBerlian.emit(0);
    this.clearPerhiasan.emit(0);
    this.clearMulia.emit(0);
  }

  // remove item berlian 
  removeItemBerlian(key: any, harga:any ){
    this.cartBerlian.splice(key,1);

    //pengrurangan harga
    // this.hargaPerhiasan = this.hargaPerhiasan-harga;
    //pengurangan jumlah cart
    this.total-=1;
    this.berlian = this.berlian-1;
    if (this.total == 0) {
      console.debug("totallll 0");
      this.clearParentCart.emit(0);
    }
    if (this.berlian == 0) {
      this.clearBerlian.emit(0);
    }
  }

  // remove item perhiasan
  removeItemPerhiasan(key: any, harga:any ){
    this.cartPerhiasan.splice(key,1);

    //pengrurangan harga
    this.hargaPerhiasan = this.hargaPerhiasan-harga;
    
    //pengurangan jumlah cart
    this.total-=1;
    this.perhiasan = this.perhiasan-1;
    if (this.total == 0) {
      console.debug("totallll 0");
      this.clearParentCart.emit(0);
    }
    if (this.perhiasan == 0) {
      this.clearPerhiasan.emit(0);
    }
  }

  removeItemMulia(key: any, harga:any ){
    this.cartLogam.splice(key,1);
    console.debug(this.logam)
    //pengrurangan harga
    this.hargaLogamMulia = this.hargaLogamMulia-harga;

    //pengurangan jumlah cart
    this.total-=1;
    this.logam = this.logam-1;
    if (this.total == 0) {
      console.debug("totallll 0");
      this.clearParentCart.emit(0);
    }
    if (this.logam == 0) {
      this.clearMulia.emit(0);
    }
  }
  modalView(isi: any){
    this.cartModal = isi;
  }
  totalAdd(){
    this.total+=1;
    console.debug(this.total,'sdasdasdsaas');
  }
}
