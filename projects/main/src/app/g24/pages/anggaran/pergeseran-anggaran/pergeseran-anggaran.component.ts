import { Component, OnInit } from '@angular/core';
// Sidebar
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
//toast
import { ToastrService } from "ngx-toastr";
//select2
import { Select2OptionData  } from "ng-select2";
import { Options } from "select2";
import * as jquery from 'jquery';
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DateService } from "../../../services/system/date.service";
//database
import { AnggaranService } from "../../../services/keuangan/anggaran/anggaran.service";
import { PrmJournalService } from "../../../services/keuangan/jurnal/prm-journal.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-pergeseran-anggaran',
  templateUrl: './pergeseran-anggaran.component.html',
  styleUrls: ['./pergeseran-anggaran.component.scss']
})

@DContent(PergeseranAnggaranComponent.key)
export class PergeseranAnggaranComponent implements OnInit {
  static key = EMenuID.PERGESERAN_ANGGARAN

  //title
  breadcrumb = "Pergeseran Anggaran"
  title = "Pergeseran Anggaran"
  // spinner 
  spinner = false;
  //placeholder datagrid
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  //ClrDatagrid
  loadingDg: boolean = false;
  dataList = null;
  param = null;
  //datetime
  timezone = "string";
  date_now = "string";
  time = "string";
  //user
  nikUser = null;
  nameUser = null;
  myRole = null;
  //select
  listMataAnggaran = null;
  listPemegang = null;
  asalAnggaran = null;
  diTujukan = null;
  getRupiah = null;
  getAnggaran = null;
  //
  ID_pengguna = null;
  perihal = null;
  ttlAnggaran = null;
  // select2
  listAsalAnggaran : Array<Select2OptionData>;
  listDitujukan : Array<Select2OptionData>;
  // dialog
  modalAddDialog: boolean = false;
  modalConfirmDialog: boolean = false;
  modalDetailDialog: boolean = false;

  constructor(
    private toastrService: ToastrService,
    //session
    private sessionService: SessionService,
    private dateServices : DateService,
    //database
    private anggaranServices : AnggaranService,
    private prmJournalServices : PrmJournalService,
    private userServices : UserService,
  ) {}

  searchModel : any = {mata_anggaran : "all"};
  inputModel : any = {items : []};
  public options:Options;

  defaultInput(): any {
    return{
      asal_anggaran : null, ditujukan: null, ttl_anggaran: 0,
      id_pengajuan : null, perihal : null
    }
  }

  ngOnInit(): void {
    // generate ID Penjualan
    let getCount = null;
    var getRandom = Math.random() * 1023295;
    let rand = getRandom.toString().substr(0, 3);
    let id = rand.toString().substr(0, 10);
    this.anggaranServices.count().subscribe(out => {
      if ( out != false){
        getCount = out.count;
        this.ID_pengguna = "PR-"+id+getCount;
      }
    });
    //get Date Time Server
    let params = "?";
    this.dateServices.task(params).subscribe(output=>{
      if(output!=false){
        this.timezone = output;
        let tgl = this.timezone.split("T");
          this.date_now = tgl[0];
          this.time = tgl[1].split("Z")[0];
      }
    })

    this.myRole = this.sessionService.getRole().name;
    this.nameUser = this.sessionService.getUser().name;
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]};
    this.onAsalAnggaran();
    this.onDitujukan();

    this.options = {
      multiple: true,
      maximumSelectionLength: 1,
      width: '200',
      searchable: true,
      placeholder: 'Please select'
    };
  }

  validateInput(){
    for(let key in this.inputModel)
    {
      let value = this.inputModel[key];
      console.log(value, key, 'key')
      if(value == null || value == "null" || value == "null" || (typeof value === 'number' && value === 0))
      {
        this.toastrService.warning("Field belum diisi / sama dengan 0 ");
        return true
      }
    }
    return false
  }

  muter(){
    this.loadingDg = true
  }

  onCari(data){
    // CLR Datagrid loading
    this.loadingDg = true;
    
    this.param = "?_sortby=_id:2&id_pergeseran_regex=1&id_pergeseran=pr";
    let mtanggaran = data.input_mataAnggaran;

    const prmMt = "mata_anggaran.code"+mtanggaran;

    if (mtanggaran != 'all') {
      this.param = this.param + prmMt;
    }

    this.anggaranServices.list(this.param).subscribe(out => {
      if (out == false) {
        this.toastrService.error("Data mata anggaran not found");
      }
      this.dataList = out;
      this.toastrService.success("Load "+out["length"]+" Data", "Mata Anggaran");
      this.loadingDg = false;
    })
  }

  onAsalAnggaran(){
    this.prmJournalServices.list("?flag=D&_sortby=name:1").subscribe(out => {
      if (out != false) {
        this.listMataAnggaran = out;

      let ma =[]
      for(let data of out){
        let join = data.coaCode+" - "+data.name;
        ma.push({id:data._id,text:join});
      }
      this.asalAnggaran = ma;
      }     
    })
  }

  changeAnggaran(data){
    for (let i of data){
      this.anggaranServices.get("?mata_anggaran._id="+i).subscribe(out => {
        this.getAnggaran = out.budget;
      });
    }
  }

  onDitujukan(){
    this.prmJournalServices.list("?flag=D&_sortby=name:1").subscribe(out => {
      if (out != false) {
        this.listMataAnggaran = out;

      let dt =[]
      for(let data of out){
        let join = data.coaCode+" - "+data.name;
        dt.push({id:data._id,text:join});
      }
      this.diTujukan = dt;
      }     
    })
  }

  onListUser(){
    this.userServices.list("?_sortby=name:1").subscribe(out => {
      if (out != false) {
        this.listPemegang = out;
      }     
    })
  }

  generateRupiah(data){
    let numbString = data.toString();
    let sisa 	= numbString.length % 3;
	  let rupiah 	= numbString.substr(0, sisa);
    let ribuan 	= numbString.substr(sisa).match(/\d{3}/g);
    
    if (ribuan) {
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    this.getRupiah = rupiah;
    return
  }

  mainAdd(){
    this.inputModel = this.defaultInput();
    this.inputModel.id_pengajuan = this.ID_pengguna;
    this.inputModel.nama = this.nameUser;

    this.modalAddDialog = true;
  }

  mainAddSubmit(){
    if(this.validateInput()) return;

    if (this.inputModel.ttl_anggaran > this.getAnggaran) {
      this.toastrService.info("Total anggaran melebihi anggaran "+ this.getAnggaran);
      return
    }

    let ma = null;
    for(let i of this.listMataAnggaran){
      if (this.inputModel.asal_anggaran == i._id) {
        ma = btoa(JSON.stringify(i));
      }
    }

    let pa = null;
    for(let i of this.listMataAnggaran){
      if (this.inputModel.ditujukan == i._id) {
        pa = btoa(JSON.stringify(i));
      }
    }

    let data = {
      "id_pergeseran" : this.inputModel.id_pengajuan,
      "perihal" : this.inputModel.perihal_anggaran,
      "asal_anggaran" : ma,
      "asal_anggaran_encoded" : "base64",
      "ditujukan" : pa,
      "ditujukan_encoded" : "base64",
      "perihal_ket" : this.inputModel.perihal,
      "total_anggaran" : parseFloat(this.inputModel.ttl_anggaran),
      "total_anggaran_encoded": "double",
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : this.date_now,
      "create_time" : this.time,
      "flag" : "submit",
    }

    this.spinner = true;
    this.anggaranServices.add(data).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Add failed')
        return
      }
      this.spinner = false;
      this.modalAddDialog = false;
      this.toastrService.success('Add success')
    });
    console.log("submitted data", data);
  }

  mainApprove(data){
    console.debug(data,"Approve");

    this.anggaranServices.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.anggaranServices.message());
      }
    });
    
    this.inputModel = data;
    this.inputModel.id_pergeseran = data.id_pergeseran;
    this.inputModel.perihal_anggaran = data.perihal;
    this.inputModel.asal = data.asal_anggaran.name;
    this.inputModel.tujuan_anggaran = data.ditujukan.name;
    this.inputModel.perihal_ket = data.perihal_ket;
    this.inputModel.keterangan = data.keterangan;
    this.inputModel.ttl_anggaran = data.total_anggaran;

    this.modalConfirmDialog = true;
  }
  
  mainApproveSubmit(){
    let data = {
      "_id" : this.inputModel._id,
      "keterangan" : this.inputModel.keterangan,
      "approve_by" : this.nikUser["_hash"],
      "approve_by_encoded" : "base64",
      "approve_date" : this.date_now,
      "approve_time" : this.time,
      "flag" : "approved",
    }

    this.spinner = true;
    this.anggaranServices.update(data).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Approve failed')
        return
      } 
      this.spinner = false;
      this.modalConfirmDialog = false;
      this.toastrService.success('Approve success')
    });
    console.log("submitted data", data);
  }
  mainDeclineSubmit(){
    let data = {
      "id_pengajuan" : this.inputModel._id,
      "keterangan" : this.inputModel.keterangan,
      "decline_by" : this.nikUser["_hash"],
      "decline_by_encoded" : "base64",
      "decline_date" : this.date_now,
      "decline_time" : this.time,
      "flag" : "declined",
    }

    this.spinner = true;
    this.anggaranServices.update(data).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Declined failed')
        return
      } 
      this.spinner = false;
      this.modalAddDialog = false;
      this.toastrService.success('Declined success')
    });
    console.log("submitted data", data);
  }

  mainDetail(data){
    console.debug(data,"Detail");

    this.anggaranServices.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.anggaranServices.message());
      }
    });
    
    this.inputModel = data;
    this.inputModel.id_pergeseran = data.id_pergeseran;
    this.inputModel.perihal_anggaran = data.perihal;
    this.inputModel.asal = data.asal_anggaran.name;
    this.inputModel.tujuan_anggaran = data.ditujukan.name;
    this.inputModel.perihal_ket = data.perihal_ket;
    this.inputModel.keterangan = data.keterangan;
    this.inputModel.ttl_anggaran = data.total_anggaran;

    this.modalDetailDialog = true;
  }

}
