import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PERHIASAN, LM, GS, BERLIAN, DINAR } from '../../../sample/cart';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
   
   // cart list
   P:any;
   logam:any;
   gift:any;
   B:any;
   D:any;

   //
   formData: FormGroup = null;

  constructor() { }

  ngOnInit(): void {
  }
  
  openModal(totalHarga: any){
    this.formData = new FormGroup({
      idPenjualan: new FormControl("", [Validators.required]),
      idPenjualan_validation: new FormControl("unique:idPenjualan"),
      cif: new FormControl ("", [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      nama: new FormControl ("",[ Validators.required]),
      bayar: new FormControl ("", [Validators.required]),
      tglLahir: new FormControl ("", [Validators.required]),
    });
    //
    this.P = this.perhiasan.length;
    this.logam = this.lm.length;
    this.gift = this.gs.length;
    this.B = this.berlian.length;
    this.D = this.dinar.length;
    //
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
