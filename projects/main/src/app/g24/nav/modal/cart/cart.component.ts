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
  @Output() clearSouvenir:any = new EventEmitter();
  @Output() data:any = new EventEmitter();
  //
  @Input() total:any=0;
  @Input() perhiasan:any;
  @Input() logam:any;
  @Input() souvenir:any;
  @Input() berlian:any;
  @Input() dinar:any;
  //harga perhiasan
  @Input() hargaPerhiasan:any = 0;
  @Input() hargaLogamMulia:any = 0 ;
  @Input() hargaBerlian:any = 0;
  @Input() hargaSouvenir:any = 0;
  @Input() hargaDinar:any = 0;

  // data grid  
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  // modal
  cartModal: boolean = false; 
  // isi cart cards
  cartPerhiasan = PERHIASAN;
  cartLogam = LM;
  cartSouvenir = GS;
  cartBerlian = BERLIAN;
  cartDinar = DINAR;

  // modal 
  checkoutModal:any;

  constructor(
   ) { }

  ngOnInit(): void {
    this.removeCart();
   
  }

  removeCart(){
    // remove all item in array    
    this.cartPerhiasan.splice(0);
    this.cartBerlian.splice(0);
    this.cartLogam.splice(0);
    this.cartSouvenir.splice(0);
    // reset card modal
    this.perhiasan = 0;
    this.logam = 0;
    this.souvenir = 0;
    this.berlian = 0;
    this.dinar = 0;

    // reset harga
    this.hargaPerhiasan = 0;
    this.hargaLogamMulia = 0;
    this.hargaBerlian = 0;
    this.hargaSouvenir = 0;
    this.hargaDinar = 0;
    // this.hargaPerhiasan = 0;
    // this.hargaLogam = 0;
    // this.hargaBerlian = 0;
    // this.hargaGift = 0;
    // this.hargaDinar = 0;

    // refresh
    this.total=0;
    // clear
    this.clearParentCart.emit(0);
    this.clearBerlian.emit({length:0,harga:0});
    this.clearPerhiasan.emit({length:0,harga:0});
    this.clearMulia.emit({length:0,harga:0});
    this.clearSouvenir.emit({length:0,harga:0});
  }

  // remove item berlian 
  removeItemBerlian(key: any, harga:any ){
    this.cartBerlian.splice(key,1);

    //pengrurangan harga
    this.hargaBerlian = this.hargaBerlian-harga;
    //pengurangan jumlah cart
    this.total-=1;
    this.berlian = this.berlian-1;
    // pengurangan parent
    this.clearBerlian.emit({length:this.berlian,harga:this.hargaBerlian});
    this.data.emit(this.total);
    if (this.total == 0) {
      console.debug("totallll 0");
      this.clearParentCart.emit(0);
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
    // kurangin parent
    this.clearPerhiasan.emit({length:this.perhiasan,harga:this.hargaPerhiasan});
    this.data.emit(this.total);

    if (this.total == 0) {
      console.debug("totallll 0");
      this.clearParentCart.emit(0);
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

    this.clearMulia.emit({length:this.logam,harga:this.hargaLogamMulia});
    this.data.emit(this.total);

    if (this.total == 0) {
      console.debug("totallll 0");
      this.clearParentCart.emit(0);
    }
    if (this.logam == 0) {
      this.clearMulia.emit(0);
    }
  }

  removeItemSouvenir(key: any, harga:any ){
    this.cartSouvenir.splice(key,1);
    console.debug(this.souvenir)
    //pengrurangan harga
    this.hargaSouvenir = this.hargaSouvenir-harga;

    //pengurangan jumlah cart
    this.total-=1;
    this.souvenir = this.souvenir-1;

    this.clearSouvenir.emit({length:this.souvenir,harga:this.hargaSouvenir});
    this.data.emit(this.total);

    if (this.total == 0) {
      console.debug("totallll 0");
      this.clearParentCart.emit(0);
    }
    if (this.souvenir == 0) {
      this.clearSouvenir.emit(0);
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
