import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { DatePipe } from "@angular/common";
import { ToastrService } from 'ngx-toastr';

// services
import { TransactionService } from '../../../services/transaction/transaction.service';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';

@Component({
  selector: 'app-laporan-penjualan',
  templateUrl: './laporan-penjualan.component.html',
  styleUrls: ['./laporan-penjualan.component.scss'],
  providers:[DatePipe],
})

@DContent(LaporanPenjualanComponent.key)
export class LaporanPenjualanComponent implements OnInit {

  // ClrDatagrid
  loadingDg: boolean = false;
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  search: FormGroup = null;
  selected:any;
  testarr =[];

  totalP=0;

  //
  transactions = [];

  constructor(
    private transactionService: TransactionService,
    
    private toastrService:ToastrService,
    //session
    private sessionService: SessionService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.from();
  }

  from(){
    this.search = new FormGroup({
      from: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy')),
      to: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy')),
      text: new FormControl("")
    });
  }

  filterTransaction(val){
    // CLR Datagrid loading
    this.loadingDg = true;

    let data = this.search.getRawValue(); 
    let params = "";

    // Session
    const getUnit = this.sessionService.getUnit();
    params = params+"&maker.unit.code="+getUnit["code"];

    if (data.from != "") {
      if (data.to == "") {
        this.toastrService.error("Complete Range Date", "Transaction");
        this.loadingDg = false;
        return;
      }else if(data.to != ""){
        params = params+"&_between=makerDate&_start="+data.from+"&_end="+data.to;
      }
    }

    if (data.text != "") {
      if (val == 'id') {
        this.transactionService.list("?"+params+"&idTransaction_regex=1&idTransaction="+data.text).subscribe((response:any)=>{
          if (response["length"] != 0) {
            params = params+"&idTransaction_regex=1&idTransaction="+data.text;
            this.getTransaction(params);
            return
          }else{
            this.filterTransaction('name');
            return
          }
        })
      }else if (val == 'name'){
        this.transactionService.list("?"+params+"&client.name_regex=1&client.name="+data.text).subscribe((response:any)=>{
          if (response["length"] != 0) {
            params = params+"&client.name_regex=1&client.name="+data.text;
            this.getTransaction(params);
            return
          }else{
            this.filterTransaction('cif');
            return
          }
        })
      }else if (val == 'cif'){
        this.transactionService.list("?"+params+"&client.cif_regex=1&client.cif="+data.text).subscribe((response:any)=>{
          if (response["length"] != 0) {
            params = params+"&client.cif_regex=1&client.cif="+data.text;
            this.getTransaction(params);
            return
          }else{
            this.toastrService.error("Data Not Found", "Transaction");
            this.loadingDg = false;
            this.transactions = [];
            return
          }
        })
      }
    }else{
      this.getTransaction(params);
      return
    }

  }

  getTransaction(params){       

    this.transactionService.list("?"+params).subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Data Not Found", "Transaction");
        this.loadingDg = false;
        this.transactions = [];
        return;
      }  
      if (response["length"] == 0) {
        this.toastrService.error("Data Not Found", "Transaction");
        this.loadingDg = false;
        this.transactions = [];
        return;
      }
      
      this.loadingDg = false;
      this.transactions = response;
      this.toastrService.success("Load "+this.transactions.length+" Data", "Transaction");
    })
  }

  sumP(){
    this.totalP += 1;
  }

  static key = EMenuID.LAPORAN;

}
