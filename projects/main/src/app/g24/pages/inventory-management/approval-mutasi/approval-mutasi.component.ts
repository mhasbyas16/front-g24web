import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { MutasiService } from '../../../services/stock/mutasi.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { UnitService } from '../../../services/system/unit.service';
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { ServerDateTimeService } from '../../../services/system/server-date-time.service';
import { ProductService } from '../../../services/product/product.service';
import { FlagProduct } from '../../../lib/enum/flag-product';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';
import { StringHelper } from '../../../lib/helper/string-helper';
import { FlagMutasi } from '../../../lib/enum/flag-mutasi';


@Component({
  selector: 'app-approval-mutasi',
  templateUrl: './approval-mutasi.component.html',
  styleUrls: ['./approval-mutasi.component.scss']
})

@DContent(ApprovalMutasiComponent.key)
export class ApprovalMutasiComponent implements OnInit {
static key = EMenuID.APP_MUTASI;


unitsal : any[] = [];
unituju : any[] = [];
productku : any[] = [];
listdt : any[] = [];        //DATA MUTASI
listdt2 : any[] = [];
data_view : any = {};

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
view_mutasi : any[] = [];
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
    private toastr : ToastrService,
    private productservice : ProductService
  ) { }

  @ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;


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

  async doSearch(){
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();
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

        case 'approve_date':
          params += 'approve_date='+StringHelper.StandardFormatDate('/',this.input[key],'MM/dd/yyyy')+"&";
          break;

        case 'tgl_terima':
          params += 'tgl_terima='+StringHelper.StandardFormatDate('/',this.input[key],'MM/dd/yyyy')+"&";
          break;

        case 'created_date':
          params += 'created_date='+StringHelper.StandardFormatDate('/',this.input[key],'MM/dd/yyyy')+"&";
          break;

        default:
          params += key+"="+this.input[key]+"&";
          break;
      }
      console.log(params);
    }

    let data = await this.mutasiservice.list(params).toPromise();
    if(data==false){
      this.toastr.info("Data tidak ditemukan","Informasi");
      this.spinner.Close();
      this.input = {};
      this.listdt = [];
      return;
    }

      this.spinner.Close();
      this.toastr.success("Data ditemukan "+data.length,"Sukses");
      this.view_mutasi = data;


  }

  reset(){
    this.add = {};
    this.input = {};
    this.listdt = [];
    this.view_mutasi = [];
    this.listdt2 = [];
    this.items = [];
  }

  onProove(){
	  if(!this.data_view){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }else  if(Object.keys(this.data_view).length==0){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }	  
    this.items = [];

    for(let i = 0; i < this.data_view.items.length; i++){
      console.log(this.data_view.items[i]);
    }


    //------
	
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
    if(!this.data_view){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }else if(Object.keys(this.data_view).length==0){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }
      this.view_mutasi = [];
      this.view_mutasi.push(this.data_view);
    

	 	for(let i = 0; i < this.view_mutasi.length; i++){
	  		this.DataFlowModalView = this.view_mutasi[i];
      		this.items = this.view_mutasi[i].items;
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

      case 'branch':
        name = "Branch";
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


      case 'sku':
        name = "SKU";
        break;
			
	  case 'hppberlian':
		name = "Hpp Berlian";
		break;

    case 'hpp_inisiasi':
    name = "Hpp Inisiasi";
    break;

    case 'hpp':
    name = "Hpp";
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

    case 'weight':
    name = "Weight";
    break;

    case 'unit':
    name = "Unit";
    break;

    case 'tipe_stock':
    name = "Tipe Stock";
    break;

    case 'ongkos_pieces':
    name = "Ongkos Pieces";
    break;

    case 'count':
    name = "Count";
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

      case "__version":
        return false;
        break;

      case "id":
        return false;
      break;

      case "booking_id":
        return false;
       break;

      case "booking_expiry_time":
        return false;
       break;

       case "no_kontrak":
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


  async approve(){
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();

    console.log(this.data_view.flag);
    if(this.data_view.flag=="submit"){

      let data = {
        _id : this.data_view._id,
        flag : FlagMutasi.APPROVE.code,
        approve_by : this.sessionservice.getUser().username,
        approve_date : this.date_now,
        update_by : this.sessionservice.getUser().username,
        update_date : this.date_now,
        update_time : this.time
      };

      let r = DataTypeUtil.Encode(data);

      let dataUpdateMutasi = await this.mutasiservice.update(r).toPromise();
      if(dataUpdateMutasi==false){
        let msg = this.mutasiservice.message();
        this.toastr.error("Data gagal di approve "+msg, "Error");
        this.modalshow = false;
        this.spinner.Close();
        return;
      }

      this.toastr.success("Data berhasil diapproved","Sukses");
      this.spinner.Close();
      this.modalshow = false;


    }else if(this.data_view.flag=="approve" || this.data_view.flag=="accept" || this.data_view.flag=="null" || this.data_view.flag=="ditolak"){
        this.toastr.warning("Data Tersebut sudah disetujui / ditolak / diterima","Peringatan");
        this.spinner.Close();
    }
    
    // for(let i=0; i < this.listdt2.length; i++){
    //   if(this.listdt2[i].flag=="submit"){
    //   let data = {
    //     _id : this.listdt2[i]._id,
    //     flag : 'approved',
    //     approve_by : this.sessionservice.getUser().username,
    //     approve_date : this.date_now,
    //     update_by : this.sessionservice.getUser().username,
    //     update_date : this.date_now,
    //     update_time : this.time
    //   };

      // this.doJournalMutasi(this.listdt2[i]._id);
  
      // console.log(data);

      // let r = DataTypeUtil.Encode(data);

      // this.mutasiservice.update(r).subscribe(output=>{
      //   if(output!=false){
      //    console.log(output);
      //    this.modalshow = false;
      //    this.listdt = [];
      //    this.spinner.Close();
      //    this.toastr.success("Data berhasil di approve","Sukses");
      //   }
      // })

  //   }else if(this.listdt2[i].flag=="approved" || this.listdt2[i].flag=="accept" || this.listdt2[i].flag=="null"){
  //   this.toastr.warning("Data Tersebut sudah disetujui / ditolak / diterima","Peringatan");
  //   this.spinner.Close();
	// }
  //   }

    
  }

  async refuse(){
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();
    if(this.data_view.flag=="submit"){

      let dataUpdateMutasi = {
        _id : this.data_view._id,
        flag : "ditolak",
        approve_by : "null",
        approve_date : "null",
        update_by : this.sessionservice.getUser().username,
        update_date : this.date_now,
        update_time : this.time
      };

      //UPDATE FLAG MUTASI MENJADI DITOLAK DAN UPDATE DATA MUTASI SESUAI DENGAN VARIABEL dataUpdateMutasi 
      let encode_mutasi = DataTypeUtil.Encode(dataUpdateMutasi);
      let datamutasi = await this.mutasiservice.update(encode_mutasi).toPromise();
      if(datamutasi==false){
        this.spinner.Close();
        let msg = this.mutasiservice.message();
        this.modalshow = false;
        this.toastr.error("Gagal menolak mutasi "+msg, "Error");
        return;
      }

      this.toastr.success("Data mutasi berhasil ditolak","Sukses");

      //UPDATE PRODUK KETIKA DITOLAK RUBAH FLAG MENJADI STOCK KEMBALI
      for(let i = 0; i < this.items.length; i++){

        console.log(this.items[i]._id);
        let updateFlagProduct = {
          _id : this.items[i]._id,
          flag : FlagProduct.STOCK.code
        }

        let encode_product = DataTypeUtil.Encode(updateFlagProduct);
        let dataproduct = await this.productservice.update(encode_product).toPromise();
        if(dataproduct==false){
          this.spinner.Close();
          let msg = this.productservice.message();
          this.toastr.error("Data flag product gagal diupdate ke stock "+msg, "Error");
          return;
        }
      }
      this.spinner.Close();
      this.toastr.success("Data flag product berhasil di update ke stock","Sukses");
      this.modalshow = false;
      this.listdt = [];

    }else if(this.data_view.flag=="null" || this.data_view.flag=="accept" || this.data_view.flag=="approve" || this.data_view.flag=="ditolak"){
      this.toastr.warning("Data tersebut sudah ditolak / disetujui / diterima","Peringatan");
      this.spinner.Close();
    }

  //   for(let i=0; i < this.listdt2.length; i++){
  //     if(this.listdt2[i].flag=="submit"){
  //     let data = {
  //       _id : this.listdt2[i]._id,
  //       flag : "ditolak",
  //       approve_by : "null",
  //       approve_date : "null",
  //       update_by : this.sessionservice.getUser().username,
  //       update_date : this.date_now,
  //       update_time : this.time
  //     };
  
  //     console.log(data);
      

  //     for(let i = 0; i < this.items.length; i++){
  //       console.log(this.items[i]._id);
        
  //     let updateproduct = {
  //       _id : this.items[i]._id,
  //       flag : FlagProduct.STOCK.code
  //     }

  //       let encode = DataTypeUtil.Encode(updateproduct);
  //       let ecnd = DataTypeUtil.Encode(data);

  //       this.productservice.update(encode).subscribe(data=>{
  //         if(data==false){
  //           if(this.productservice.message()!=""){
  //             this.spinner.Close();
  //             return;
  //           }
  //         }
  //         this.mutasiservice.update(ecnd).subscribe(data=>{
  //           if(data==false){
  //             if(this.mutasiservice.message()!=""){
  //               this.spinner.Close();
  //               return;
  //             }
  //           }
  //         })
  //         this.spinner.Close();
  //         this.toastr.success("Data berhasil di tolak","Sukses");
  //         this.modalshow = false;
  //       })
      
  //     }
      

      
  //   }else if(this.listdt2[i].flag=="null" || this.listdt2[i].flag=="accept" || this.listdt2[i].flag=="approved"){
  //   this.toastr.warning("Data tersebut sudah ditolak / disetujui / diterima","Peringatan");
  //   this.spinner.Close();
	// }
  //   }

  }



}
