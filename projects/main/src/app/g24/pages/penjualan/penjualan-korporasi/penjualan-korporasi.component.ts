import { Component, OnInit } from '@angular/core';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LM } from '../../../sample/cart';
import { DatePipe } from '@angular/common';
import { SplitDateServiceService } from '../../../services/split-date-service.service';
// services
import { PrmMarginService } from '../../../services/parameter/prm-margin.service';


@Component({
  selector: 'app-penjualan-korporasi',
  templateUrl: './penjualan-korporasi.component.html',
  styleUrls: ['./penjualan-korporasi.component.scss'],
  providers: [DatePipe]
})

@DContent(PenjualanKorporasiComponent.key)
export class PenjualanKorporasiComponent implements OnInit {

  formData: FormGroup = null;
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
    private splitDateServiceService:SplitDateServiceService
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
      nomorIdentitas: new FormControl ("", [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
      namePIC: new FormControl ("", Validators.required),
      typeId: new FormControl ("", Validators.required),
      numberId: new FormControl ("", Validators.required),
      tglPengajuan: new FormControl (this.datePipe.transform(Date.now(), 'yyyy-MM-dd'), Validators.required),
      periode: new FormControl ("", Validators.required),
      lastPeriode: new FormControl ("")
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
    this.formData.patchValue({lastPeriode:hasil});

    this.productData = [];
    this.dataMulia =[];
    this.productData = [];
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
  static key = EMenuID.KORPORASI;

}
