import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";

import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { ParameterGelleryComponent } from '../parameter-gellery/parameter-gellery.component';

//Session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DateService } from "../../../services/system/date.service";

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
  //datetime
  timezone = "string";
  date_now = "string";
  time = "string";

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
    private dateServices : DateService,
    //database
    private prmGlobalService : PrmGlobalService
  ) { }

  ngOnInit(): void {
    this.onDataGrid();
  }

  onDataGrid(){
    // CLR Datagrid loading
    this.loadingDg = true;
   
    // prmjual
    this.prmGlobalService.list().subscribe((response: any) => {
      if (response == false) {
        this.toastrService.error("Data Not Found", "Logam Mulia");
        this.loadingDg = false;
        return;
      }  
      if (response["length"] == 0) {
        this.toastrService.error("Data Not Found", "Logam Mulia");
        this.loadingDg = false;
        return;
      } 
      this.dataList = response;
      this.toastrService.success("Load "+response["length"]+" Data", "Logam Mulia");
      this.loadingDg = false;
    }); 
  }

  mainAdd(){}
  mainDetail(data){}
  mainEdit(data){}


}
