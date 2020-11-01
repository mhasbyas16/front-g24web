import { Component, OnInit, ViewChild } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { PrmJournalService } from "../../../services/keuangan/jurnal/prm-journal.service";
import { InisiasiBahanBakuService } from '../../../services/bahan-baku/inisiasi-bahan-baku.service';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';
import { ToastrService } from 'ngx-toastr';
import { StringHelper } from '../../../lib/helper/string-helper';

@Component({
  selector: 'app-inisiasi-approval-bahan-baku',
  templateUrl: './inisiasi-approval-bahan-baku.component.html',
  styleUrls: ['./inisiasi-approval-bahan-baku.component.scss']
})

@DContent(InisiasiApprovalBahanBakuComponent.key)
export class InisiasiApprovalBahanBakuComponent implements OnInit {
  static key = EMenuID.APP_PEMBUATAN;

  bahan_baku : any = {};
  nama_bank : String = "";
  data : any = [];

  @ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;

  constructor(private prmjournalservice : PrmJournalService,
              private toastr : ToastrService,
              private bahanbakuservice : InisiasiBahanBakuService) { }

  ngOnInit(): void {
  }

  async CekCodeCoa(){
    let params = "?";
    this.spinner.SetSpinnerText("Mengecek Kode MA BANK");
    this.spinner.Open();
    params += "coaCode="+this.bahan_baku["ma_bank"]+"&coaCode_encoded=int";
    let cek = await this.prmjournalservice.list(params).toPromise();
    if(!this.bahan_baku["ma_bank"]){
      this.toastr.warning("Harap isi kode MA Bank dahulu","Peringatan");
      this.spinner.Close();
      return
    }

    if(cek==false){
      this.toastr.info("Kode MA bank tidak ditemukan","Informasi");
      this.spinner.Close();
      return;
    }

    this.bahan_baku["nama_bank"] = cek[0].name;
    // this.bahan_baku["getCodeBankMa"] = cek;
    this.toastr.success("Kode MA Bank di temukan","Sukses");
    this.spinner.Close();
  }

  async Search(){
    let params = "?";
    
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();

    if(!this.bahan_baku["tgl_inisiasi_awal"]){
      this.toastr.warning("Tanggal inisiasi awal wajib di isi","Peringatan");
      this.spinner.Close();
      return;
    }
    
    for(let key in this.bahan_baku){
      if(this.bahan_baku[key]==null)continue;

      switch(key){
        
        case 'ma_bank' : 
         params += "prm-journal.coaGroup5="+this.bahan_baku[key]+"&";
        break;

        case 'tgl_inisiasi_awal' :
          params += "created_date="+StringHelper.StandardFormatDate('/',this.bahan_baku[key],'MM/dd/yyyy')+"&";
        break;

        default :
         params += key+"="+this.bahan_baku[key]+"&";
        break;
      }
    }

    let data = await this.bahanbakuservice.list(params).toPromise();
    if(data==false){
      let msg = this.bahanbakuservice.message();
      this.toastr.info("Data tidak ditemukan","Informasi");
      this.spinner.Close();
      return;
    }
    console.log(data);
    this.data = data;
    this.toastr.success("Data ditemukan "+this.data.length,"Sukses");
    this.spinner.Close();
  }

}
