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
  isiClientData:any;
  hargaLogamMulia:any;
  mulia:any;
  total:any;
  lm = LM;
  periodeData:any;
  productData:any;
  prmMargin:any;
  dataMulia:any;

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
    private productService:ProductService
  ) { }

  ngOnInit(): void {
    this.form();
    this.periodeList();
    this.prmMargin =0;
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
  }

  periodeList(){
    this.prmMarginService.list(this.muliaCategory+"&"+this.channel+"&"+this.transactionType+"&"+this.flagApp).subscribe((response:any)=>{
      this.periodeData = response;
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

    let data = Object.assign(form,{'pic': btoa(JSON.stringify(Pic))}, {product:btoa(JSON.stringify(this.productData))});

    this.transactionFlagService.batchUpdateOne(this.productData);

    this.transactionBookingService.add(data).subscribe((response)=>{
      if (response == false) {
        this.toastrService.error("Add Data Failed !!");
        return;
      }
      
      this.ChangeContentArea('10004');
      this.toastrService.success("Success Add Data !!");
      return;
    })
  }

  ChangeContentArea(pageId : string)
  {
    if(pageId.startsWith("x")) return;
    ContentPage.ChangeContent(pageId, true)
  }
  static key = EMenuID.KORPORASI;

}
