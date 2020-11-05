import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
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
import { UnitService } from "../../../services/system/unit.service";
import { ProvinceService } from "../../../services/client/province.service";

@Component({
  selector: 'app-manajemen-distro',
  templateUrl: './manajemen-distro.component.html',
  styleUrls: ['./manajemen-distro.component.scss'],
  providers: [DatePipe],

  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('500ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})

@DContent(ManajemenDistroComponent.key)
export class ManajemenDistroComponent implements OnInit {
  static key = EMenuID.ADMIN_ADD_DISTRO;

  //title
  breadcrumb = "Manajemen Unit"
  title = "Unit"
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
  jnsUnit = null;
  provinceList = null;

  constructor(
    private toastrService: ToastrService,
    //session
    private sessionService: SessionService,
    private dateServices: ServerDateTimeService,
    private datePipe: DatePipe,
    //database
    private unitServices: UnitService,
    private provinceServices: ProvinceService,
  ) { }

  defaultInput(): any {
    return {
      code: null, nama: null, alamat: null, jenis_unit: null
    }
  }

  ngOnInit(): void {
    this.getDateTime();
    this.loadRegional();
    this.loadProvince();
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

  loadRegional() {
    this.unitServices.list("?_sortby=name:1&jenis_unit=regional").subscribe(out => {
      this.regionalList = out
    })
  }

  loadProvince() {
    this.provinceServices.list("?_sortby=name:1").subscribe(out => {
      this.provinceList = out
    })
  }

  onChangeJenis(data) {
    this.jnsUnit = data;
  }

  onCari(data) {
    // CLR Datagrid loading
    this.loadingDg = true;
    this.param = "?_sortby=code:1";

    let kd = this.inputModel.kdout;
    let outlet = this.inputModel.outlet;
    let jenis = this.inputModel.jenis;

    const prmKode = "&code_regex=1&code=" + kd;
    const prmOutlet = "&nama_regex=1&nama=" + outlet;
    const prmJenis = "&jenis_unit_regex=1&jenis_unit=" + jenis;

    if (kd != undefined ) {
      this.param = this.param + prmKode;
    }
    if (outlet != undefined ) {
      this.param = this.param + prmOutlet;
    }

    if (jenis != undefined ) {
      this.param = this.param + prmJenis;
    }

    this.unitServices.list(this.param).subscribe((response: any) => {
      if (response == false) {
        this.toastrService.error("Data Not Found", "Unit");
        this.loadingDg = false;
        return;
      }
      if (response["length"] == 0) {
        this.toastrService.error("Data Not Found", "Unit");
        this.loadingDg = false;
        return;
      }
      this.dataList = response;
      this.toastrService.success("Load " + response["length"] + " Data", "Unit");
      this.loadingDg = false;
    });
  }

  onCariDefault() {
    // CLR Datagrid loading
    this.loadingDg = true;
    this.param = "?_sortby=code:1";

    this.unitServices.list(this.param).subscribe((response: any) => {
      if (response == false) {
        this.toastrService.error("Data Not Found", "Unit");
        this.loadingDg = false;
        return;
      }
      if (response["length"] == 0) {
        this.toastrService.error("Data Not Found", "Unit");
        this.loadingDg = false;
        return;
      }
      this.dataList = response;
      this.toastrService.success("Load " + response["length"] + " Data", "Unit");
      this.loadingDg = false;
    });
  }

  mainAdd() {
    this.inputModel = this.defaultInput();
    this.loadRegional();
    this.modalAddDialog = true
  }
  mainAddSubmit() {
    if (this.validateInput()) return;

    const data = {
      "jenis_unit": this.inputModel.jenis_unit,
      "code": this.inputModel.code,
      "nama": this.inputModel.nama,
      "alamat": this.inputModel.alamat,
      "parent_code": this.inputModel.regional,
      "province": this.inputModel.province,
      "create_by": this.nikUser["_hash"],
      "create_by_encoded": "base64",
      "create_date": this.date_now,
      "create_time": this.time,
      "_log": 1,
    }

    const data1 = {
      "jenis_unit": this.inputModel.jenis_unit,
      "code": this.inputModel.code,
      "nama": this.inputModel.nama,
      "alamat": this.inputModel.alamat,
      "create_by": this.nikUser["_hash"],
      "create_by_encoded": "base64",
      "create_date": this.date_now,
      "create_time": this.time,
      "_log": 1,
    }

    let tempSave = null;
    if (this.jnsUnit == 'distro'){
      tempSave = data;
    } else {
      tempSave = data1;
    }

    this.spinner = true;
    let kode = this.inputModel.code;
    this.unitServices.get("?code=" + kode).subscribe(resp => {
      if (resp != false) {
        this.toastrService.warning("Kode Unit " + kode + " sudah ada");
        this.spinner = false;
        return
      }
      this.unitServices.add(tempSave).subscribe((response) => {
        if (response == false) {
          this.toastrService.error('Add Failed')
          return
        }
        this.spinner = false;
        this.modalAddDialog = false;
        this.onCariDefault();
        this.toastrService.success('Add Success')
      });
    });
    console.debug("submitted data", data);
  }

  mainEdit(data) {
    this.inputModel = data;
    this.jnsUnit = data.jenis_unit;
    if (data.parent_code == null) {
      this.inputModel.regional = null;
      this.inputModel.province = null;
    } else {
      this.inputModel.regional = data.parent_code;
      this.inputModel.province = data.province;
    }
    this.kodeLog = data.code;

    this.modalEditDialog = true;
  }

  mainEditSubmit() {
    if (this.validateInput()) return;

    //get data Regional
    let regional = null;
    for (let i of this.regionalList) {
      if (this.inputModel.regional == i.code) {
        regional = btoa(JSON.stringify(i));
      }
    }

    const data = {
      "_id": this.inputModel._id,
      "jenis_unit": this.inputModel.jenis_unit,
      "code": this.inputModel.code,
      "nama": this.inputModel.nama,
      "alamat": this.inputModel.alamat,
      "parent_code": this.inputModel.regional,
      "province": this.inputModel.province,
      "update_by": this.nikUser["_hash"],
      "update_by_encoded": "base64",
      "update_date": this.date_now,
      "update_time": this.time,
      "_log": 1,
    }

    const data1 = {
      "jenis_unit": this.inputModel.jenis_unit,
      "code": this.inputModel.code,
      "nama": this.inputModel.nama,
      "alamat": this.inputModel.alamat,
      "create_by": this.nikUser["_hash"],
      "create_by_encoded": "base64",
      "create_date": this.date_now,
      "create_time": this.time,
      "_log": 1,
    }

    let tempSave = null;
    if (this.jnsUnit == 'distro'){
      tempSave = data;
    } else {
      tempSave = data1;
    }

    this.spinner = true;
    let kode = this.inputModel.code;
    this.unitServices.get("?code=" + kode).subscribe(out => {
      if (this.kodeLog != out.code) {
        this.toastrService.warning('Kode sudah ada dengan nama ' + out.nama);
        this.spinner = false;
        return;
      }
      this.unitServices.update(tempSave).subscribe((response) => {
        if (response == false) {
          this.toastrService.error('Update Failed')
          return
        }
        this.spinner = false;
        this.modalEditDialog = false;
        this.onCariDefault();
        this.toastrService.success('Update Success')
      });
    });
    console.debug("submitted data", data);
  }

  mainDetail(data) {
    this.inputModel.jenis_unit = data.jenis_unit
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
      for (let i of this.provinceList){
        if (data.province == i.code) {
          this.inputModel.prov = i.name;
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
      this.onCariDefault();
      this.toastrService.success('Delete Success')
    });
    console.debug(data, "submited data")
  }
}
