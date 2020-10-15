import { Component, OnInit } from '@angular/core';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LM } from '../../../sample/cart';
import { DatePipe } from '@angular/common';
import { SplitDateServiceService } from '../../../services/split-date-service.service';
import { ToastrService } from 'ngx-toastr';
import { ContentPage } from '../../../lib/helper/content-page';

// services
import { PrmMarginService } from '../../../services/parameter/prm-margin.service';
import { TransactionBookingService } from '../../../services/transaction/transaction-booking.service';
import { TransactionFlagService } from '../../../services/transaction/transaction-flag.service';
import { ProductService } from '../../../services/product/product.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { BankService } from '../../../services/transaction/bank.service';
@Component({
  selector: 'app-penjualan-korporasi',
  templateUrl: './penjualan-korporasi.component.html',
  styleUrls: ['./penjualan-korporasi.component.scss'],
  providers: [DatePipe]
})

@DContent(PenjualanKorporasiComponent.key)
export class PenjualanKorporasiComponent implements OnInit {

  formData: FormGroup = null;
  pic: FormGroup = null;
  formPembayaran:FormGroup = null;
  approval:boolean = false;
  isiClientData:any;
  hargaLogamMulia:any;
  mulia:any;
  total:any;
  lm = LM;
  periodeData:any;
  productData:any;
  prmMargin:any;
  dataMulia:any;
  idtransaksi:any;
  sisaPembayaran:any;
  bankList:any;

  muliaCategory = "?_hash=1&product-category.code=c05";
  channel = "channel.code=ch02";
  transactionType = "transaction-type.code=t06";
  flagApp = "flag=approved";

  constructor(
    private datePipe:DatePipe,
    private prmMarginService:PrmMarginService,
    private splitDateServiceService:SplitDateServiceService,
    private transactionBookingService:TransactionBookingService,
    private toastrService:ToastrService,
    private transactionFlagService:TransactionFlagService,
    private productService:ProductService,
    private sessionService:SessionService,
    private bankService:BankService
  ) { }

  ngOnInit(): void {
    this.form();
    this.periodeList();
    this.prmMargin =0;
    this.getBank();
  }

  form(){
    this.formData = new FormGroup ({
      cif: new FormControl ("", Validators.required),
      name: new FormControl ("", Validators.required),
      client: new FormControl ("", Validators.required),
      client_encoded: new FormControl ("base64"),
      tglPengajuan: new FormControl (this.datePipe.transform(Date.now(), 'yyyy-MM-dd')),
      periode: new FormControl ("", Validators.required),
      lastPeriode: new FormControl ("", Validators.required),
      flag: new FormControl ("booking")
    });

    this.pic = new FormGroup ({
      namePIC: new FormControl ("", Validators.required),
      typeId: new FormControl ("", Validators.required),
      numberId: new FormControl ("", [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
    })

    this.formPembayaran = new FormGroup({
      totalHarga : new FormControl (""),
      dibayar : new FormControl (""),
      sisaPembayaran : new FormControl(""),
      rekening: new FormControl (""), 
    }); 
  }

  periodeList(){
    this.prmMarginService.list(this.muliaCategory+"&"+this.channel+"&"+this.transactionType+"&"+this.flagApp).subscribe((response:any)=>{
      this.periodeData = response;
    })
  }

  getBank(){
    this.bankService.list("?_hash=1").subscribe((response:any)=>{
      this.bankList = response;
    })
  }
  getAkhirPeriode(val){
    let tgl = this.formData.get('tglPengajuan').value;
    let d = new Date(tgl);
    let data = JSON.parse(atob(val));

    d.setDate(d.getDate() + (Number(data.periode)-1));
    let hasil = this.splitDateServiceService.split(d.toLocaleDateString());
    console.log(hasil);
    this.formData.patchValue({lastPeriode:hasil, periode:data.periode});

    this.productData = [];
    this.dataMulia =[];
    this.productData = [];
    this.hargaLogamMulia = 0;
    this.prmMargin = data.margin;
    // this.formData.get(tglPengajuan)
  }
  totallogamMulia(isi: any){
    this.mulia = isi;
  }
  HMulia(harga: any){
    this.hargaLogamMulia = harga;
    this.formPembayaran.patchValue({totalHarga:harga});
  }
  cartData(data: any){
    this.total = data;  
  }
  dataProduct(val){
    this.productData = val;
    console.debug(val,'sadadad');
  }

  getClientData(val) {
    if (val != null) {
      this.isiClientData = val;

      this.formData.patchValue({
        cif: val["cif"],
        client: btoa(JSON.stringify(val)),
        name: val["name"]
      })
    } else {
      this.formData.patchValue({
        cif: "",
        client: "",
        name: ""
      })
    }

    console.debug(val, "HASIL EMMMMMMIT")
  }

  // idTransaksi() {
  //   this.idtransaksi = null;
  //   let inc = null;
  //   let d1 = this.datePipe.transform(Date.now(), '01/01/yyyy');
  //   let d2 = this.datePipe.transform(Date.now(), '12/31/yyyy');
  //   let d3 = this.datePipe.transform(Date.now(), 'yy');
  //   let unit = this.sessionService.getUnit();

  //   let params = "?_between=makerDate&_start=" + d1 + "&_end=" + d2;

  //   this.transactionService.list(params + '&_sortby=_id:0&_rows=1').subscribe((response: any) => {
  //     let count = null;
  //     if (response["0"]["idAi"] == null) {
  //       count = JSON.stringify(1);
  //     }else{
  //       count = JSON.stringify(Number(response["0"]["idAi"]) + 1);
  //     }
  //     switch (count.length) {
  //       case 1:
  //         inc = "000000" + count;
  //         break;
  //       case 2:
  //         inc = "00000" + count;
  //         break;
  //       case 3:
  //         inc = "0000" + count;
  //         break;
  //       case 4:
  //         inc = "000" + count;
  //         break;
  //       case 5:
  //         inc = "00" + count;
  //         break;
  //       case 6:
  //         inc = "0" + count;
  //         break;
  //       case 7:
  //         inc = count;
  //         break;
  //       default:
  //         break;
  //     }
  //     this.idtransaksi = unit.code + "06" + d3 + inc;
  //     this.formData.patchValue({ idTransaction: this.idtransaksi, idAi: Number(response["0"]["idAi"]) + 1 });
  //   });

  // }

  validation(){
    if (!this.formData.valid || !this.pic.valid || !this.formPembayaran.valid) {
      this.toastrService.error("Form Not Valid !!");
      return;
    }
    if (this.sisaPembayaran != 0) {
      this.toastrService.error("Sisa Pembayaran Harus 0");
      return;
    }
    
    this.approval = true;
  }

  storeTransaction(){
    if (!this.formData.valid || !this.pic.valid) {
      this.toastrService.error("Form Not Valid !!");
      return;
    }

    let form = this.formData.getRawValue();
    form.pic_encoded = "base64";
    form.product_encoded = "base64array";
    delete form.cif;
    delete form.name;
    let Pic = this.pic.getRawValue();
    let harga = this.formPembayaran.getRawValue();
    delete harga.sisaPembayaran;

    let data = Object.assign(form,{'pic': btoa(JSON.stringify(Pic))}, {product:btoa(JSON.stringify(this.productData))}, harga);

    // this.transactionFlagService.batchUpdateOne(this.productData, 'bookingCorporate');

      this.transactionBookingService.add(data).subscribe((response)=>{
        if (response == false) {
        this.toastrService.error("Add Data Failed !!");
        return;
      }
      
      this.ChangeContentArea('30002');
      this.toastrService.success("Success Add Data !!");
      return;
    })
  }

  onDibayar(val){
    this.sisaPembayaran = Number(this.hargaLogamMulia) - Number(val);
  }

  ChangeContentArea(pageId : string)
  {
    if(pageId.startsWith("x")) return;
    ContentPage.ChangeContent(pageId, true)
  }
  static key = EMenuID.KORPORASI;

}
