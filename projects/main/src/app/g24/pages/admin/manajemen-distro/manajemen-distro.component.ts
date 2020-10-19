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
import { RegionalService } from "../../../services/admin/regional.service";
import { UnitService } from "../../../services/system/unit.service";
import { UserService } from "../../../services/security/user.service";

@Component({
  selector: 'app-manajemen-distro',
  templateUrl: './manajemen-distro.component.html',
  styleUrls: ['./manajemen-distro.component.scss'],
  providers: [DatePipe],
})

@DContent(ManajemenDistroComponent.key)
export class ManajemenDistroComponent implements OnInit {
  static key = EMenuID.ADMIN_ADD_DISTRO;

  //title
  breadcrumb = "Manajemen Distro"
  title = "Distro"
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
  regionalList = null;
  kodeLog = null;
  managerList = null;

  constructor(
    private toastrService: ToastrService,
    //session
    private sessionService: SessionService,
    private dateServices: ServerDateTimeService,
    private datePipe: DatePipe,
    //database
    private unitServices: UnitService,
    private regionalServices: RegionalService,
    private userServices: UserService,
  ) { }

  defaultInput(): any {
    return {
      code: null, nama: null, alamat: null, regional: null
    }
  }

  ngOnInit(): void {
    this.getDateTime();
    this.loadRegional();
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

  loadRegional() {
    this.regionalServices.list().subscribe(out => {
      this.regionalList = out
    })
  }

  loadManager() {
    this.userServices.list("?_sortby=name:1").subscribe(out => {
      this.managerList = out
    })
  }

  onCari(data) {
    // CLR Datagrid loading
    this.loadingDg = true;
    this.param = "?_sortby=code:1";

    let kd = data.kdout;
    let outlet = data.outlet;
    const prmKode = "&code_regex=1&code=" + kd;
    const prmOutlet = "&nama_regex=1&nama=" + outlet;

    if (kd != null) {
      this.param = this.param + "&" + prmKode;
    }
    if (outlet != null) {
      this.param = this.param + "&" + prmOutlet;
    }

    this.unitServices.list(this.param).subscribe((response: any) => {
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

    const data = {
      "code": this.inputModel.code,
      "nama": this.inputModel.nama,
      "alamat": this.inputModel.alamat,
      "parent_code": this.inputModel.regional,
      "create_by": this.nikUser["_hash"],
      "create_by_encoded": "base64",
      "create_date": this.date_now,
      "create_time": this.time,
      "_log": 1,
    }

    this.spinner = true;
    let kode = this.inputModel.code;
    this.unitServices.get("?code=" + kode).subscribe(resp => {
      if (resp != false) {
        this.toastrService.warning("Kode Outlet " + kode + " sudah ada");
        this.spinner = false;
        return
      }
      this.unitServices.add(data).subscribe((response) => {
        if (response == false) {
          this.toastrService.error('Add Failed')
          return
        }
        this.spinner = false;
        this.modalAddDialog = false;
        this.toastrService.success('Add Success')
      });
    });
    console.log("submitted data", data);
  }

  mainEdit(data) {
    this.inputModel = data;
    if (data.parent_code == null) {
      this.inputModel.regional = null;
    } else {
      this.inputModel.regional = data.parent_code;
    }
    this.kodeLog = data.code;

    this.modalEditDialog = true;
  }
  mainEditSubmit() {
    if (this.validateInput()) return;

    //get data Regional
    let regional = null;
    for (let i of this.regionalList) {
      if (this.inputModel.regional == i._id) {
        regional = btoa(JSON.stringify(i));
      }
    }

    const data = {
      "_id": this.inputModel._id,
      "code": this.inputModel.code,
      "nama": this.inputModel.nama,
      "alamat": this.inputModel.alamat,
      "parent_code": this.inputModel.regional,
      "update_by": this.nikUser["_hash"],
      "update_by_encoded": "base64",
      "update_date": this.date_now,
      "update_time": this.time,
      "_log": 1,
    }

    this.spinner = true;
    let kode = this.inputModel.code;
    this.unitServices.get("?code=" + kode).subscribe(out => {
      if (this.kodeLog != out.code) {
        this.toastrService.warning('Kode sudah ada dengan nama ' + out.nama);
        this.spinner = false;
        return;
      }
      this.unitServices.update(data).subscribe((response) => {
        if (response == false) {
          this.toastrService.error('Update Failed')
          return
        }
        this.spinner = false;
        this.modalEditDialog = false;
        this.toastrService.success('Update Success')
      });
    });
    console.log("submitted data", data);
  }

  mainDetail(data) {
    this.inputModel.kode = data.code;
    this.inputModel.nama = data.nama;
    this.inputModel.alamat = data.alamat;
    if (data.parent_code == null) {
      this.inputModel.regional = null;
    } else {
      for(let i of this.regionalList){
        if (data.parent_code == i.code) {
          this.inputModel.regional = i.nama;
        }
      }
    }
    this.modalDetailDialog = true;
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
    this.unitServices.delete(data).subscribe(out => {
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
