import { Component, OnInit } from '@angular/core';
// Sidebar
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
//toast
import { ToastrService } from "ngx-toastr";
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ServerDateTimeService } from "../../../services/system/server-date-time.service";
import { DatePipe } from '@angular/common';
//database
import { MokerService } from "../../../services/transaction/moker.service";
import { BranchPegadaianService } from "../../../services/branch-pegadaian.service";
import { UnitService } from "../../../services/system/unit.service";

@Component({
  selector: 'app-approve-terima-moker',
  templateUrl: './approve-terima-moker.component.html',
  styleUrls: ['./approve-terima-moker.component.scss'],
  providers: [DatePipe],
})

@DContent(ApproveTerimaMokerComponent.key)
export class ApproveTerimaMokerComponent implements OnInit {
  static key = EMenuID.APPROVAL_TERIMA_MOKER

  //title
  breadcrumb = "Input Moker"
  title = "Modal Kerja"
  // spinner 
  spinner = false;
  //placeholder datagrid
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  //ClrDatagrid
  loadingDg: boolean = false;
  dataList = null;
  param = null;
  //input
  searchModel: any = { tanggal: null };
  inputModel: any = { };
  //datetime
  timezone = "string";
  date_now = "string";
  time = "string";
  datedMy = "string";
  // dialog
  modalAddDialog: boolean = false;
  modalApproveDialog: boolean = false;
  modalDetailDialog: boolean = false;
  // Unit
  myRole = null;
  nameUser = null;
  //
  nikUser = null;
  ID_pengguna = null;
  getRupiah = null;

  constructor(
    private toastrService: ToastrService,
    //session
    private sessionService: SessionService,
    private dateServices: ServerDateTimeService,
    private datePipe: DatePipe,
    //database
    private mokerServices: MokerService,
    private branchPegadaianServices: BranchPegadaianService,
    private unitServices : UnitService,
  ) { }

  ngOnInit(): void {
    this.getUnit();
    this.getDateTime();

    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]};
  }

  muter(){
    this.loadingDg = true
  }

  getUnit(){
    const unitString = this.sessionService.getUnit();
    this.nameUser = this.sessionService.getUser().name;
    // this.unit = unitString.code +" - "+ unitString.nama;
    // this.unitCode = unitString.code;
    // this.unitID = unitString._id;
    this.myRole = this.sessionService.getRole().name;
  }

  getDateTime(){
    //get Date Time Server
    let params = "?";
    this.dateServices.task(params).subscribe(output => {
      if (output != false) {
        this.timezone = output;
        let tgl = this.timezone.split("T");
        this.date_now = tgl[0];
        this.time = tgl[1].split("Z")[0];
        this.datedMy = this.datePipe.transform(this.date_now, 'dd-MM-yyyy');
        this.searchModel.tanggal = this.datePipe.transform(this.date_now, 'MM-dd-yyyy');
      }
    })
  }

  onCari(data){
    if (data.tanggal == null) {
      this.toastrService.warning("Tanggal harus diisi");
      return
    }

    this.loadingDg = true; // CLR Datagrid loading
    let tgl = this.datePipe.transform(data.tanggal, 'yyyy-MM-dd');
    this.param = "?_sortby=_id:2&create_date=" + tgl;
    // this.param = "?_sortby=_id:2&flag=approved&create_date=" + tgl;

    this.mokerServices.list(this.param).subscribe(out => {
      if (out == false) {
        this.toastrService.error("Modal anggaran not found");
        this.loadingDg = false;
        return
      }
      this.dataList = out;
      this.toastrService.success("Load "+out["length"]+" data", "Modal anggaran");
      this.loadingDg = false;
    })
  }

  mainDetail(data){
    console.debug(data, "detail data");

    this.inputModel = data;
    this.inputModel.iam = data.otorisasi_by.name;
    this.inputModel.tanggal_transaksi = data.create_date;
    this.inputModel.cab_pengirim = data.cabang_pengirim.code +" - "+ data.cabang_pengirim.nama;
    this.inputModel.cab_penerima = data.cabang_penerima.code +" - "+ data.cabang_penerima.name;

    this.modalDetailDialog = true;
  }

  mainApprove(data){
    console.debug(data, "detail data");

    this.inputModel = data;
    this.inputModel.iam = this.nameUser;
    this.inputModel.tanggal_transaksi = data.create_date;
    this.inputModel.cab_pengirim = data.cabang_pengirim.code +" - "+ data.cabang_pengirim.nama;
    this.inputModel.cab_penerima = data.cabang_penerima.code +" - "+ data.cabang_penerima.name;

    this.modalApproveDialog = true;
  }

  mainApproveSubmit(){
    const data = {
      "_id" : this.inputModel._id,
      "terima_approve_by" : this.nikUser["_hash"],
      "terima_approve_by_encoded" : "base64",
      "terima_approve_date" : this.date_now,
      "terima_approve_time" : this.time,
      "flag" : "terima_approved",
    }

    this.spinner = true;
    this.mokerServices.update(data).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Terima Failed')
        return
      }
      this.spinner = false;
      this.modalApproveDialog = false;
      this.toastrService.success('Terima Success')
    });
    console.log("submitted data", data);
  }

}
