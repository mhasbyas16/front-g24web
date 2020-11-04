import { Component, OnInit } from '@angular/core';
// Sidebar
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
//toast
import { ToastrService } from "ngx-toastr";
//select2
import { Select2OptionData } from "ng-select2";
import { Options } from "select2";
//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ServerDateTimeService } from "../../../services/system/server-date-time.service";
import { DatePipe } from '@angular/common';
//database
import { MokerService } from "../../../services/transaction/moker.service";
// import { BranchPegadaianService } from "../../../services/branch-pegadaian.service";
import { BranchPadananService } from "../../../services/admin/branch-padanan.service";
import { UnitService } from "../../../services/system/unit.service";

@Component({
  selector: 'app-input-moker',
  templateUrl: './input-moker.component.html',
  styleUrls: ['./input-moker.component.scss'],
  providers: [DatePipe],
})

@DContent(InputMokerComponent.key)
export class InputMokerComponent implements OnInit {
  static key = EMenuID.INPUT_MOKER

  //title
  breadcrumb = "Kirim Modal Kerja"
  title = "Modal Kerja"
  // spinner 
  spinner = false;
  //placeholder datagrid
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  //ClrDatagrid
  loadingDg: boolean = false;
  dataList = null;
  param = null;
  //select
  listCabang = null;
  // select2
  cabang : Array<Select2OptionData>;
  public options : Options;
  //input
  searchModel: any = { tanggal: null };
  inputModel: any = { items: [] };
  //datetime
  timezone = "string";
  date_now = "string";
  time = "string";
  datedMy = "string";
  // dialog
  modalAddDialog: boolean = false;
  modalDeleteDialog: boolean = false;
  modalDetailDialog: boolean = false;
  // Unit
  listUnit = null;
  unit = null;
  unitCode = null;
  unitID = null;
  myRole = null;
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
    private branchPadananServices: BranchPadananService,
    private unitServices : UnitService,
  ) { }

  defaultInput(): any {
    return{
      id_transaksi : null, tgl_transaksi : null, cabang_pengirim : null,
      cabang_penerima : null, nominal : 0, keterangan : null
    }
  }

  ngOnInit(): void {
    this.getUnit();
    this.generateID();
    this.getDateTime();
    this.onListCabang();
    this.onListUnit();

    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]};

    this.options = {
      multiple: true,
      maximumSelectionLength: 1,
      allowClear: true,
      closeOnSelect: true,
      width: '200',
      placeholder: 'Please select'
    };
  }

  validateInput(){
    for(let key in this.inputModel)
    {
      let value = this.inputModel[key];
      // console.log(value, key, 'key')
      if(value == null || value == "null" || value == 0 || (typeof value === 'number' && value === 0))
      {
        this.toastrService.warning("Field belum diisi / sama dengan 0 ");
        return true
      }
    }
    return false
  }

  muter() {
    this.loadingDg = true
  }

  getUnit(){
    const unitString = this.sessionService.getUnit();
    this.unit = unitString.code +" - "+ unitString.nama;
    this.unitCode = unitString.code;
    this.unitID = unitString._id;
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
        console.log(this.searchModel.tanggal,'wkwkwkwkkw')
      }
    })
  }

  generateID(){
    // generate ID Penjualan
    let getCount = null;
    var getRandom = Math.random() * 1023295;
    let rand = getRandom.toString().substr(0, 3);
    let id = rand.toString().substr(0, 10);
    this.mokerServices.count().subscribe(out => {
      if ( out != false){
        getCount = out.count;
        this.ID_pengguna = "TR-"+id+getCount;
      }
    });
  }

  onListUnit(){
    this.unitServices.list().subscribe(out => {
      this.listUnit =  out;
    })
  }

  onListCabang(){
    this.branchPadananServices.list("?unit.code="+this.unitCode).subscribe(out => {
      this.listCabang = out;
      let cb =[]
      for(let data of out){
        let join = data.code+" - "+data.name;
        cb.push({id:data._id,text:join});
      }
      this.cabang = cb;
    })
  }

  onCari() {
    
    this.param = "?_sortby=_id:2&create_date=" + this.date_now;

    this.mokerServices.list(this.param).subscribe(out => {
      if (out == false) {
        this.toastrService.error("Data Setor Moker not found");
        this.loadingDg = false;
        return
      }
      this.dataList = out;
      this.toastrService.success("Load "+out["length"]+" data", "Data Setor Moker");
      this.loadingDg = false;
    })
  }

  mainAdd() {
    this.inputModel = this.defaultInput();
    this.inputModel.id_transaksi = this.ID_pengguna;
    this.inputModel.tgl_transaksi = this.datedMy;
    this.inputModel.pengirim = this.unit;
    this.inputModel.cabang_pengirim = this.unitID;

    this.modalAddDialog = true;
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
    this.getRupiah = "Rp. "+rupiah;
    return
  }

  mainAddSubmit(){
    if(this.validateInput()) return;

    //get penerima
    let dari = null
    for(let i of this.listUnit){
      if (this.inputModel.cabang_pengirim == i._id) {
        dari = btoa(JSON.stringify(i));
      }
    }

    //get penerima
    let penerima = null
    for(let i of this.listCabang){
      if (this.inputModel.cabang_penerima == i._id) {
        penerima = btoa(JSON.stringify(i));
      }
    }

    const data = {
      "id_transaksi" : this.inputModel.id_transaksi,
      "cabang_pengirim" : dari,
      "cabang_pengirim_encoded" : "base64",
      "cabang_penerima" : penerima,
      "cabang_penerima_encoded" : "base64",
      "nominal" : this.inputModel.nominal,
      "nominal_encoded" : "double",
      "keterangan" : this.inputModel.keterangan,
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : this.date_now,
      "create_time" : this.time,
      "flag" : "submit",
    }

    this.spinner = true;
    this.mokerServices.add(data).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Add Failed')
        return
      }
      this.spinner = false;
      this.modalAddDialog = false;
      this.toastrService.success('Add Success');
      this.onCari();
    });
    console.log("submitted data", data);
  }

  mainDetail(data) {
    console.debug(data, "detail data");

    this.inputModel = data;
    this.inputModel.tanggal_transaksi = data.create_date;
    this.inputModel.cab_pengirim = data.cabang_pengirim.code +" - "+ data.cabang_pengirim.nama;
    this.inputModel.cab_penerima = data.cabang_penerima.code +" - "+ data.cabang_penerima.name;

    this.modalDetailDialog = true;
  }

  mainDelete(data){
    console.debug(data, "delete data");

    this.inputModel.id = data._id
    console.log(this.inputModel.id,'idku')
    this.modalDeleteDialog = true;
  }

  mainDeleteSubmit(){
    const data = {
      _id : this.inputModel.id
    }

    this.spinner = true;
    this.mokerServices.delete(data).subscribe((response) => {
      if (response == false) {
        this.toastrService.error('Deleta Failed')
        return
      }
      this.spinner = false;
      this.modalDeleteDialog = false;
      this.toastrService.success('Delete Success')
    });
    console.log("submitted data", data);
  }

}
