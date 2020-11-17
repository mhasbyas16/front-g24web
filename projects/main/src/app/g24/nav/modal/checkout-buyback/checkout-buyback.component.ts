import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { PERHIASAN, LM , GS, BERLIAN, DINAR } from '../../../sample/cart-buyback';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { BuybackTransactionService } from '../../../services/buyback/buyback-transaction.service';
import { BuybackParameterService } from '../../../services/buyback/buyback-parameter.service';
import { TransactionMethodService } from '../../../services/transaction/transaction-method.service';
import { ToastrService } from 'ngx-toastr';

import { DatePipe } from '@angular/common';

import { ProductService } from '../../../services/product/product.service';
import { TransactionFlagBuybackService } from '../../../services/transaction/transaction-flag-buyback.service';
import { TransactionService } from "../../../services/transaction/transaction.service";
import { TransactionTypeService } from '../../../services/transaction/transaction-type.service';

import { UserService } from 'projects/platform/src/app/services/security/user.service';
import { ContentPage } from '../../../lib/helper/content-page';
import { SequenceService } from '../../../services/system/sequence.service';
import { ServerDateTimeService } from '../../../services/system/server-date-time.service';
import { BankService } from '../../../services/transaction/bank.service';

// import { promises } from 'fs';

@Component({
  selector: 'app-checkout-buyback',
  templateUrl: './checkout-buyback.component.html',
  styleUrls: ['./checkout-buyback.component.scss'],
  providers: [DatePipe]
})
export class CheckoutBuybackComponent implements OnInit {

  @Output() cartModal = new EventEmitter();

  formData: any;
  isiClientData: any;
  tf:boolean = false;
  
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
  bankForm:boolean = false;


  //session
  nikUser: any;
  idtransaksiBB: string;
  diterima: any;
  kembali: number;
  incId = 0
  date:any;
  time:any;
  bank:any;

  constructor(
    private sessionService: SessionService,
    private buybackService: BuybackTransactionService,
    private buybackParameterService: BuybackParameterService,
    private datePipe: DatePipe,
    private transactionMethodService : TransactionMethodService,
    private toastr: ToastrService,
    private productService: ProductService,
    private transactionFlagBuybackService:TransactionFlagBuybackService,
    private transactionService : TransactionService,
    private transactionTypeService: TransactionTypeService,
    private sequenceService:SequenceService,
    private serverDateTimeService:ServerDateTimeService,
    private bankService: BankService,

  ) { }

  ngOnInit(): void {

    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"],"name":this.nikUser["name"],"username":this.nikUser["username"]} ;
    
  }

  openModal(totalHarga: any){
    this.checkoutModal = true;
    this.totalBelanja = totalHarga;
    this.formData = new FormGroup({
      cif: new FormControl ("", [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      client: new FormControl("", Validators.required),
      client_encoded: new FormControl("base64"),
      name: new FormControl ("",[ Validators.required]),
      idTransactionBB: new FormControl ("",[ Validators.required]),
      idSequencer: new FormControl(""),
      metodeBayar: new FormControl ("", Validators.required),
      metodeBayar_encoded: new FormControl("base64"),
      bankAsal:new FormControl(""),
      bankTujuan:new FormControl(""),
      makerDate: new FormControl("", Validators.required),
      makerTime: new FormControl("", Validators.required),
      nominalTransaksi: new FormControl ("",[ Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      kembali: new FormControl (""),
      unit: new FormControl(""),
      unit_encoded: new FormControl("base64"),
      maker: new FormControl(this.nikUser["_hash"], [Validators.required]),
      maker_encoded: new FormControl("base64"),
      idAi: new FormControl("", Validators.required),
    })

    let params = "?";
    this.serverDateTimeService.task(params).subscribe(output=>{

      if(output==false){
        console.debug("Date gagal")
      }
        this.date = this.serverDateTimeService.getDateOnly(output);
        this.time = this.serverDateTimeService.getTimeOnly(output);
      this.formData.patchValue({makerDate:this.date, makerTime:this.time});
    })

    console.debug(LM, "sadsda")
    this.jumlahPerhiasan = this.perhiasan.length;
    this.jumlahEmasBatangan = this.emasBatangan.length;
    this.jumlahSouvenir = this.souvenir.length;
    this.jumlahBerlian = this.berlian.length;
    this.jumlahDinar = this.dinar.length;

    this.idTransaksi();
    this.getTransactionMethod(this.totalBelanja);
    this.getUnit();
    this.getBank();

   }

   getTransactionType() {
    this.transactionTypeService.get("?_hash=1&code=b01").subscribe((response: any) => {
      if (response != false) {
        this.formData.patchValue({ 'transaction-type': response["_hash"] });
      }
    })
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

  getTransactionMethod(total){
    let params = "?_hash=1&transaction-type.code=b01";
    this.buybackParameterService.get("?flag=active").subscribe((response:any)=>{
      let bbPrm = response;

      if (Number(total) < bbPrm.minPrm ) {
        params= params + "&code=01"
      }

      this.transactionMethodService.list(params).subscribe((response:any)=>{
        if (response != false) {
          this.transactionMethod = response;
        }
      });
    })
    
  }

  bankValid(val){
    let cod = JSON.parse(atob(val));
    this.bankForm = false;
    if (cod["code"] != "01") {
      this.bankForm = true;
    }
    console.debug(cod["code"],this.bankForm);
  }

  getBank() {
    this.bankService.list("?_hash=1").subscribe((response: any) => {
      if (response != false) {
        this.bank = response;
      }
    });
  }

  idTransaksi(){
    this.idtransaksiBB = null;
    let inc = null;
    let d1 = this.datePipe.transform(Date.now(),'yyyy-01-01');
    let d2 = this.datePipe.transform(Date.now(),'yyyy-12-31');
    let d3 = this.datePipe.transform(Date.now(),'yy');
    let unit = this.sessionService.getUnit();
    
    let params="?_between=makerDate&_start="+d1+"&_end="+d2;
  
    this.buybackService.list(params+'&_sortby=_id:0&_rows=1').subscribe((response:any)=>{  
      console.debug(response, "idAI")
      // if (response == false) {
      //   this.incId = 0
      // }else{
        // this.incId = Number(response["0"]["idAi"])+1;
      // }
      let count = null;
      if (response["length"] == 0) {
        count = JSON.stringify(1);
        this.idtransaksiBB = unit.code+"09"+d3+"0000001";
        this.formData.patchValue({idSequencer: this.idtransaksiBB });
        this.formData.patchValue({idTransactionBB: this.idtransaksiBB, idAi: "1" });
        // this.sequenceService.use({key:this.idtransaksiBB}).subscribe((sq:any)=>{
        //   let id = sq["value"];
        //   console.debug(id);
        //   console.debug(this.idtransaksiBB,"id")
          
        // })
      }else{
        // count = JSON.stringify(Number(response["0"]["idAi"]) + 1);

        this.idtransaksiBB = unit.code+"09"+d3+"0000001";
        this.formData.patchValue({idSequencer: this.idtransaksiBB });
        this.sequenceService.peek({key:this.idtransaksiBB}).subscribe((sq:any)=>{
          let idAi = JSON.stringify(response["0"]["idAi"]);
          let id = JSON.stringify(Number(sq["value"]) + 1);
          
          if (idAi == JSON.stringify(id)) {
            this.sequenceService.use({key:this.idtransaksiBB}).toPromise();
            this.idTransaksi();
          }
          if (sq["value"] == null) {
            this.sequenceService.use({key:this.idtransaksiBB}).toPromise();
            this.idTransaksi();
          }

          switch (id.length) {
            case 1:
              inc = "000000" + id;
              break;
            case 2:
              inc = "00000" + id;
              break;
            case 3:
              inc = "0000" + id;
              break;
            case 4:
              inc = "000" + id;
              break;
            case 5:
              inc = "00" + id;
              break;
            case 6:
              inc = "0" + id;
              break;
            case 7:
              inc = id;
              break;
            default:
              break;
          }

          
          this.idtransaksiBB = unit.code + "09" + d3 + inc;
          console.debug(this.idtransaksiBB,"id")
          this.formData.patchValue({ idTransactionBB:  this.idtransaksiBB, idAi: id });
        })
      }
      // this.idtransaksiBB = unit.code+"09"+d3+inc;
      // this.formData.patchValue({idTransactionBB:this.idtransaksiBB,idAi:Number(this.incId)+1});
    });
  }

  

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
     console.debug(this.formData.getRawValue(), "we" )
    this.validModel = true;
    
  }

  refreshId(){
    this.idTransaksi();
  }

  getUnit() {
    const unitString = btoa(JSON.stringify(this.sessionService.getUnit()));
    this.formData.patchValue({ unit: unitString });
  }

  storeTransaction(){
    let data = this.formData.getRawValue();
    data["kembali"] = this.kembali
    data["idAi"] =  this.incId
    
    console.debug(this.kembali, "kembali")
    // idTransaction Sqeuencer

    this.sequenceService.use({key:data.idSequencer}).toPromise();

    data.product = btoa(JSON.stringify({ PERHIASAN, LM, BERLIAN, GS, DINAR }));
    data.product_encoded = "base64";
    // let nomT = data["nominalTransaksi"]
    // data["nominalTransaksi"] = nomT.replace(/,/g, '')
    delete data["cif"];
    delete data["namaPemasar"];
    delete data["nik"];
    delete data["idSequencer"];
    data['transaction-type_encoded'] = "base64";
    
    // this.productService.batchUpdate(this.transactionFlagBuybackService.batchUpdate(btoa(JSON.stringify(this.sessionService.getUnit())))).subscribe((response: any) => {
    //   if (response == false) {
    //     console.debug("product flag update failed", this.transactionFlagBuybackService.batchUpdate(btoa(JSON.stringify(this.sessionService.getUnit()))));
    //   } 
    // })
    if (this.perhiasan != null) {
      let dataPerhiasan = this.transactionFlagBuybackService.batchUpdateTransaction(this.perhiasan, "perhiasan",btoa(JSON.stringify(this.sessionService.getUnit())))
    } 
    if(this.emasBatangan != null) {
      let dataLM = this.transactionFlagBuybackService.batchUpdateTransaction(this.emasBatangan, "lm", btoa(JSON.stringify(this.sessionService.getUnit())))
    }
    if(this.berlian != null) {
      let dataBerlian = this.transactionFlagBuybackService.batchUpdateTransaction(this.berlian, "berlian", btoa(JSON.stringify(this.sessionService.getUnit())))
    }
    if(this.souvenir != null) {
      let dataSouvenir = this.transactionFlagBuybackService.batchUpdateTransaction(this.souvenir, "souvenir", btoa(JSON.stringify(this.sessionService.getUnit())))
    }
    if(this.dinar != null) {
      let dataSouvenir = this.transactionFlagBuybackService.batchUpdateTransaction(this.dinar, "dinar", btoa(JSON.stringify(this.sessionService.getUnit())))
    }

    this.transactionTypeService.get("?code=b01").subscribe((response:any)=>{
      if (response == false) {
        console.debug("Transaction type not found");
        return
      }

      data['transaction-type'] = btoa(JSON.stringify(response));

      this.buybackService.add(data).subscribe((response: any) => {
        if (response != false) {
          this.validModel = false;
          this.toastr.success(this.buybackService.message(), "Transaction Success");
          this.checkoutModal = false;
          // remove isi cart
          PERHIASAN.splice(0);
          BERLIAN.splice(0);
          LM.splice(0);
          DINAR.splice(0);
          GS.splice(0);
          this.cartModal.emit(false);
          this.ChangeContentArea('10009');
        } else {
          this.toastr.error(this.buybackService.message(), "Transaction");
          this.idTransaksi()
          return;
        }
      })
    })
    
  }

  ChangeContentArea(pageId: string) {
    if (pageId.startsWith("x")) return;
    ContentPage.ChangeContent(pageId, true)
  }
}
