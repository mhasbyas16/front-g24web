import { Component, OnInit } from '@angular/core';
import { TransactionBookingService } from '../../../../services/transaction/transaction-booking.service';
import { ToastrService } from 'ngx-toastr';
import { TransactionFlagService } from '../../../../services/transaction/transaction-flag.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss']
})
export class CardDetailComponent implements OnInit {

  modal: boolean = false;
  list = [];
  product = [];
  _id:any;
  cif:any;
  nama:any;
  idPic:any;
  namaPic:any;
  type:any;
  lengths:any;
  totals:any;
  idTransaksi:any;
  tglPengajuan:any;
  lastPeriode:any;
  constructor(
    private transactionBookingService:TransactionBookingService,
    private toastrService:ToastrService,
    private transactionFlagService:TransactionFlagService
  ) { }

  ngOnInit(): void {
  }

  openModal(data,length,total, type){
    this.modal = true;
    console.log(data);
    this.list = data;
    this.product = data.product;
    this.idTransaksi = data.idTransaksi;
    this.tglPengajuan = data.tglPengajuan;
    this.lastPeriode = data.lastPeriode;
    this.cif = data.client.cif;
    this.nama = data.client.name;
    this.idPic = data.pic.numberId;
    this.namaPic = data.pic.namePIC;
    this.type = type;
    this.totals = total;
    this.lengths = length;
  }

  approveTr(val){
    console.debug(val.product);
    let data = {"_id":val._id,"flag":"jual"}

    // this.transactionFlagService.batchUpdateOne(val.product,"jual");
    // this.transactionBookingService.update(data).subscribe((response:any)=>{
    //   if (response == false) {
    //     return;
    //   }

    //   this.toastrService.success("Succes Approve");
    // })
  }

  RejectTr(val){
    console.debug(val.product);
    let data = {"_id":val._id,"flag":"rejected"}

    // this.transactionFlagService.batchUpdateOne(val.product,"stock");
    this.transactionBookingService.update(data).subscribe((response:any)=>{
      if (response == false) {
        return;
      }

      this.toastrService.success("Succes Rejected");
    })
  }
}
