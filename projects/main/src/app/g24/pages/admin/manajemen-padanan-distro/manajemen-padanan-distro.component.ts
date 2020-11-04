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
import { CabangIndukService } from "../../../services/admin/cabang-induk.service";
import { UnitService } from "../../../services/system/unit.service";
import { BranchPadananService } from "../../../services/admin/branch-padanan.service";

@Component({
  selector: 'app-manajemen-padanan-distro',
  templateUrl: './manajemen-padanan-distro.component.html',
  styleUrls: ['./manajemen-padanan-distro.component.scss'],
  providers: [DatePipe],
})

@DContent(ManajemenPadananDistroComponent.key)
export class ManajemenPadananDistroComponent implements OnInit {
  static key = EMenuID.ADMIN_PADANAN_DISTRO;

  //title
  breadcrumb = "Manajemen Padanan Cabang Induk"
  title = "Padanan Cabang Induk"
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
  inputModel: any = {};
  //datetime
  timezone = "string";
  date_now = "string";
  time = "string";
  datedMy = "string";
  // dialog
  modalAddDialog: boolean = false;
  modalEditDialog: boolean = false;
  modalDetailDialog: boolean = false;
  modalDeleteDialog: boolean = false;
  //
  nikUser = null;
  ID_pengguna = null;
  cabangList = null;
  unitList = null;
  kodeLog = null;

  constructor(
    private toastrService: ToastrService,
    //session
    private sessionService: SessionService,
    private dateServices: ServerDateTimeService,
    private datePipe: DatePipe,
    //database
    private unitServices: UnitService,
    private cabangIndukServices: CabangIndukService,
    private branchPadananServices: BranchPadananService,

  ) { }

  defaultInput(): any {
    return {
      unit: null, cabang: null
    }
  }

  ngOnInit(): void {
    this.getDateTime();
    this.loadCabang();
    this.loadUnit();
    this.inputModel = this.defaultInput;
    this.nikUser = this.sessionService.getUser();
    this.nikUser = { "_hash": btoa(JSON.stringify(this.nikUser)), "nik": this.nikUser["username"] };
  }

  validateInput() {
    for (let key in this.inputModel) {
      let value = this.inputModel[key];
      // console.log(value, key, 'key')
      if (value == null || value == "null" || value == 0 || (typeof value === 'number' && value === 0)) {
        this.toastrService.warning("Field belum diisi / sama dengan 0 ");
        return true
      }
    }
    return false
  }

  muter() {
    this.loadingDg = true
  }

  getDateTime() {
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

  loadCabang() {
    this.cabangIndukServices.list().subscribe(out => {
      this.cabangList = out
    })
  }

  loadUnit() {
    this.unitServices.list("?_sortby=code:1&jenis_unit=distro").subscribe(out => {
      this.unitList = out
    })
  }

  onCari(data) {
    // CLR Datagrid loading
    this.loadingDg = true;
    this.param = "?_sortby=code:1";

    let distro = data.dist;
    let cabang = data.cab;
    const prmKode = "&unit.nama_regex=1&unit.nama=" + distro;
    const prmOutlet = "&cabang.nama_regex=1&cabang.nama=" + cabang;

    if (distro != null) {
      this.param = this.param + "&" + prmKode;
    }
    if (cabang != null) {
      this.param = this.param + "&" + prmOutlet;
    }

    this.branchPadananServices.list(this.param).subscribe((response: any) => {
      if (response == false) {
        this.toastrService.error("Data Not Found", "Distro");
        this.loadingDg = false;
        return;
      }
      if (response["length"] == 0) {
        this.toastrService.error("Data Not Found", "Distro");
        this.loadingDg = false;
        return;
      }
      this.dataList = response;
      this.toastrService.success("Load " + response["length"] + " Data", "Distro");
      this.loadingDg = false;
    });
  }
  mainAdd() {
    this.inputModel = this.defaultInput();
    this.modalAddDialog = true
  }
  mainAddSubmit() {
    if (this.validateInput()) return;

    //get data unit
    let unit = null;
    for (let i of this.unitList) {
      if (this.inputModel.unit == i._id) {
        unit = btoa(JSON.stringify(i));
      }
    }

    //get data cabang
    let cabang = null;
    for (let i of this.cabangList) {
      if (this.inputModel.cabang == i._id) {
        cabang = btoa(JSON.stringify(i));
      }
    }

    const data = {
      "unit" : unit,
      "unit_encoded" : "base64",
      "cabang" : cabang,
      "cabang_encoded" : "base64",
      "create_by": this.nikUser["_hash"],
      "create_by_encoded": "base64",
      "create_date": this.date_now,
      "create_time": this.time,
      "_log": 1,
    }

    this.spinner = true;
    let kode = this.inputModel.code;
      this.branchPadananServices.add(data).subscribe((response) => {
        if (response == false) {
          this.toastrService.error('Add Failed')
          return
        }
        this.spinner = false;
        this.modalAddDialog = false;
        this.toastrService.success('Add Success')
      });
    console.log("submitted data", data);
  }
  mainEdit(data) {
    this.inputModel = data;
    this.inputModel.units = data.unit._id;
    this.inputModel.cabangs = data.cabang._id;
    this.modalEditDialog = true;
  }
  mainEditSubmit() {
    if (this.validateInput()) return;

    //get data unit
    let unit = null;
    for (let i of this.unitList) {
      if (this.inputModel.units == i._id) {
        unit = btoa(JSON.stringify(i));
      }
    }

    //get data cabang
    let cabang = null;
    for (let i of this.cabangList) {
      if (this.inputModel.cabangs == i._id) {
        cabang = btoa(JSON.stringify(i));
      }
    }

    const data = {
      "_id" : this.inputModel._id,
      "unit" : unit,
      "unit_encoded" : "base64",
      "cabang" : cabang,
      "cabang_encoded" : "base64",
      "update_by": this.nikUser["_hash"],
      "update_by_encoded": "base64",
      "update_date": this.date_now,
      "update_time": this.time,
      "_log": 1,
    }

    this.spinner = true;
    let kode = this.inputModel.code;
      this.branchPadananServices.update(data).subscribe((response) => {
        if (response == false) {
          this.toastrService.error('Update Failed')
          return
        }
        this.spinner = false;
        this.modalEditDialog = false;
        this.toastrService.success('Update Success')
      });
    console.log("submitted data", data);
  }
  mainDetail(data) {
    this.inputModel = data;
    this.inputModel.distros = data.unit.nama;
    this.inputModel.cabangs = data.cabang.nama;

    this.modalDetailDialog = true;
  }
  mainDelete(data) {
    this.inputModel = data
    this.modalDeleteDialog = true;
  }
  mainDeleteSubmit(){
    if (this.validateInput()) return;

    const data = {
      "_id": this.inputModel._id
    }

    this.spinner = true;
    this.branchPadananServices.delete(data).subscribe(out => {
      if (out === false) {
        this.toastrService.error("Delete Failed");
        this.spinner = false;
        return;
      }
      this.spinner = false;
      this.modalDeleteDialog = false;
      this.toastrService.success('Delete Success')
    });
    console.debug(data, "submited data")
  }
}
