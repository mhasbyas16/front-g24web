import { Component, OnInit } from '@angular/core';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";
import { ToastrService } from 'ngx-toastr';
import { ContentPage } from '../../../lib/helper/content-page';

// session
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { BuybackParameterService } from '../../../services/buyback/buyback-parameter.service';
import { SplitDateServiceService } from '../../../services/split-date-service.service';

@Component({
  selector: 'app-parameter-buyback',
  templateUrl: './parameter-buyback.component.html',
  styleUrls: ['./parameter-buyback.component.scss'],
  providers:[DatePipe],
})

@DContent(ParameterBuybackComponent.key)
export class ParameterBuybackComponent implements OnInit {

  modalAdd: boolean= false;
  confirmation:boolean = false;

  formAdd: FormGroup = null;
  search: FormGroup = null;

  nikUser:any= null;
  modalTitle:any;
  _id:any;
  vertical = '';

  dataSearch=[];

  constructor(
    private sessionService:SessionService,
    private datePipe:DatePipe,
    private buybackParameterService:BuybackParameterService,
    private toastrService:ToastrService,
    private splitDateServiceService:SplitDateServiceService
  ) { }

  ngOnInit(): void {
    // Maker
    this.nikUser = this.sessionService.getUser();
    this.nikUser = {"_hash":btoa(JSON.stringify(this.nikUser)),"role":this.nikUser.role.name} ;
    this.form();
    this.formSearch();
    this.dataList();
  }

  dataList(){
    let form = this.datePipe.transform(Date.now(),'yyyy-MM-dd');
    let to = this.datePipe.transform(Date.now(),'yyyy-MM-dd');

    this.buybackParameterService.list("?_hash=1&_sortby=flag:1&_between=makerDate&_start=" + form + "&_end=" + to).subscribe((response:any)=>{
      if (response == false || response["length"] == 0) {
        this.toastrService.error("Data Not Found");
        return;
      }
      this.dataSearch = response;
      this.toastrService.success("Load Data "+this.dataSearch.length);
    });
  }

  filterTransaction(){
    if (!this.search.valid) {
      this.toastrService.error("Form Not Valid");
        this.dataSearch = [];
        return;
    }
    let data = this.search.getRawValue();
    console.debug(data);

    let from = this.splitDateServiceService.split(data.from);
    let to = this.splitDateServiceService.split(data.to);
    let flag:any;
    if (data.options == "all" || data.options == "") {
     flag = ""; 
    }else {
      flag = "&flag="+data.options;
    
    }
    

    this.buybackParameterService.list("?_hash=1&_sortby=flag:1&_between=makerDate&_start=" + from + "&_end=" + to + flag).subscribe((response:any)=>{
      if (response == false || response["length"] == 0) {
        this.toastrService.error("Data Not Found");
        this.dataSearch = [];
        return;
      }
      this.dataSearch = response;
      this.toastrService.success("Load Data "+this.dataSearch.length);
    });
  }
  formSearch(){
    this.search = new FormGroup ({
      from: new FormControl (this.datePipe.transform(Date.now(),'MM/dd/yyyy')),
      to: new FormControl (this.datePipe.transform(Date.now(),'MM/dd/yyyy')),
      options: new FormControl ("", Validators.required)
    });
  }
  form(){
    this.formAdd = new FormGroup ({
      maker: new FormControl (this.nikUser._hash),
      maker_encoded: new FormControl ("base64"),
      makerDate: new FormControl (this.datePipe.transform(Date.now(),'yyyy-MM-dd')),
      approval: new FormControl (""),
      approvalDate: new FormControl (""),
      flag: new FormControl ("submitted"),
      minPrm: new FormControl ("", [Validators.required, Validators.pattern(/^[0-9]\d*$/)]),
    });
  }

  openModalAdd(){
    this.form();
    this.modalAdd = true;
  }
  confirmationPromotion(val: string){
    let isi = val.toLowerCase();
    console.debug(isi);
    switch (isi) {
      case "add":
        this.storeParameter();
        this.confirmation = false;
        break;
      case "approve":
        this.approveParameter();
        this.confirmation = false;
        break;
      case "reject":
        this.rejectParameter();
        this.confirmation = false;
        break
      default:
        this.toastrService.error("Action Can't Find");
        break;
    }
  }

  rejectParameter(){
    let data = {_id:0,flag:''}
    // update data new active flag
    data._id = this._id;
    data.flag = "reject";
    data["approval"] = this.nikUser._hash;
    data["approval_encoded"] = "base64";
    data["approvalDate"] = this.datePipe.transform(Date.now(),'yyyy-MM-dd');

    this.buybackParameterService.update(data).subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Reject data Failed");
        return;
      }

      this.toastrService.success("Reject data Success");
      this.dataList();
    })    
  }
  approveParameter(){
    let data = {_id: 0,flag: '' };
    let params = "?_hash=1&flag=active";
    let getData:any;

    this.buybackParameterService.get(params).subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Approve get data Failed");
        return;
      }
      getData = response;

      // update active flag
      data._id = getData._id;
      data.flag = "notactive"
      this.buybackParameterService.update(data).subscribe((response:any)=>{
        if (response == false) {
          this.toastrService.error("Approve update active data Failed");
          return;
        }

        // update data new active flag
        data._id = this._id;
        data.flag = "active";
        data["flag_validation"] = "unique:flag";
        data["approval"] = this.nikUser._hash;
        data["approval_encoded"] = "base64";
        data["approvalDate"] = this.datePipe.transform(Date.now(),'yyyy-MM-dd');

        this.buybackParameterService.update(data).subscribe((response:any)=>{
          if (response == false) {
            this.toastrService.error("Approve data Failed");
            this.approveParameter();
            return;
          }

          this.toastrService.success("Approve data Success");
          this.dataList();
        })        
      });
    });
    
  }

  storeParameter(){
    if (!this.formAdd.valid) {
      this.toastrService.error("Form Not Valid");
      return;
    }

    let data = this.formAdd.getRawValue();

    this.buybackParameterService.add(data).subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Store data Failed");
        return;
      }

      this.toastrService.success("Store Data Success");
      this.modalAdd = false;
      this.dataList();
    });
  }

  modalConfirmation(id,val){
    this._id = id;
    console.debug(id);
    switch (val) {
      case "add":
        this.confirmation = true;
        this.modalTitle = "Add";
        break;
      case "approve":
        this.confirmation = true;
        this.modalTitle = "Approve";
        break
      case "reject":
        this.confirmation = true;
        this.modalTitle = "Reject";
        break
      
      default:
        this.toastrService.error("Action Can't Find");
        break;
    }
  }

  ChangeContentArea(pageId : string)
  {
    if(pageId.startsWith("x")) return;
    ContentPage.ChangeContent(pageId, true)
  }

  static key = EMenuID.PARAMETER_BUYBACK
}
