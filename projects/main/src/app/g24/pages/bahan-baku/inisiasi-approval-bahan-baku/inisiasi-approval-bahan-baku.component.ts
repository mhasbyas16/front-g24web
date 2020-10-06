import { Component, OnInit } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { PrmJournalService } from "../../../services/keuangan/jurnal/prm-journal.service";
import { ToastrService } from 'ngx-toastr';

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

  constructor(private prmjournalservice : PrmJournalService,
              private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  async CekCodeCoa(){
    let params = "?";
    params += "coaCode="+this.bahan_baku["ma_bank"]+"&coaCode_encoded=int";
    let cek = await this.prmjournalservice.list(params).toPromise();
    if(!this.bahan_baku["ma_bank"]){
      this.toastr.warning("Harap isi kode MA Bank dahulu","Peringatan");
      return
    }

    if(cek==false){
      this.toastr.info("Kode MA bank tidak ditemukan","Informasi");
      return;
    }

    this.bahan_baku["nama_bank"] = cek[0].name;
    this.bahan_baku["getCodeBankMa"] = cek;
    this.toastr.success("Kode MA Bank di temukan","Sukses");
    console.log(this.bahan_baku["getCodeBankMa"]);
  }

  Search(){
    
  }

}
