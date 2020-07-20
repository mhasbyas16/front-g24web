import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PERHIASAN, LM, GS, BERLIAN, DINAR } from '../../../sample/cart';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

//service 

import { ClientService } from '../../../services/client/client.service';
import { BankService } from '../../../services/transaction/bank.service';
import { TransactionMethodService } from '../../../services/transaction/transaction-method.service';
import { TransactionBankMethodService } from '../../../services/transaction/transaction-bank-method.service';
import { TransactionService } from '../../../services/transaction/transaction.service';

// session service
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  //
  @Output() cartModal = new EventEmitter();

  validModel:boolean= false;
  bankForm:boolean = false;
  // cart
   perhiasan = PERHIASAN;
   lm = LM;
   gs = GS;
   berlian = BERLIAN;
   dinar = DINAR;

   // total harga
   totalBelanja: number;
   checkoutModal: boolean;  
   nikUser:any;
   
   // cart list
   P:any;
   logam:any;
   gift:any;
   B:any;
   D:any;

   //
   formData: FormGroup = null;
   //
   isiCif=null;
   //
   detail:any;
   bank:any;
   transactionMethod:any;
   transactionBankMethod:any;
   kembali:any;
   diterima:any;

  constructor(
    private clientService: ClientService,
    private bankService: BankService,
    private transactionMethodService : TransactionMethodService,
    private transactionBankMethodService : TransactionBankMethodService,
    private transactionService: TransactionService,

    //ng
    private toastr: ToastrService,
    private sessionService: SessionService,
  ) { }

  ngOnInit(): void {
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]} ;
    console.debug(this.nikUser,"NIK LOGIN")
  }
  
  openModal(totalHarga: any){
    this.formData = new FormGroup({
      idPenjualan: new FormControl(""),
      idPenjualan_validation: new FormControl("unique:idPenjualan"),
      cif: new FormControl ("", [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      name: new FormControl ("",[ Validators.required]),
      metodeBayar: new FormControl ("", [Validators.required]),
      metodeBayar_encoded: new FormControl ("base64"),
      tglLahir: new FormControl ("", [Validators.required]),
      bankTujuan: new FormControl (""),
      bankAsal: new FormControl (""),
      bankTujuan_encoded: new FormControl ("base64"),
      jenisPembayaran: new FormControl (""),
      jenisPembayaran_encoded: new FormControl ("base64"),
      nik: new FormControl (this.nikUser["_hash"], [Validators.required]),
      nik_encoded: new FormControl("base64"),
      paymentMethod_encoded : new FormControl ("base64"),
      jumlahTerima: new FormControl (totalHarga, Validators.required),
      
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

    
    this.getBank(); 
    this.getTransactionMethod();   
    this.getTransactionBankMethod();
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

  bankValid(val){
    let cod = JSON.parse(atob(val));
    if (cod["code"] != "01") {
      this.bankForm = true;
    } else {
      this.bankForm = false;
    }
  }

  diterimaUang(total){
    this.diterima = total;
    this.kembali = total-this.totalBelanja;
  }

  getCif(){
    const params = this.formData.get("cif").value; 
    this.clientService.list("?cif="+params).subscribe((response:any) => {
      this.isiCif = response;
      if (response != false) {
        this.detail = response["0"];
        this.formData.patchValue({name: this.detail["name"]});
        this.formData.patchValue({tglLahir: this.detail["tglLahir"]});
        this.toastr.success(this.clientService.message(), "Client Data");
      }else if(this.isiCif.length == 0){
        this.formData.patchValue({name: this.detail[""]});
        this.formData.patchValue({tglLahir: this.detail[""]});     
      }else{
        this.toastr.error(this.clientService.message(), "Client Data");
        return;
      }
    });
  }

  getBank(){
    this.bankService.list("?_hash=1").subscribe((response:any)=> {
      if (response != false) {
        this.bank = response;
      }
    });
  }

  getTransactionMethod(){
    this.transactionMethodService.list("?_hash=1").subscribe((response:any)=>{
      if (response != false) {
        this.transactionMethod = response;
      }
    });
  }

  getTransactionBankMethod(){
    this.transactionBankMethodService.list("?_hash=1").subscribe((response:any)=>{
      if (response != false) {
        this.transactionBankMethod = response;
      }
    });
  }

//
  transaction(){
    if (!this.formData.valid) {
      this.toastr.error("form Not Completed","Transaction");
      return;
    }    

    this.validModel = true;
    
  }

  storeTransaction(){
    let data = {
      // idPenjualan: new FormControl(""),
      // idPenjualan_validation: new FormControl("unique:idPenjualan"),
      cif: this.formData.get("cif").value,
      name: this.formData.get("name").value,
      birthDate: this.formData.get("tglLahir").value,
      paymentMethod: btoa(JSON.stringify({
        bankOfOrigin: this.formData.get("bankAsal").value ,
        transactionMethod: JSON.parse(atob(this.formData.get("metodeBayar").value)),
        transactionBankMethod: JSON.parse(atob(this.formData.get("jenisPembayaran").value)),
        destinationBank: JSON.parse(atob(this.formData.get("bankTujuan").value)),
        bankAdmin: 0,
      })),
      paymentMethod_encoded: this.formData.get("paymentMethod_encoded").value,
      nik: this.formData.get("nik").value,
      nik_encoded: this.formData.get("nik_encoded").value,
      jumlahTerima: this.formData.get("jumlahTerima").value,
      product: btoa(JSON.stringify(this.perhiasan)),
      product_encoded: "base64"
    }
    
    this.transactionService.add(data).subscribe((response:any)=> {
      if (response != false) {
        this.validModel = false;
        this.toastr.success(this.transactionService.message(), "Transaction");
        
      }else{
        this.toastr.error(this.transactionService.message(), "Transaction");
        return;
      }
    })

  }
}
