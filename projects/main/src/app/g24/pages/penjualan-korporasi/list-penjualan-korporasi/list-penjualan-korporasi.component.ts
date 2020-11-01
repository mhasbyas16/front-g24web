import { Component, OnInit, OnChanges } from '@angular/core';
import { ContentPage } from '../../../lib/helper/content-page';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TransactionBookingService } from '../../../services/transaction/transaction-booking.service';
import { SplitDateServiceService } from '../../../services/split-date-service.service';

@Component({
  selector: 'app-list-penjualan-korporasi',
  templateUrl: './list-penjualan-korporasi.component.html',
  styleUrls: ['./list-penjualan-korporasi.component.scss'],
  providers: [DatePipe]
})

@DContent(ListPenjualanKorporasiComponent.key)
export class ListPenjualanKorporasiComponent implements OnInit, OnChanges {

  listTotalHarga = [];
  search: FormGroup = null;
  placeholder = "Data tidak ditemukan";
  loadingDg : boolean = false;
  transactions:any;
  constructor(
    private datePipe:DatePipe,
    private toastrService:ToastrService,
    private transactionBookingService:TransactionBookingService,
    private splitDateServiceService:SplitDateServiceService
  ) { }

  ngOnChanges(): void{

  }
  ngOnInit(): void {
    this.formFilter();
    this.filterTransaction('id');
  }

  formFilter(){
    this.search = new FormGroup({
      to: new FormControl(this.datePipe.transform(Date.now(),"MM/dd/yyyy")),
      from: new FormControl(this.datePipe.transform(Date.now(),"MM/dd/yyyy")),
      text: new FormControl(""),
    });
  }

  filterTransaction(val){
     // CLR Datagrid loading
     this.loadingDg = true;

     let data = this.search.getRawValue(); 

     
     let params = "";
 
     // Session
 
     if (data.from == "" && data.text == "") {
       this.toastrService.error("Please Complete Fill This From", "Transaction");
       this.loadingDg = false;
        return;
     }
 
     if (data.from != "") {
       if (data.to == "") {
         this.toastrService.error("Complete Range Date", "Transaction");
         this.loadingDg = false;
         return;
       }else if(data.to != ""){
         params = params+"&_between=tglPengajuan&_start="+this.splitDateServiceService.split(data.from)+"&_end="+this.splitDateServiceService.split(data.to);
       }
     }
 
     if (data.text != "") {
       if (val == 'id') {
         this.transactionBookingService.list("?"+params+"&idTransaction_regex=1&idTransaction="+data.text).subscribe((response:any)=>{
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
         this.transactionBookingService.list("?"+params+"&client.name_regex=1&client.name="+data.text).subscribe((response:any)=>{
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
         this.transactionBookingService.list("?"+params+"&client.cif_regex=1&client.cif="+data.text).subscribe((response:any)=>{
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
    this.listTotalHarga.splice(0);
    this.transactionBookingService.list("?"+params).subscribe((response:any)=>{
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

      let berat = 0;
      for (let index = 0; index < this.transactions.length; index++) {
        berat = 0;
        
        const daa = this.transactions[index];
        for (let i of daa.product) {
          berat += Number(i.detail['product-denom'].value);
          console.debug (berat);
        }
        this.listTotalHarga.push(berat);
      }

      console.debug(this.listTotalHarga);
      this.toastrService.success("Load "+this.transactions.length+" Data", "Transaction");
     // console.debug(this.listTotalHarga ,"alkjfdljajkladkljadkla")
    })
  }

  refreshPage(val){
    this.filterTransaction(val);
  }


static key = EMenuID.LIST_KORPORASI;
}
