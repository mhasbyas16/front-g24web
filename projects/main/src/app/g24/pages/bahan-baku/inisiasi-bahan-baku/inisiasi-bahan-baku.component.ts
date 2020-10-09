import { Component, OnInit } from '@angular/core';
import { promise } from 'protractor';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { ServerDateTimeService } from '../../../services/system/server-date-time.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { TokoPenyediaService } from '../../../services/toko-penyedia.service';
import { PrmJournalService } from "../../../services/keuangan/jurnal/prm-journal.service";
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentType } from '../../../lib/enums/payment-type';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-inisiasi-bahan-baku',
  templateUrl: './inisiasi-bahan-baku.component.html',
  styleUrls: ['./inisiasi-bahan-baku.component.scss']
})

@DContent(InisiasiBahanBakuComponent.key)
export class InisiasiBahanBakuComponent implements OnInit {
static key = EMenuID.PEMBUATAN;

  bahan_baku : any = {};
  date : String = "";
  jenis : any[] = [];
  tokped : any[] = [];
  codeBank : String = "";
  codeBankFound : Boolean = false;
  constructor(private serverdate : ServerDateTimeService,
              private kategoriservice : ProductCategoryService,
              private tokopenyediaservice : TokoPenyediaService,
              private toastr : ToastrService,
              private session : SessionService,
              private prmjournalservice : PrmJournalService) { }

   ngOnInit(): void {
    this.LoadDate();
    this.LoadKategori();
    this.LoadVendor();
    this.bahan_baku["tgl_inisiasi"] = this.date;
  }

  async LoadDate(){
    let DateNow = await this.serverdate.task("").toPromise();
    let split = DateNow.split("T");
    this.date = split[0];
    this.bahan_baku["tgl_inisiasi"] = this.date;
  }

  async LoadKategori(){
    this.jenis = await this.kategoriservice.list("?").toPromise();
  }

  async LoadVendor(){
    this.tokped = await this.tokopenyediaservice.list("?").toPromise();
  }

  async cekCodeMABank(){
    let params = "?";
    params += "coaCode="+this.bahan_baku["ma_bank"]+"&coaCode_encoded=int";
    let code = await this.prmjournalservice.list(params).toPromise();
    if(!this.bahan_baku["ma_bank"]){
      this.toastr.warning("Mohon isi kode bank","Peringatan");
      this.codeBankFound = false;
      return;
    }

    if(code==false){
      this.toastr.info("Kode bank tersebut tidak tersedia","Informasi");
      this.codeBankFound = false;
      return;
    }
    this.toastr.success("Kode MA bank ditemukan","Sukses");
    this.codeBankFound = true;
    this.bahan_baku["name_bank"] = code[0].name;
    this.bahan_baku["get_bank"] = code[0];
      console.log(params);
      console.log(this.bahan_baku["name_bank"]);
      console.log(code);
  }

  doSave(){
    if(!this.bahan_baku["jenis_product"]){
      this.toastr.warning("Produk jenis belum dipilih","Peringatan");
      return;
    }else if(!this.bahan_baku["jumlah_gram"]){
      this.toastr.warning("Jumlah Gram belum di isi","Peringatan");
      return;
    }else if(!this.bahan_baku["toko_penyedia"]){
      this.toastr.warning("Toko penyedia belum dipilih");
      return;
    }else if(!this.bahan_baku["total_harga_gram"]){
      this.toastr.warning("Total harga gram belum di isi");
      return;
    }else if(!this.bahan_baku["ma_bank"]){
      this.toastr.warning("Kode MA bank belum di isi");
      return;
    }

    let data = {
      created_date : this.bahan_baku["tgl_inisiasi"],
      created_by : this.session.getUser().unit.code,
      jumlah_gram : this.bahan_baku["jumlah_gram"].toFixed(4),
      total_harga_gram : this.bahan_baku["total_harga_gram"],
      tipe_bayar : PaymentType.UANG.code,
      "prm-journal" : this.bahan_baku["get_bank"],
      "product-category" : this.bahan_baku["jenis_product"],
      toko_penyedia : this.bahan_baku["toko_penyedia"]
    };
    console.log(data);
  }


}
