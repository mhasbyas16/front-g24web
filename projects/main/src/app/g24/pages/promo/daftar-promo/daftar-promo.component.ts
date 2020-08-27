import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from "@angular/common";

// services
import { PromotionSettingService } from '../../../services/promotion/promotion-setting.service';


@Component({
  selector: 'app-daftar-promo',
  templateUrl: './daftar-promo.component.html',
  styleUrls: ['./daftar-promo.component.scss'],
  providers:[DatePipe],
})
@DContent(DaftarPromoComponent.key)
export class DaftarPromoComponent implements OnInit {
  placeholderDatagrid = "Silahkan Cari Produk Berdasarkan Parameter";
  loadingDg: boolean = false;
  search: FormGroup = null;

  promotion =[];
  
  constructor(
    private promotionSettingService : PromotionSettingService,
    private toastrService : ToastrService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.fromSearch();
    this.filterPromotion('id');
  }

  fromSearch(){
    this.search = new FormGroup({
      from: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy')),
      to: new FormControl(this.datePipe.transform(Date.now(),'MM/dd/yyyy')),
      // from: new FormControl(""),
      // to: new FormControl(""),
      text: new FormControl("")
    });
  }

  filterPromotion(val){
    // CLR Datagrid loading
    this.loadingDg = true;

    let data = this.search.getRawValue(); 
    let params = "_sortby=flag:1";

    // Session
    // const getUnit = this.sessionService.getUnit();
    // params = params+"&maker.unit.code="+getUnit["code"];

    if (data.from == "" && data.text == "") {
      this.toastrService.error("Please Complete Fill This From", "Transaction");
      this.loadingDg = false;
       return;
    }

    if (data.from != "") {
      if (data.to == "") {
        this.toastrService.error("Complete Range Date", "Transaction");
        this.loadingDg = false;
        return;
      }else if(data.to != ""){
        params = params+"&_between=makerDate&_start="+data.from+"&_end="+data.to;
      }
    }

    if (data.text != "") {
      // if (val == 'id') {
      //   this.transactionService.list("?"+params+"&idTransaction_regex=1&idTransaction="+data.text).subscribe((response:any)=>{
      //     if (response["length"] != 0) {
      //       params = params+"&idTransaction_regex=1&idTransaction="+data.text;
      //       this.getTransaction(params);
      //       return
      //     }else{
      //       this.filterTransaction('name');
      //       return
      //     }
      //   })
      // }else if (val == 'name'){
      //   this.transactionService.list("?"+params+"&client.name_regex=1&client.name="+data.text).subscribe((response:any)=>{
      //     if (response["length"] != 0) {
      //       params = params+"&client.name_regex=1&client.name="+data.text;
      //       this.getTransaction(params);
      //       return
      //     }else{
      //       this.filterTransaction('cif');
      //       return
      //     }
      //   })
      // }else if (val == 'cif'){
      //   this.transactionService.list("?"+params+"&client.cif_regex=1&client.cif="+data.text).subscribe((response:any)=>{
      //     if (response["length"] != 0) {
      //       params = params+"&client.cif_regex=1&client.cif="+data.text;
      //       this.getTransaction(params);
      //       return
      //     }else{
      //       this.toastrService.error("Data Not Found", "Transaction");
      //       this.loadingDg = false;
      //       this.transactions = [];
      //       return
      //     }
      //   })
      // }
    }else{
      this.getPromotion(params);
      return
    }

  }

  getPromotion(params){       
    this.promotionSettingService.list("?"+params).subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Data Not Found", "Transaction");
        this.loadingDg = false;
        this.promotion = [];
        return;
      }  
      if (response["length"] == 0) {
        this.toastrService.error("Data Not Found", "Transaction");
        this.loadingDg = false;
        this.promotion = [];
        return;
      }
      
      this.loadingDg = false;
      this.promotion = response;
      this.toastrService.success("Load "+this.promotion.length+" Data", "Promotion");
    })
  }

  static key = EMenuID.DAFTAR_PROMO;
}
