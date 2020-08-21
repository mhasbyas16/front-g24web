import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { MutasiService } from '../../../services/stock/mutasi.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { UnitService } from '../../../services/system/unit.service';
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { ServerDateTimeService } from '../../../services/system/server-date-time.service';

@Component({
  selector: 'app-approval-mutasi',
  templateUrl: './approval-mutasi.component.html',
  styleUrls: ['./approval-mutasi.component.css']
})

@DContent(ApprovalMutasiComponent.key)
export class ApprovalMutasiComponent implements OnInit {
static key = EMenuID.APP_MUTASI;


unitsal : any[] = [];
unituju : any[] = [];
productku : any[] = [];
listdt : any[] = [];
listdt2 : any[] = [];
data_view : any[] = [];

input : any = {};
add : any = {};
idmutasi : any[] = [];
items : any[] = [];
itemsadd : any[] = [];
DataId : any[] = [];
DataFlowModal : any = {};
DataFlowModalView : any = {};

unittj : string;
modalshow : boolean = false;
modalview : boolean = false;
Object = Object;
listflag : any[] = [];
listdata : any[] = [];


itemsdata : any[] = [];
modal : boolean = false;

//TIME
date_time : String;
timezone : String;
date_now : String;
time : String;

  constructor(
    private UnitService : UnitService,
    private mutasiservice : MutasiService,
    private sessionservice : SessionService,
    private productjenis : ProductJenisService,
	  private datetimeservice : ServerDateTimeService,
    private toastr : ToastrService
  ) { }


  ngOnInit(): void {
//    let waktu = (new Date()).getTimezoneOffset() * 60000;
//  //offset in milliseconds
//    let lokal = (new Date(Date.now() - waktu)).toISOString().slice(0, -1);
//    console.log(lokal);

    
    let params = "?";
	this.datetimeservice.task(params).subscribe(output=>{
	  	if(output!=false){
	  		this.timezone = output;
	  		let tgl = this.timezone.split("T");
      		this.date_now = tgl[0];
      		this.time = tgl[1].split("Z")[0];
	  		console.log(this.time);
  		}
  	})
	
    this.UnitService.list(params).subscribe(output=>{
      if(output!=false){
        this.unitsal = output;
      }
    })

    this.productjenis.list(params).subscribe(output=>{
      if(output!=false){
        this.productku = output;
      }
    })

    

    this.UnitService.list(params).subscribe(output=>{
      if(output!=false){
        this.unitsal = output;
        this.unituju = this.unitsal.slice();
      }
      let userUnitCode = this.sessionservice.getUser().unit.code;
      for (let index = 0; index < this.unituju.length; index++) {
        const element = this.unituju[index];
        if(element.code == userUnitCode)
          this.unituju.splice(index, 1);
        
      }
  });


  }

  doSearch(){
    this.listdt = [];
    let params = "?"; 
    for(let key in this.input){
      if(this.input[key]==""||this.input[key]=="null"||this.input[key]==null)continue;
      switch(key){
        case 'unit_asal':
          params += 'unit_asal.code='+this.input[key].code+"&";
          break;

        case 'unit_tujuan':
          params += 'unit_tujuan.code='+this.input[key].code+"&";
          break;

        case 'tgl_approve':
          params += 'approve_date='+this.input[key]+"&";
          break;

        case 'tgl_terima':
          params += 'tgl_terima='+this.input[key]+"&";
          break;

        case 'tgl_kirim':
          params += 'created_date='+this.input[key]+"&";
          break;

        default:
          params += key+"="+this.input[key]+"&";
          break;
      }
      console.log(params);
    }
    this.mutasiservice.list(params).subscribe(output=>{
      if(output==false){
        if(this.mutasiservice.message()!=""){
          // this.modal = true;
          this.toastr.info("Data tidak ditemukan","Informasi");
          this.input = {};
          this.listdt = [];
          return;
        }
      }
      this.listflag = output;
	  this.listdt = this.listflag;
//      for(let i = 0; i < this.listflag.length; i++){
//		  if(this.listflag[i].flag=="submit"){
//          this.listdt = this.listflag.splice(i,1);
//          console.log(this.listdt);
//      }
//	  }
	})


  }

  reset(){
    this.add = {};
    this.input = {};
    this.listdt = [];
    this.listflag = [];
    this.listdt2 = [];
    this.items = [];
  }

  onProove(){
	  
//	this.add = {};
//    let params ="?";
//    this.modalshow=true;
//    this.productjenis.list(params).subscribe(output=>{
//      if(output!=false){
//        this.productku = output;
//      }
//    })
//
//    this.mutasiservice.list(params).subscribe(output=>{
//      if(output!=false){
//        this.idmutasi = output;
//        this.DataId = this.idmutasi.slice();
//        console.log(this.idmutasi);
//        for(let p = 0; p < this.DataId.length; p++){
//          const idData = this.DataId[p];
//          if(idData.flag !== "submit"){
//            this.DataId.splice(p,1);
//            console.log(this.DataId);
//          }
//        }
//      }
//    })
	  
    this.listdt2 = [];
    this.items = [];
	
    this.listdt2 = [];
    this.listdt2.push(this.data_view);
    for(let i = 0; i < this.listdt2.length; i++){
      this.DataFlowModal = this.listdt2[i];
		this.items = this.listdt2[i].items;
		console.log(this.DataFlowModal);
      this.modalshow=true;
		
    }
  }

  onView(){
      this.listflag = [];
      this.listflag.push(this.data_view);
    
	 	for(let i = 0; i < this.listflag.length; i++){
	  		this.DataFlowModalView = this.listflag[i];
      		this.items = this.listflag[i].items;
      		this.modalview=true;
    	}
  }

  GetDisplayName(key : string) : string
  {
    let name = "No Name Found";

    key = key.toLowerCase();

    switch(key)
    {
      case 'product-category':
        name = "Jenis Produk";
        break;

      case 'vendor':
        name = "Vendor";
        break;
      
      case 'product-series':
        name = "Series";
        break;
      
      case 'product-gold-color':
        name = "Warna Emas";
        break;

      case 'product-diamond-color':
        name = "Warna Berlian";
        break;

      case 'product-purity':
        name = "Kadar";
        break;

      case 'product-jenis':
        name = "Jenis";
        break;

      case 'product-denom':
        name = "Denom";
        break;

      case 'product-clarity':
        name = "Clarity";
        break;

      case 'berat':
        name = "Berat";
        break;

      case 'carat':
        name = "Carat";
        break;

      case 'baku-tukar':
        name = "Baku Tukar";
        break;

       case 'flag':
         name = "Flag";
         break;

      case 'code':
        name = "Kode";
        break;

      case 'product-cut':
        name = "Produk Cut";
        break;
			
	  case 'hppberlian':
		name = "Hpp Berlian";
		break;
			
	  case 'ongkospembuatan':
		name = "Ongkos Pembuatan";
		break;
			
	  case 'marginberlian':
		name = "Margin Berlian";
		break;
			
	  case 'hppbatu':
		name = "Hpp Batu";
		break;
			
	  case 'marginbatu':
		name = "Margin Batu";
		break;

      default:
        name += " - " + key;

    }
    return name;
  }

  GetDisplayValue(object : any) : string
  {
    // console.log(typeof object)
    if(object == null) return "null";
    if(typeof object == 'string' || typeof object == 'number' || typeof object == 'undefined') return object.toString();

    return object.name;
  }

  except(key : string){
    switch(key){
      case "_id":
        return false;
      break;

      case "id":
        return false;
      break;

      case "unit":
        return false;
	  break;
			
	 case "telolet":
		return false;
	  break;

      case "status":
        return false;
      break;

      default:
        return true;
    }
  }

  approve(){
    for(let i=0; i < this.listdt2.length; i++){
      if(this.listdt2[i].flag=="submit"){
      let data = {
        _id : this.listdt2[i]._id,
        flag : 'approved',
        approve_by : this.sessionservice.getUser().username,
        approve_date : this.date_now,
        update_by : this.sessionservice.getUser().username,
        update_date : this.date_now,
        update_time : this.time
      };
  
      console.log(data);
  
  
      let r = DataTypeUtil.Encode(data);
      this.mutasiservice.update(r).subscribe(output=>{
        if(output!=false){
         console.log(output);
		this.modalshow = false;
        }
      })
    }else if(this.listdt2[i].flag=="approved" || this.listdt2[i].flag=="accept"){
		this.toastr.warning("Data Tersebut sudah disetujui /diterima","Peringatan");
	}
    }

    
  }

  refuse(){
    for(let i=0; i < this.listdt2.length; i++){
      if(this.listdt2[i].flag=="submit"){
      let data = {
        _id : this.listdt2[i]._id,
        flag : "null",
        approve_by : "null",
        approve_date : "null",
        update_by : this.sessionservice.getUser().username,
        update_date : this.date_now,
        update_time : this.time
      };
  
      console.log(data);
  
  
      let r = DataTypeUtil.Encode(data);
      this.mutasiservice.update(r).subscribe(output=>{
        if(output!=false){
          console.log(output);
		  this.modalshow = false;
        }
      })
    }else if(this.listdt2[i].flag=="null" || this.listdt2[i].flag=="accept"){
		this.toastr.warning("Data tersebut sudah diTolak / diterima","Peringatan");
	}
    }

  }



}
