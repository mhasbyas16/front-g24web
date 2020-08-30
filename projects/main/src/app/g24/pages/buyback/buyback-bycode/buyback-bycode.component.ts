import { Component, OnInit } from '@angular/core';

import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { BuybackModule } from '../buyback.module';
import { FormGroup, FormControl,ReactiveFormsModule, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

// services
import { TransactionService } from '../../../services/transaction/transaction.service';

import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { TanggalService } from '../../../lib/helper/tanggal.service';



@Component({
  selector: 'app-buyback-bycode',
  templateUrl: './buyback-bycode.component.html',
  styleUrls: ['./buyback-bycode.component.scss']
})

@DContent(BuybackBycodeComponent.key)
export class BuybackBycodeComponent implements OnInit {


  //Form Search
  searchTrans: FormGroup = null;
  
  //id response
  detailTransaction : any;
  totalDetail : any;

  //tanggal
  tanggalTerbilang : any;

  loadingDg: boolean = false;
  placeholderDatagrid = "Silahkan Cari Transaksi Berdasarkan Parameter";

  constructor(
    private toastrService:ToastrService,
    private transactionService: TransactionService,
    // private sessionService: SessionService,
    private tanggalService:TanggalService,
  ) { }

  ngOnInit(): void {
    this.isiForm();
  }
  static key = EMenuID.BUYBACK

  isiForm(){
    this.searchTrans = new FormGroup({
      text: new FormControl("")
    });
  }

  searchTransaction(){

    

    this.loadingDg = true;
    this.totalDetail = 0;
    if (!this.searchTrans.valid) {
      this.toastrService.error("Harap Input Id", "Buyback");
      this.loadingDg = false;
      return;
    }
    let data = this.searchTrans.getRawValue();
     
    this.transactionService.get("?idTransaction="+data.text).subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Transaksi Tidak Ditemukan", "Buyback");
        this.loadingDg = false;
        return
      }
      this.detailTransaction = response
      this.totalDetail = 1

      let tgl =this.detailTransaction.makerDate;
      let tglSplit = tgl.split("/");
      let bulan = Number(tglSplit["0"]);
      let hari = tglSplit["1"];
      let tahun = tglSplit["2"];
      let bulanTerbilang = this.tanggalService.bulanGenerate(bulan);

      this.tanggalTerbilang = hari+" "+bulanTerbilang+" "+tahun
      this.loadingDg = false;
    })
  
  }
}

