import { Component, OnInit, ViewChild } from '@angular/core';
import { promise } from 'protractor';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { ServerDateTimeService } from '../../../services/system/server-date-time.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { TokoPenyediaService } from '../../../services/toko-penyedia.service';
import { PrmJournalService } from "../../../services/keuangan/jurnal/prm-journal.service";
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { InisiasiBahanBakuService } from '../../../services/bahan-baku/inisiasi-bahan-baku.service';
import { JurnalEmasService } from '../../../services/jurnal-emas/jurnal-emas.service';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';
import { ToastrService } from 'ngx-toastr';
import { PaymentType } from '../../../lib/enums/payment-type';
import { ThrowStmt } from '@angular/compiler';
import { BahanBaku } from '../../../lib/enum/bahan-baku';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';

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
              private prmjournalservice : PrmJournalService,
              private bahanbakuservice : InisiasiBahanBakuService,
              private jurnalemasService : JurnalEmasService) { }

  @ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;

   ngOnInit(): void {
    this.Tesjournal();
    this.LoadDate();
    this.LoadKategori();
    this.LoadTokped();
    this.bahan_baku["tgl_inisiasi"] = this.date;
  }

  async Tesjournal(){
    let data = await this.jurnalemasService.list("?").toPromise();
    if(data==false){
      let msg = this.jurnalemasService.message();
      this.toastr.error("Journal Emas API "+msg, "Error");
    }
    console.log("Jual Gram",data[0].harga_hpp);
  }

  async LoadDate(){
    let DateNow = await this.serverdate.task("").toPromise();
    let split = DateNow.split("T");
    this.date = split[0];
    this.bahan_baku["tgl_inisiasi"] = this.date;
  }

  async LoadKategori(){
    this.jenis = await this.kategoriservice.list("?code=c07").toPromise();
  }

  async LoadTokped(){
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
      console.debug(params);
      console.debug(this.bahan_baku["name_bank"]);
      console.debug(code);
  }

  async totalJumlahGram(){
    let data = await this.jurnalemasService.list("?").toPromise();
    if(data==false){
      let msg = this.jurnalemasService.message();
      this.toastr.error("Journal Emas API "+msg, "Error");
    }
    // console.log("Jual Gram",data[0].harga_hpp);
    // console.log(this.bahan_baku.jumlah_gram + data[0].harga_hpp);
    let total = this.bahan_baku.jumlah_gram + data[0].harga_hpp;
    this.bahan_baku.total_harga_gram = total;
  }

  async doSave(){
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();

    if(!this.bahan_baku["jenis_product"]){
      this.toastr.warning("Produk jenis belum dipilih","Peringatan");
      this.spinner.Close();
      return;
    }else if(!this.bahan_baku["jumlah_gram"]){
      this.toastr.warning("Jumlah Gram belum di isi","Peringatan");
      this.spinner.Close();
      return;
    }else if(!this.bahan_baku["toko_penyedia"]){
      this.toastr.warning("Toko penyedia belum dipilih");
      this.spinner.Close();
      return;
    }else if(!this.bahan_baku["total_harga_gram"]){
      this.toastr.warning("Total harga gram masih kosong");
      this.spinner.Close();
      return;
    }else if(!this.bahan_baku["ma_bank"]){
      this.toastr.warning("Kode MA bank belum di isi");
      this.spinner.Close();
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
      toko_penyedia : this.bahan_baku["toko_penyedia"],
      status_inisiasi : BahanBaku.SUBMIT.code
    };
    console.log(data);
    
    let hash = DataTypeUtil.Encode(data);
    let savedata = await this.bahanbakuservice.add(hash).toPromise();

    if(savedata==false){
      this.toastr.error("Data gagal disimpan","Error");
      this.spinner.Close();
      return;
    }

    this.toastr.success("Data berhasil disimpan","Sukses");
    this.spinner.Close();
  }


}
