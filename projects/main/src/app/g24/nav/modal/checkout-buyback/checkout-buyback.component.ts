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


  //session
  nikUser: any;
  idtransaksiBB: string;
  diterima: any;
  kembali: number;
  incId = 0

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
      metodeBayar: new FormControl ("", Validators.required),
      metodeBayar_encoded: new FormControl("base64"),
      makerDate: new FormControl(this.datePipe.transform(Date.now(), 'MM/dd/yyyy'), Validators.required),
      makerTime: new FormControl(this.datePipe.transform(Date.now(), 'h:mm:ss a'), Validators.required),
      nominalTransaksi: new FormControl (""),
      kembali: new FormControl (""),
      unit: new FormControl(""),
      unit_encoded: new FormControl("base64"),
      maker: new FormControl(this.nikUser["_hash"], [Validators.required]),
      maker_encoded: new FormControl("base64"),
      idAi: new FormControl("", Validators.required),
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

  idTransaksi(){
    this.idtransaksiBB = null;
    let inc = null;
    let d1 = this.datePipe.transform(Date.now(),'01/01/yyyy');
    let d2 = this.datePipe.transform(Date.now(),'12/31/yyyy');
    let d3 = this.datePipe.transform(Date.now(),'yy');
    let unit = this.sessionService.getUnit();
    
    let params="?_between=makerDate&_start="+d1+"&_end="+d2;
  
    this.buybackService.list(params+'&_sortby=_id:0&_rows=1').subscribe((response:any)=>{  
      console.debug(response, "idAI")
      // if (response == false) {
      //   this.incId = 0
      // }else{
        this.incId = Number(response["0"]["idAi"])+1;
      // }
      let count = null;
      if (response["0"]["idAi"] == null) {
        count = JSON.stringify(1);
      }else{
        count = JSON.stringify(Number(response["0"]["idAi"]) + 1);
      }
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
      this.idtransaksiBB = unit.code+"09"+d3+inc;
      this.formData.patchValue({idTransactionBB:this.idtransaksiBB,idAi:Number(this.incId)+1});
    });
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

    data.product = btoa(JSON.stringify({ PERHIASAN, LM, BERLIAN, GS, DINAR }));
    data.product_encoded = "base64";
    let nomT = data["nominalTransaksi"]
    data["nominalTransaksi"] = nomT.replace(/,/g, '')
    delete data["cif"];
    delete data["namaPemasar"];
    delete data["nik"];
    data['transaction-type_encoded'] = "base64";
    
    // this.productService.batchUpdate(this.transactionFlagBuybackService.batchUpdate(btoa(JSON.stringify(this.sessionService.getUnit())))).subscribe((response: any) => {
    //   if (response == false) {
    //     console.debug("product flag update failed", this.transactionFlagBuybackService.batchUpdate(btoa(JSON.stringify(this.sessionService.getUnit()))));
    //   } 
    // })
    console.debug(this.berlian, "pantek")
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
