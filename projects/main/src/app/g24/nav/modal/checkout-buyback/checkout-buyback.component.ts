import { Component, OnInit } from '@angular/core';
import { PERHIASAN, LM , GS, BERLIAN, DINAR } from '../../../sample/cart-buyback';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { TransactionMethodService } from '../../../services/transaction/transaction-method.service';
import { ToastrService } from 'ngx-toastr';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-checkout-buyback',
  templateUrl: './checkout-buyback.component.html',
  styleUrls: ['./checkout-buyback.component.scss'],
  providers: [DatePipe]
})
export class CheckoutBuybackComponent implements OnInit {
  formData: any;
  isiClientData: any;
  
  //cart
  perhiasan = PERHIASAN;
  emasBatangan = LM;
  souvenir = GS;
  berlian = BERLIAN;
  dinar = DINAR;

  //cart list
  jumlahPerhiasan:any;
  jumlahEmasBatangan:any;
  jumlahSouvenir:any;
  jumlahBerlian:any;
  jumlahDinar:any;
 
  totalBelanja: number;
  checkoutModal: boolean;
  validModel:boolean= false;
  transactionMethod:any;


  //session
  nikUser: any;
  idtransaksiBB: string;
  diterima: any;
  kembali: number;

  constructor(
    private sessionService: SessionService,
    private transactionService: TransactionService,
    private datePipe: DatePipe,
    private transactionMethodService : TransactionMethodService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {

    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"],"name":this.nikUser["name"],"username":this.nikUser["username"]} ;
  
  }

  openModal(totalHarga: any){
    this.checkoutModal = true;
    this.totalBelanja = totalHarga
    this.formData = new FormGroup({
      cif: new FormControl ("", [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      name: new FormControl ("",[ Validators.required]),
      idTransactionBB: new FormControl ("",[ Validators.required]),
      metodeBayar: new FormControl ("", Validators.required),
      nominalTransaksi: new FormControl (""),
      kembali: new FormControl (""),
    })

    console.debug(LM, "sadsda")
    this.jumlahPerhiasan = this.perhiasan.length;
    this.jumlahEmasBatangan = this.emasBatangan.length;
    this.jumlahSouvenir = this.souvenir.length;
    this.jumlahBerlian = this.berlian.length;
    this.jumlahDinar = this.dinar.length;

    this.idTransaksi();

   }

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

  getTransactionMethod(){
    this.transactionMethodService.list("?_hash=1&transaction-type.code=b01").subscribe((response:any)=>{
      if (response != false) {
        this.transactionMethod = response;
      }
    });
  }

  idTransaksi(){
    this.idtransaksiBB = null;
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
      this.idtransaksiBB = unit.code+"06"+d3+inc;
      this.formData.patchValue({idTransactionBB:this.idtransaksiBB,idAi:Number(response["0"]["idAi"])+1});
    });

    this.getTransactionMethod();
  }

  bankValid(val){}
  diterimaUang(total){
    total = total.replace(/,/g, '')
    this.diterima = total;
    this.kembali = total-this.totalBelanja;
  }
  transaction(){
    
    if (!this.formData.valid) {
      this.toastr.error("form Not Completed","Transaction");
      console.debug(this.formData.getRawValue());
      return;
    }
    if (this.kembali < 0) {
      this.toastr.error("Nilai Tidak Cukup","Transaction");
      return;
    }
     
    this.validModel = true;
  }

  refreshId(){
    this.idTransaksi();
  }
  storeTransaction(){
    
  }
}
