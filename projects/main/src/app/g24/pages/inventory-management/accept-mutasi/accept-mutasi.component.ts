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
import { StringHelper } from '../../../lib/helper/string-helper';
import { FlagMutasi } from '../../../lib/enum/flag-mutasi';
import { JurnalMutasiService } from '../../../services/keuangan/jurnal/stock/jurnal-mutasi.service';

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
  listflag : any[] = [];

  data_mutasi : any[] = [];

  items : any[] = [];
  data_view : any = {};
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
    private jurnalMutasiService : JurnalMutasiService,
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
    let params = "?"; 
    for(let key in this.input){
      if(this.input[key]==""||this.input[key]=="null"||this.input[key]==null)continue;
      switch(key){
        case 'unit_asal':
          params += 'unit_asal.code='+this.input[key].code+"&";
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
    params += "unit_tujuan.code="+this.sessionservice.getUser().unit.code+"&";
    let data = await this.mutasiservice.list(params).toPromise();
    if(data==false){
      this.spinner.Close();
      this.toastr.info("Data tidak ditemukan","Informasi");
      this.input = {};
      this.data_mutasi = [];
      return;
    }
    this.spinner.Close();
    this.toastr.success("Data ditemukan "+data.length,"Sukses");
    this.data_mutasi = data;

  }

  reset(){
    this.add = {};
    this.input = {};
    this.data_mutasi = [];
    this.listflag = [];
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

  this.DataFlowModal = this.data_view;
  this.items = this.data_view.items;
  this.modalaccept = true;
	  
	  
  }


  onView(){
    if(!this.data_view){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }else if(Object.keys(this.data_view).length==0){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }

    this.DataFlowModal = this.data_view;
    this.items = this.data_view.items;
    this.modalview = true;
    
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

    case 'gram_tukar':
    name = "Gram Tukar";
    break;

    case 'ongkos':
    name = "Ongkos";
    break;

    case 'price':
    name = "Price";
    break;

    case 'nomor_nota':
    name = "Nomer Nota";
    break;

    case 'no_po':
    name = "No PO";
    break;

    case 'baku_tukar':
    name = "Baku Tukar";
    break;

    case 'location':
    name = "Lokasi";
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
         
      case "no_index_products":
          return false;
          break;

      case "no_item_po":
          return false;
          break;

      case "isterima":
          return false;
          break;

      case "no_urut":
          return false;
          break;
			
      case "status":
        return false;
        break;

      default:
        return true;
    }
  }

  doAccounting(id : string) {
    this.jurnalMutasiService.terima(id).subscribe(result => {
      if(result != false)
      {
        this.toastr.success("Jurnal Terima berhasil.");
        this.modalaccept = false;
        this.spinner.Close();
      } 
      else
      {
        let msg : string = "";
        this.toastr.error("Harap hubungi IT Helpdesk/Support. Error: " + msg, "Jurnal Terima gagal!", {disableTimeOut : true, tapToDismiss : true});
        this.modalaccept = false;
        this.spinner.Close();
      }

    }, err => {
      this.toastr.error("Harap hubungi IT Helpdesk/Support. Error: " + err.message, "Jurnal Terima gagal!", {disableTimeOut : true, tapToDismiss : true});
      this.modalaccept = false;
      this.spinner.Close();
    })
  }


  async accept(){
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();
    console.log(this.data_view._id);

    //CEK TIPE FLAG MUTASI & UPDATE MUTASI
    if(this.data_view.flag=="approved"){

      let data = {
        _id : this.data_view._id,
        update_by : this.sessionservice.getUser().username,
        update_date : this.date_now,
        update_time : this.time,
        tgl_terima : this.date_now,
        flag : FlagMutasi.ACCEPT.code
      };

      
      let encodeMutasi = DataTypeUtil.Encode(data);

      let UpdateMutasi = await this.mutasiservice.update(encodeMutasi).toPromise();
      if(UpdateMutasi==false){
      this.spinner.Close();
      return;
      }

      //LOOP ITEMS MUTASI & UPDATE PRODUK
      for(let i = 0; i < this.items.length; i++){
        console.log("id items",this.items[i]._id);
      
        let product = {
          _id : this.items[i]._id,
          unit : this.sessionservice.getUser().unit,
          flag : FlagProduct.STOCK.code
        }
      
          let encodeProduct = DataTypeUtil.Encode(product);

          //MICROSERVICES PROBLEM PARSE NUMBER
          // this.mutasiservice.terima(id).subscribe(output=>{
          //   if(output==false){
          //     if(this.mutasiservice.message()!=""){
          //       this.spinner.Close();
          //       return;
          //     }
          //   }

           let UpdateProduct = await this.productservice.update(encodeProduct).toPromise();
           if(UpdateProduct==false){
             let msg = this.productservice.message();
             this.toastr.error("Gagal update product "+msg,"Error");
             this.spinner.Close();
             return;
           }
      }

      this.toastr.success("Data berhasil diterima","Sukses");
      this.modalaccept = false;
      let id : string = UpdateMutasi._id;
      this.doAccounting(id);

      this.spinner.Close();



    }else{
          this.spinner.Close();
          this.toastr.warning("Data yang bisa diterima adalah tipe flag approved","Peringatan");
    }


    //LOOP ITEMS MUTASI & UPDATE PRODUCT
	  for(let i=0; i < this.data_view.length; i++){
      if(this.data_view[i].flag=="approved"){
        

        


    }else{
          this.spinner.Close();
          this.toastr.warning("Data yang bisa diterima adalah tipe flag approved","Peringatan");
    }
   }


  }
}
