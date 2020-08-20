import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PERHIASAN, LM , GS, BERLIAN, DINAR } from '../../../sample/cart';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

//service 

import { ClientService } from '../../../services/client/client.service';
import { BankService } from '../../../services/transaction/bank.service';
import { TransactionMethodService } from '../../../services/transaction/transaction-method.service';
import { TransactionBankMethodService } from '../../../services/transaction/transaction-bank-method.service';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { TransactionEdcTypeService } from '../../../services/transaction/transaction-edc-type.service';
import { TransactionCardTypeService } from '../../../services/transaction/transaction-card-type.service';
import { TransactionBankInstallmentService } from '../../../services/transaction/transaction-bank-installment.service';

// session service
import { UserService } from 'projects/platform/src/app/services/security/user.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DatePipe } from '@angular/common';
import { ContentPage } from '../../../lib/helper/content-page';

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
  edc:boolean = false;
  edc2:boolean = false;
  edc3:boolean = false;
  installmentCont:boolean = false;
  periodeIns:boolean = false;
  // cart
   administrasi:string = "";
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
   edcTipe:any;
   cardTipe:any;
   bankInstallment:any;
   transactionMethod:any;
   transactionBankMethod:any;
   installmentPeriod:any;
   kembali:any;
   diterima:any;
   
   idtransaksi:any;
  constructor(
    private clientService: ClientService,
    private bankService: BankService,
    private transactionMethodService : TransactionMethodService,
    private transactionBankMethodService : TransactionBankMethodService,
    private transactionService: TransactionService,
    private transactionEdcType: TransactionEdcTypeService,
    private transactionCardType: TransactionCardTypeService,
    private transactionBankInstallment: TransactionBankInstallmentService,
    private userService: UserService,

    //ng
    private toastr: ToastrService,
    private sessionService: SessionService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]} ;
  }

  idTransaksi(){
    this.idtransaksi = null;
    let inc = null;
    let d1 = this.datePipe.transform(Date.now(),'01/01/yyyy');
    let d2 = this.datePipe.transform(Date.now(),'12/31/yyyy');
    let d3 = this.datePipe.transform(Date.now(),'yy');
    let unit = this.sessionService.getUnit();

    let params="?_between=makerDate&_start="+d1+"&_end="+d2;

    this.transactionService.list(params+'&_sortby=idAi:0&_rows=1').subscribe((response:any)=>{  
      let count = JSON.stringify(Number(response["0"]["idAi"])+1);
      switch (count.length) {
        case 1:
          inc = "000000"+count;
          break;
        case 2:
          inc = "00000"+count;
          break;
        case 3:
          inc = "0000"+count;
          break;
        case 4:
          inc = "000"+count;
          break;
        case 5:
          inc = "00"+count;
          break;
        case 6:
          inc = "0"+count;
          break;
        case 7:
          inc = count;
          break;
        default:
          break;
      }
      this.idtransaksi = unit.code+"06"+d3+inc;
      this.formData.patchValue({idTransaction:this.idtransaksi,idAi:Number(response["0"]["idAi"])+1});
    });
      
  }

  refreshId(){
    this.idTransaksi();
  }
  
  openModal(totalHarga: any){    
    this.formData = new FormGroup({
      idTransaction: new FormControl(""),
      idTransaction_validation: new FormControl("unique:idTransaction"),
      cif: new FormControl ("", [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      name: new FormControl ("",[ Validators.required]),
      client: new FormControl ("", Validators.required),
      client_encoded: new FormControl("base64"),
      metodeBayar: new FormControl (""),
      metodeBayar_encoded: new FormControl ("base64"),
      bankTujuan: new FormControl (""),
      bankAsal: new FormControl (""),
      bankTujuan_encoded: new FormControl ("base64"),
      transactionMetodeBank: new FormControl (""),
      transactionMetodeBank_encoded: new FormControl ("base64"),
      admBank: new FormControl(""),
      maker: new FormControl (this.nikUser["_hash"], [Validators.required]),
      maker_encoded: new FormControl("base64"),
      makerDate: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy'), Validators.required),
      makerTime: new FormControl(this.datePipe.transform(Date.now(),'h:mm:ss a'), Validators.required),
      jumlahTerima: new FormControl (totalHarga, Validators.required),
      unit: new FormControl(""),
      unit_encoded: new FormControl("base64"),
      nominalTransaksi: new FormControl (""),
      kembali: new FormControl (""),
      nik: new FormControl (""),
      nikPemasar: new FormControl (""),
      nikPemasar_encoded: new FormControl ("base64"),
      edcType: new FormControl (""),
      edcType_encoded: new FormControl ("base64"),
      cardType: new FormControl(""),
      cardType_encoded: new FormControl ("base64"),
      installment:new FormControl (""),
      installment_encoded: new FormControl ("base64"),
      periodePayment: new FormControl (""),
      idAi: new FormControl ("", Validators.required),
      namaPemasar: new FormControl (""),
    });
    this.idTransaksi();
    this.getUnit();
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

  getNikPemasar(){
    const value = this.formData.get('nik').value;
    this.userService.list("?_hash=1&username="+value).subscribe((response:any)=>{
      if (response['length'] != 0) {
        console.debug(response,"data pemasar");
        this.toastr.success('Success Get NIK Pemasar Name '+response["0"]["name"],'NIK Pemasar');
        this.formData.patchValue({nikPemasar:response["0"]['_hash'], namaPemasar:response["0"]["name"]});
      }else{
        this.toastr.error('NIK Pemasar Not Found, Filed Get','NIK Pemasar');
        this.formData.patchValue({nikPemasar:"", namaPemasar:""});
        return;
      }
      
    });
  }

  getUnit(){
    const unitString = btoa(JSON.stringify(this.sessionService.getUnit()));
    this.formData.patchValue({unit: unitString});
  }

  closeModal(){
    this.edc = false;
    this.edc2 = false;
    this.edc3 = false;
    this.bankForm = false;
    this.installmentCont =false;
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

  // pembayaran

  getBankInstallment(){
    this.transactionBankInstallment.list("?_hash=1").subscribe((response:any)=>{
      if (response != false) {
        this.bankInstallment = response;
      }
    });
  }

  periodeInstallment(val){
    this.transactionBankInstallment.list("?_hash=1&code="+val).subscribe((response:any)=>{
      if (response != false) {
        this.installmentPeriod = response;
      }
    });
    this.periodeIns = true;
  }

  bankValid(val){
    this.administrasi= "";
    this.formData.patchValue({admBank: this.administrasi});
    this.edc2 = false;
    this.edc3 = false;
    console.debug(val,"bank valid");
    let cod = JSON.parse(atob(val));
    if (cod["code"] == "01") {
      this.bankForm = false;
      this.edc = false;
      this.installmentCont =false;
    } else if (cod["code"] == "02") {
      this.bankForm = true;
      this.edc = false;
      this.installmentCont =false;
    } else if (cod["code"] == "03"){
      this.bankForm = false;
      this.edc = true;
      this.installmentCont =false;
    }
    else if (cod["code"] == "04"){
      this.getBankInstallment();
      this.bankForm = false;
      this.edc = false;
      this.installmentCont =true;
    }
    this.formData.patchValue({
      transaksiMetodeBank: "",
      bankAsal:"",
      bankTujuan:"",
      nominalTransaksi: "",
      kembali:""
    });
  }
  jenisEdc(){
    this.transactionEdcType.list("?_hash=1").subscribe((response:any)=>{
      if (response != false) {
        this.edcTipe = response;
      }
    });
    this.edc2 = true;
  }
  jenisKartu(){
    this.transactionCardType.list("?_hash=1").subscribe((response:any)=>{
      if (response != false) {
        this.cardTipe = response;
      }
    });
    this.edc3 = true;
    console.debug(this.formData.get('edcType').value,"EDCTYOE");
  }

  bankAdm(val){
    this.administrasi= "";
    this.formData.patchValue({admBank: this.administrasi});
    let Jc = JSON.parse(atob(val));
    let Je = JSON.parse(atob(this.formData.get('edcType').value));
    let Pem = JSON.parse(atob(this.formData.get('transaksiMetodeBank').value));
    //debit
    if (Pem["code"] == "02") {
      if (Jc["code"] == Je["code"]) {
        this.administrasi= "";
        this.formData.patchValue({admBank: this.administrasi});
      }else{
        
        this.administrasi = JSON.stringify((0.15/100)*this.totalBelanja);
        this.formData.patchValue({admBank: this.administrasi});
      }
      // kredit
    }else if(Pem["code"] == "01"){
      if (Jc["code"] == Je["code"]) {
        this.administrasi= "";
        this.formData.patchValue({admBank: this.administrasi});
      }else{
        this.administrasi = JSON.stringify((1/100)*this.totalBelanja);
        this.formData.patchValue({admBank: this.administrasi});
      }
    }else{
      this.administrasi= "";
      this.formData.patchValue({admBank: this.administrasi});
    } 
    
  }

  diterimaUang(total){
    this.diterima = total;
    this.kembali = total-this.totalBelanja;
  }

  getEdcType(){
    this.transactionEdcType.list("?_hash=1").subscribe((response:any)=>{
      if (response != false) {
        this.edcTipe = response;
      }
    });
  }
  getCardType(){
    this.transactionCardType.list("?_hash=1").subscribe((response:any)=>{
      if (response != false) {
        this.cardTipe = response;
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
      console.debug(this.formData.getRawValue());
      return;
    }    

    this.validModel = true;
    
  }

  storeTransaction(){
    let data = this.formData.getRawValue();  
    // 
    data.product = btoa(JSON.stringify({PERHIASAN,LM,BERLIAN,GS,DINAR})) ;
    data.product_encoded = "base64";
    delete data["cif"];
    delete data["namaPemasar"];
    delete data["nik"];
    console.debug(data,"ISI FORMDATA");
    // data.metodeBayar =

    
    this.transactionService.add(data).subscribe((response:any)=> {
      if (response != false) {
        this.validModel = false;
        this.toastr.success(this.transactionService.message(), "Transaction Success");
        this.checkoutModal = false;
        // remove isi cart
        PERHIASAN.splice(0);
        BERLIAN.splice(0);
        LM.splice(0);
        DINAR.splice(0);
        GS.splice(0);
        this.cartModal.emit(false);
        this.ChangeContentArea('10003');
      }else{
        this.toastr.error(this.transactionService.message(), "Transaction");
        this.idTransaksi()
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
  ChangeContentArea(pageId : string)
  {
    if(pageId.startsWith("x")) return;
    ContentPage.ChangeContent(pageId, true)
  }
}
