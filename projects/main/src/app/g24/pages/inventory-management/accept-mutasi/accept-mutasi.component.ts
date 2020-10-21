import { Component, OnInit, ViewChild } from '@angular/core';
import { empty } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { MutasiService } from '../../../services/stock/mutasi.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { UnitService } from '../../../services/system/unit.service';
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { ServerDateTimeService } from '../../../services/system/server-date-time.service';
import { FlagProduct } from '../../../lib/enum/flag-product';
import { ProductService } from '../../../services/product/product.service';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-accept-mutasi',
  templateUrl: './accept-mutasi.component.html',
  styleUrls: ['./accept-mutasi.component.scss']
})

@DContent(AcceptMutasiComponent.key)
export class AcceptMutasiComponent implements OnInit {
static key = EMenuID.TERIMA_MUTASI;

	
  productku : any[] = [];
  unitsal : any[] = [];
  unituju : any[] = [];
  listdt : any[] = [];
  listdt2 : any[] = [];
  listdt3 : any[] = [];
  listflag : any[] = [];
  items : any[] = [];
  itemsview : any = [];
  itemsaccept : any[] = [];
  data_view : any[] = [];
  data : any[] = [];
  IdData : any[] = [];

  input : any = {};
  add : any = {};
  DataFlowModal : any = {};

  modal : Boolean = false;
  modalaccept : Boolean = false;
  modalview : Boolean = false;

  date_time : String;
  timezone : String;
  date_now : String;
  time : String;
	
  Object = Object;

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

  doSearch(){
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
    params += "unit_tujuan.code="+this.sessionservice.getUser().unit.code+"&";
    this.mutasiservice.list(params).subscribe(output=>{
      if(output==false){
        if(this.mutasiservice.message()!=""){
          this.spinner.Close();
          this.toastr.info("Data tidak ditemukan","Informasi");
          this.input = {};
          this.listdt = [];
          return;
        }
      }
      this.spinner.Close();
      this.toastr.success("Data ditemukan "+output.length,"Sukses");
      this.listflag = output;
		this.listdt = this.listflag;
//		for(let y = 0; y < this.listflag.length; y++){
//		if(this.listflag[y].flag=="approved"){
//          this.listdt = this.listflag.splice(y,1);
//          console.log(this.listdt);
//		}
//		}
    })


  }

  reset(){
    this.add = {};
    this.input = {};
    this.listdt = [];
    this.listflag = [];
    this.listdt2 = [];
    this.listdt3 = [];
    this.items = [];
  }

  onAccept(){
    if(!this.data_view){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }else if(Object.keys(this.data_view).length==0){
    this.toastr.warning("Data belum dipilih","Peringatan");
    return;
  }
	this.add = {};
	this.listflag = [];
    this.listflag.push(this.data_view);
    for(let i = 0; i < this.listflag.length; i++){
      this.DataFlowModal = this.listflag[i];
	  this.items = this.listflag[i].items;
      this.modalaccept = true;
    }
	  
	  
  }

  searchData(){
    let params = "?";
    for(let key in this.add){
      if(this.add[key]==null||this.add[key]=="null"||this.add[key]=="")continue;
      switch(key){

        case 'id':
          params += "_id="+this.add[key]._id+"&";
        break;
        
        case 'unit_asal':
          params += "unit_asal.code="+this.add[key].code+"&";
        break;

        case 'unit_tujuan':
          params += "unit_tujuan.code="+this.add[key]+"&";
        break;

        case 'jenis':
          params += "items.jenis-product.code="+this.add[key]+"&";
        break;

        default:
          params += key+"="+this.add[key]+"&";
        break;

      }
    }
    
    this.mutasiservice.list(params).subscribe(data=>{
      if(data == false){
        if(this.mutasiservice.message()!=""){
          this.modal = true;
          return;
        }
      }
      this.listdt2 = data;
      for(let i = 0; i < this.listdt2.length; i++){
        if(this.listdt2[i].flag=="approved"){
          this.items = this.listdt2[i].items;
          console.log(this.items);
        }
      }
    })

  }

  onView(){
    if(!this.data_view){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }else if(Object.keys(this.data_view).length==0){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }
    this.listflag = [];
    this.listflag.push(this.data_view);
    for(let i = 0; i < this.listflag.length; i++){
      this.itemsview = this.listflag[i].items;
	  this.DataFlowModal = this.listflag[i];
      this.modalview = true;
    }
  }

  DisplayName(key:String){
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

  accept(){
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();
	  for(let i=0; i < this.listflag.length; i++){
      if(this.listflag[i].flag=="approved"){
        
        let data = {
          _id : this.listflag[i]._id,
          flag : 'accept',
          update_by : this.sessionservice.getUser().username,
          update_date : this.date_now,
          update_time : this.time,
      tgl_terima : this.date_now
        };
        
        console.log(data);

        for(let i = 0; i < this.items.length; i++){
          console.log("id items",this.items[i]._id);
        
          let updateproduct = {
            _id : this.items[i]._id,
            unit : this.sessionservice.getUser().unit,
            flag : FlagProduct.STOCK.code
          }

          console.log(updateproduct);
        
            let updproduct = DataTypeUtil.Encode(updateproduct)
            let r = DataTypeUtil.Encode(data);
            this.mutasiservice.update(r).subscribe(output=>{
              if(output==false){
                if(this.mutasiservice.message()!=""){
                  this.spinner.Close();
                  return;
                }
              }

              this.productservice.update(updproduct).subscribe(data=>{
                if(data==false){
                  if(this.productservice.message()!=""){
                    this.spinner.Close();
                    return;
                  }
                }
              })
              this.toastr.success("Data berhasil diterima","Sukses");
              this.modalaccept = false;
            })
        }


    //   let data = {
    //     _id : this.listflag[i]._id,
    //     flag : 'accept',
    //     update_by : this.sessionservice.getUser().username,
    //     update_date : this.date_now,
    //     update_time : this.time,
		// tgl_terima : this.date_now
    //   };
  
    //   console.log(data);
  
  
    //   let r = DataTypeUtil.Encode(data);
    //   this.mutasiservice.update(r).subscribe(output=>{
    //     if(output!=false){
    //       console.log(output);
		//   this.modalaccept = false;
    //     }
    //   })
    }else{
          this.spinner.Close();
          this.toastr.warning("Data yang bisa diterima adalah tipe flag approved","Peringatan");
    }
   }


  }
}
