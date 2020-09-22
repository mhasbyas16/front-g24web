import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";

import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';

//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ServerDateTimeService } from "../../../services/system/server-date-time.service";

//database
import { PrmGlobalService } from '../../../services/parameter/prm-global.service';

@Component({
  selector: 'app-parameter-global',
  templateUrl: './parameter-global.component.html',
  styleUrls: ['./parameter-global.component.scss']
})

@DContent(ParameterGlobalComponent.key)
export class ParameterGlobalComponent implements OnInit {
  static key = EMenuID.PRM_GLOBAL;
  
  //title
  breadcrumb = "Parameter Global"
  title = "Setup Parameter Global"
  // spinner 
  spinner = false;
  //placeholder datagrid
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  // ClrDatagrid
  loadingDg: boolean = false;
  dataList = null;
  param = null;
  //datetime
  timezone = "string";
  date_now = "string";
  time = "string";
  //user
  nikUser = null;

  // dialog
  modalAddDialog: boolean = false;
  modalEditDialog: boolean = false;
  modalDeleteDialog: boolean = false;
  modalDetailDialog: boolean = false;

  //

  constructor(
    private toastrService: ToastrService,
    //session
    private sessionService: SessionService,
    private dateServices : ServerDateTimeService,
    //database
    private prmGlobalService : PrmGlobalService
  ) { }
  
  searchModel : any = {search : null};
  inputModel : any = {items : []};
  defaultInput(): any {
    return{
      input_keterangan : null, input_value: null, input_code: null
    }
  }

  ngOnInit(): void {
    this.inputModel = this.defaultInput();
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"nik":this.nikUser["username"]};
    let params = "?";
    this.dateServices.task(params).subscribe(output=>{
      if(output!=false){
        this.timezone = output;
        let tgl = this.timezone.split("T");
          this.date_now = tgl[0];
          this.time = tgl[1].split("Z")[0];
      }
    });
  }

  onDataGrid(data){
    // CLR Datagrid loading
    this.loadingDg = true;
    
    let sc = data.input_search;
    if (sc == null) {
      this.param == '';
    }else {
      this.param = "?code_regex=1&code="+sc;
    }

    // prmGlobal
    this.prmGlobalService.list(this.param).subscribe((response: any) => {
      if (response == false) {
        this.toastrService.error("Data Not Found", "Parameter Global");
        this.loadingDg = false;
        return;
      }  
      if (response["length"] == 0) {
        this.toastrService.error("Data Not Found", "Parameter Global");
        this.loadingDg = false;
        return;
      } 
      this.dataList = response;
      this.toastrService.success("Load "+response["length"]+" Data", "Parameter Global");
      this.loadingDg = false;
    }); 
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

  mainAdd(){
    this.inputModel = this.defaultInput();
    this.modalAddDialog = true;
  }
  mainAddSubmit(){
    if(this.validateInput()) return;

    let dataInput = {
      "code" : this.inputModel.input_code,
      "value" : this.inputModel.input_value,
      "keterangan" : this.inputModel.input_keterangan,
      "create_by" : this.nikUser["_hash"],
      "create_by_encoded" : "base64",
      "create_date" : this.date_now,
      "create_time" : this.time,
    }

    this.spinner = true;
    this.prmGlobalService.add(dataInput).subscribe((out) => {
      if(out == false){
        this.toastrService.error("Add failed")
        return
      }
      this.spinner = false;
      this.modalAddDialog = false;
      // this.onDataGrid();
      this.toastrService.success('Add Success');
    })
    console.debug(dataInput,"submited data")
  }

  mainEdit(data){
    console.debug(data,"dataEdit")

    this.prmGlobalService.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.prmGlobalService.message());
      }
    });

    this.inputModel = data;
    this.inputModel.input_code = data.code;
    this.inputModel.input_value = data.value;
    this.inputModel.input_keterangan = data.keterangan;
    this.modalEditDialog = true;
  }

  mainEditSubmit(){
    if(this.validateInput()) return;

    let dataInput = {
      "_id" : this.inputModel._id,
      "value" : this.inputModel.input_value,
      "keterangan" : this.inputModel.input_keterangan,
      "update_by" : this.nikUser["_hash"],
      "update_by_encoded" : "base64",
      "update_date" : this.date_now,
      "update_time" : this.time,
    }

    this.spinner = true;
    this.prmGlobalService.add(dataInput).subscribe((out) => {
      if(out == false){
        this.toastrService.error("Update failed")
        return
      }
      this.spinner = false;
      this.modalEditDialog = false;
      // this.onDataGrid();
      this.toastrService.success('Update Success');
    })
    console.debug(dataInput,"submited data")
  }
  mainDetail(data){
    console.debug(data,"dataDetail")

    this.prmGlobalService.get("?_id="+data._id).subscribe((response) => {
      if (response == false) {
        this.toastrService.error(this.prmGlobalService.message());
      }
    });

    this.inputModel = data;
    this.inputModel.input_code = data.code;
    this.inputModel.input_value = data.value;
    this.inputModel.input_keterangan = data.keterangan;
    this.modalDetailDialog = true;
  }


}
