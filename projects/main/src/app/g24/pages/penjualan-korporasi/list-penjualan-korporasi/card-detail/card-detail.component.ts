import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TransactionBookingService } from '../../../../services/transaction/transaction-booking.service';
import { ToastrService } from 'ngx-toastr';
import { TransactionFlagService } from '../../../../services/transaction/transaction-flag.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
  providers: [DatePipe]
})
export class CardDetailComponent implements OnInit {

  @Output() refresh = new EventEmitter();

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
  dateNow:any;
  constructor(
    private transactionBookingService:TransactionBookingService,
    private toastrService:ToastrService,
    private transactionFlagService:TransactionFlagService,
    private datePipe:DatePipe
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
    this.dateNow = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    console.debug(val.product);
    let data = {"_id":val._id,"flag":"jual", tglApprove:this.dateNow}

    this.transactionFlagService.batchUpdateOne(val.product,"jual");
    this.transactionBookingService.update(data).subscribe((response:any)=>{
      if (response == false) {
        return;
      }
      this.modal = false;
      this.refresh.emit("id");
      this.toastrService.success("Succes Approve");
    })
  }

  RejectTr(val){
    console.debug(val.product);
    let data = {"_id":val._id,"flag":"rejected"}

    this.transactionFlagService.batchUpdateOne(val.product,"stock");
    this.transactionBookingService.update(data).subscribe((response:any)=>{
      if (response == false) {
        return;
      }

      this.toastrService.success("Succes Rejected");
    })
  }
}
