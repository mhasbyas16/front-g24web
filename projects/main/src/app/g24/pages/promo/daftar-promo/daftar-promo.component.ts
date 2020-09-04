import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { DContent } from '../../../decorators/content/pages';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from "@angular/common";

// services
import { PromotionSettingService } from '../../../services/promotion/promotion-setting.service';
import { TanggalService } from '../../../lib/helper/tanggal.service';


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
  actionModal: boolean = false;
  confirmation:boolean = false;

  isiPromosi : FormGroup = null;
  search: FormGroup = null;

  promotion =[];
  data:any;

  modalTitle:any;
  view:any;

  //tanggal
  tglMaker:any;
  tglStart:any;
  tglEnd:any;
  
  constructor(
    private promotionSettingService : PromotionSettingService,
    private toastrService : ToastrService,
    private datePipe: DatePipe,
    private tanggalService:TanggalService
  ) { }

  ngOnInit(): void {
    this.fromSearch();
    this.filterPromotion('name');
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
    let params = "_hash=1&_sortby=flag:1";

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
      if (val == 'name') {
        this.promotionSettingService.list("?"+params+"&name_regex=1&name="+data.text).subscribe((response:any)=>{
          if (response["length"] != 0) {
            params = params+"&name_regex=1&name="+data.text;
            this.getPromotion(params);
            return
          }else{
            this.filterPromotion('maker');
            return
          }
        })
      }else if (val == 'maker'){
        this.promotionSettingService.list("?"+params+"&maker.name_regex=1&maker.name="+data.text).subscribe((response:any)=>{
          if (response["length"] != 0) {
            params = params+"&maker.name_regex=1&maker.name="+data.text;
            this.getPromotion(params);
            return
          }else{
            this.toastrService.error("Data Not Found", "Transaction");
            this.loadingDg = false;
            this.promotion = [];
            return
          }
        })
      }
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

  // Modal
  actionView(hash, act){
    let tgl :any;
    let tglSplit :any;
    let bulan :any;
    let hari:any;
    let tahun:any;
    let bulanTerbilang:any;

    this.data = JSON.parse(atob(hash));
    // tanggal maker
    tgl =this.data.makerDate;
    tglSplit = tgl.split("/");
    bulan = Number(tglSplit["0"]);
    hari = tglSplit["1"];
    tahun = tglSplit["2"];
    bulanTerbilang = this.tanggalService.bulanGenerate(bulan);
    this.tglMaker = hari+' '+bulanTerbilang+' '+tahun;

    // tanggal start date
    tgl =this.data.startDate;
    tglSplit = tgl.split("/");
    bulan = Number(tglSplit["0"]);
    hari = tglSplit["1"];
    tahun = tglSplit["2"];
    bulanTerbilang = this.tanggalService.bulanGenerate(bulan);
    this.tglStart = hari+' '+bulanTerbilang+' '+tahun;

    // tanggal start date
    tgl =this.data.endDate;
    tglSplit = tgl.split("/");
    bulan = Number(tglSplit["0"]);
    hari = tglSplit["1"];
    tahun = tglSplit["2"];
    bulanTerbilang = this.tanggalService.bulanGenerate(bulan);
    this.tglEnd = hari+' '+bulanTerbilang+' '+tahun;
    

    console.debug(this.data,"action")
    this.view = act;
    this.actionModal = true;
  }

  ///
  modalConfirmation(id:any, flag:any, title:any){
    this.modalTitle = title;
    this.isiPromosi = new FormGroup({
      _id: new FormControl ("", Validators.required),
      flag: new FormControl ("", Validators.required),
    });

    this.isiPromosi.patchValue({_id:id,flag:flag});

    this.confirmation = true;
  }

  confirmationPromotion(){

    if (!this.isiPromosi.valid) {
      this.toastrService.error("Gagal Mengupdate Promosi");
      return;
    }

    let data = this.isiPromosi.getRawValue();

    this.promotionSettingService.update(data).subscribe((response:any)=>{
      if (response == false) {
        this.toastrService.error("Gagal Mengupdate Promosi");
        return;
      }
      this.actionModal = false;
      this.confirmation = false;
      this.filterPromotion('name');
      this.toastrService.success("Sukses Update");
    });
  }

  static key = EMenuID.DAFTAR_PROMO;
}
