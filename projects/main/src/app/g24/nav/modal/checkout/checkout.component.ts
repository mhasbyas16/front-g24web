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
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [DatePipe]
})
export class CheckoutComponent implements OnInit {

  //
  @Output() cartModal = new EventEmitter();

  validModel:boolean= false;
  bankForm:boolean = false;
  // cart
   edc:any;
   administrasi = 0;
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
   isiClientData=null;
   //
   detail:any;
   bank:any;
   transactionMethod:any;
   transactionBankMethod:any;
   kembali:any;
   diterima:any;

   bankA:boolean=false;

  constructor(
    private clientService: ClientService,
    private bankService: BankService,
    private transactionMethodService : TransactionMethodService,
    private transactionBankMethodService : TransactionBankMethodService,
    private transactionService: TransactionService,

    //ng
    private toastr: ToastrService,
    private sessionService: SessionService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]} ;
  }
  
  openModal(totalHarga: any){
    
    this.formData = new FormGroup({
      // idPenjualan: new FormControl(""),
      // idPenjualan_validation: new FormControl("unique:idPenjualan"),
      cif: new FormControl ("", [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      name: new FormControl ("",[ Validators.required]),
      client: new FormControl ("", Validators.required),
      client_encoded: new FormControl("base64"),
      metodeBayar: new FormControl ("", [Validators.required]),
      metodeBayar_encoded: new FormControl ("base64"),
      bankTujuan: new FormControl (""),
      bankAsal: new FormControl (""),
      bankTujuan_encoded: new FormControl ("base64"),
      transaksiMetodeBank: new FormControl (""),
      transaksiMetodeBank_encoded: new FormControl ("base64"),
      admBank: new FormControl(""),
      maker: new FormControl (this.nikUser["_hash"], [Validators.required]),
      maker_encoded: new FormControl("base64"),
      makeDate: new FormControl(this.datePipe.transform(Date.now(),'yyyy/MM/dd, h:mm:ss a'), Validators.required),
      jumlahTerima: new FormControl (totalHarga, Validators.required),
      unit: new FormControl(""),
      diterimaDari: new FormControl (""),
      kembali: new FormControl (""),
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
    if (cod["code"] == "01" || cod["code"] == "04" ) {
      this.bankForm = false;
      this.edc = false;
    } else if (cod["code"] == "02") {
      this.bankForm = true;
      this.edc = false;
    } else if (cod["code"] == "03"){
      this.bankForm = true;
      this.edc = true;
    }
    this.formData.patchValue({
      transaksiMetodeBank: "",
      bankAsal:"",
      bankTujuan:"",
      diterimaDari: "",
      kembali:""
    });
  }
  bankAdm(val){
    let J = JSON.parse(atob(val));

    if (this.edc == true) {
      if (J["code"] == "01") {
        this.administrasi = (0.15/100)*this.totalBelanja;
        this.formData.patchValue({admBank: this.administrasi});
      }else if (J["code"] == "02"){
        this.administrasi = (1/100)*this.totalBelanja;
        this.formData.patchValue({admBank: this.administrasi});
      }else{
        this.administrasi= 0;
      }
    }else{
      this.administrasi= 0;
    } 
    
    if (J["code"] == "01") {
      this.bankA = false;
    }else if (J["code"] == "02"){
      this.bankA = true;
    }
  }

  diterimaUang(total){
    this.diterima = total;
    this.kembali = total-this.totalBelanja;
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
  
    let data = this.formData.getRawValue();    
    data.product = btoa(JSON.stringify({PERHIASAN,LM})) ;
    data.product_encoded = "base64";
    delete data["cif"];
    console.debug(data,"ISI FORMDATA");
    // data.metodeBayar =

    
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

  //
  getClientData(val){
    if (val != null) {
      this.isiClientData = val;
      this.formData.patchValue({
      cif: val["cif"],
      client: btoa(JSON.stringify(val)),
      name: val["name"]
     })
    }else{
      this.formData.patchValue({
        cif: "",
        client: "",
        name: ""
       })
    }
    
    console.debug(val,"HASIL EMMMMMMIT")
  }
}
