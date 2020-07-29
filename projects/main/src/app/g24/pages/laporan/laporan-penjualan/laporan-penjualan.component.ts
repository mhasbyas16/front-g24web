import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';

import { ToastrService } from 'ngx-toastr';

// services
import { TransactionService } from '../../../services/transaction/transaction.service';

@Component({
  selector: 'app-laporan-penjualan',
  templateUrl: './laporan-penjualan.component.html',
  styleUrls: ['./laporan-penjualan.component.scss']
})

@DContent(LaporanPenjualanComponent.key)
export class LaporanPenjualanComponent implements OnInit {

  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  search: FormGroup = null;
  selected:any;

  totalP=0;

  //
  transactions = null;

  constructor(
    private transactionService: TransactionService,
    
    private toastrService:ToastrService,
  ) { }

  ngOnInit(): void {
    this.from();
  }

  from(){
    this.search = new FormGroup({
      from: new FormControl(""),
      to: new FormControl(""),
      text: new FormControl("")
    });
  }

  getTransaction(){
    let data = this.search.getRawValue();    
    let params = "";

    if (data.from != "") {
      // params = params+data.from;
    }

    if (data.to != "") {
      // params = params+data.to;
    }

    if (data.text != "") {
      // params = params+data.text;
    }

    this.transactionService.list("?"+params).subscribe((response:any)=>{
      this.transactions = response;
      console.debug(this.transactions,"LIST TRASANASKASKLAK");
    })
  }

  sumP(){
    this.totalP += 1;
  }

  static key = EMenuID.LAPORAN;

}
