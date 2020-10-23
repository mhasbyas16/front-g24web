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

@Component({
  selector: 'app-manajemen-cabang',
  templateUrl: './manajemen-cabang.component.html',
  styleUrls: ['./manajemen-cabang.component.scss'],
  providers: [DatePipe],
})

@DContent(ManajemenCabangComponent.key)
export class ManajemenCabangComponent implements OnInit {
  static key = EMenuID.ADMIN_ADD_CABANGINDUK;

  //title
  breadcrumb = "Manajemen Cabang Induk"
  title = "Cabang Induk"
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
  kodeLog = null;

  constructor(
    private toastrService: ToastrService,
    //session
    private sessionService: SessionService,
    private dateServices: ServerDateTimeService,
    private datePipe: DatePipe,
    //database
    private cabangIndukServices: CabangIndukService,
  ) { }

  defaultInput(): any {
    return {
      code: null, nama: null, area: null
    }
  }

  ngOnInit(): void {
    this.getDateTime();
    this.inputModel = this.defaultInput;
    this.nikUser = this.sessionService.getUser();
    this.nikUser = { "_hash": btoa(JSON.stringify(this.nikUser)), "nik": this.nikUser["username"] };
  }

  validateInput() {
    for (let key in this.inputModel) {
      let value = this.inputModel[key];
      // console.debug(value, key, 'key')
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

  onCari(data) {
    // CLR Datagrid loading
    this.loadingDg = true;
    this.param = "?_sortby=code:1";

    let kd = data.kd;
    let cabang = data.cabang;
    const prmKode = "&code_regex=1&code=" + kd;
    const prmOutlet = "&nama_regex=1&nama=" + cabang;

    if (kd != null) {
      this.param = this.param + "&" + prmKode;
    }
    if (cabang != null) {
      this.param = this.param + "&" + prmOutlet;
    }

    this.cabangIndukServices.list(this.param).subscribe((response: any) => {
      if (response == false) {
        this.toastrService.error("Data Not Found", "Cabang Induk");
        this.loadingDg = false;
        return;
      }
      if (response["length"] == 0) {
        this.toastrService.error("Data Not Found", "Cabang Induk");
        this.loadingDg = false;
        return;
      }
      this.dataList = response;
      this.toastrService.success("Load " + response["length"] + " Data", "Cabang Induk");
      this.loadingDg = false;
    });
  }
  mainAdd() {
    this.inputModel = this.defaultInput();
    this.modalAddDialog = true
  }
  mainAddSubmit() {
    if (this.validateInput()) return;

    const data = {
      "code": this.inputModel.code,
      "nama": this.inputModel.nama,
      "area": this.inputModel.area,
      "create_by": this.nikUser["_hash"],
      "create_by_encoded": "base64",
      "create_date": this.date_now,
      "create_time": this.time,
      "_log": 1,
    }

    this.spinner = true;
    let kode = this.inputModel.code;
    this.cabangIndukServices.get("?code=" + kode).subscribe(resp => {
      if (resp != false) {
        this.toastrService.warning("Kode Cabang Induk " + kode + " sudah ada");
        this.spinner = false;
        return
      }
      this.cabangIndukServices.add(data).subscribe((response) => {
        if (response == false) {
          this.toastrService.error('Add Failed')
          return
        }
        this.spinner = false;
        this.modalAddDialog = false;
        this.toastrService.success('Add Success')
      });
    });
    console.debug("submitted data", data);
  }
  mainEdit(data) {
    this.inputModel = data;
    this.kodeLog = data.code;

    this.modalEditDialog = true;
  }
  mainEditSubmit() {
    if (this.validateInput()) return;

    const data = {
      "_id" : this.inputModel._id,
      "code": this.inputModel.code,
      "nama": this.inputModel.nama,
      "area": this.inputModel.area,
      "update_by": this.nikUser["_hash"],
      "update_by_encoded": "base64",
      "update_date": this.date_now,
      "update_time": this.time,
      "_log": 1,
    }

    this.spinner = true;
    let kode = this.inputModel.code;
    this.cabangIndukServices.get("?code=" + kode).subscribe(out => {
      if (this.kodeLog != out.code) {
        this.toastrService.warning('Kode sudah ada dengan nama ' + out.nama);
        this.spinner = false;
        return;
      }
      this.cabangIndukServices.update(data).subscribe((response) => {
        if (response == false) {
          this.toastrService.error('Update Failed')
          return
        }
        this.spinner = false;
        this.modalEditDialog = false;
        this.toastrService.success('Update Success')
      });
    });
    console.debug("submitted data", data);
  }
  mainDetail(data) { 
    this.inputModel = data;

    this.modalDetailDialog= true;
  }
  mainDelete(data) { 
    this.inputModel = data
    this.modalDeleteDialog = true;
  }
  mainDeleteSubmit() { 
    if (this.validateInput()) return;

    const data = {
      "_id": this.inputModel._id
    }

    this.spinner = true;
    this.cabangIndukServices.delete(data).subscribe(out => {
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
