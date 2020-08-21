import { Component, OnInit, Output, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { NgForm, Form, FormGroup } from '@angular/forms';
import { Key } from 'protractor';
import { environment } from 'src/environments/environment';
import { Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';


//ALERT TOASTR
import { ToastrService } from 'ngx-toastr';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { ModalErrorType } from '../../../lib/enums/modal-error-type.enum';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { MutasiService } from '../../../services/stock/mutasi.service';
import { ProductService } from '../../../services/product/product.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { VendorService } from '../../../services/vendor.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { FlagMutasi } from '../../../lib/enum/flag-mutasi';
import { UnitService } from '../../../services/system/unit.service';
import { ProductGoldColorService } from '../../../services/product/product-gold-color.service';
import { ProductPurityService } from '../../../services/product/product-purity.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { ProductClarityService } from '../../../services/product/product-clarity.service';
import { ServerDateTimeService } from '../../../services/system/server-date-time.service';
import { ProductSeriesService } from '../../../services/product/product-series.service';

@Component({
  selector: 'app-mutasi',
  templateUrl: './mutasi.component.html',
  styleUrls: ['./mutasi.component.css']
})

@DContent(MutasiComponent.key)
export class MutasiComponent implements OnInit {
static key = EMenuID.MUTASI;


@ViewChild('kategori') kategori : ElementRef;

@ViewChild('Perhiasan', {static:false}) perhiasanInput : TemplateRef<any>;
  @ViewChild('Mulia', {static:false}) muliaInput : TemplateRef<any>;
  @ViewChild('Berlian', {static: false}) berlianInput : TemplateRef<any>;
  @ViewChild('Adiratna', {static: false}) adiratnaInput : TemplateRef<any>;
  @ViewChild('Souvenir', {static: false}) souvenirInput : TemplateRef<any>;
  @ViewChild('Gift', {static: false}) giftInput : TemplateRef<any>;
  @ViewChild('Dinar', {static: false}) dinarInput : TemplateRef<any>;


  selected : any[] = [];
  selected_detail : any[] = [];
  data_view : any = {};


//DATA
units : any[] = [];          
unit_tj : any[] = [];
products:  any[] = [];        
products2 : any[] = [];
productss : any[] = [];
errorTitle = "";              
errorMessage = "";
errorType = "";               
ErrorType = ModalErrorType;
searchModel : any = {};       
datas : any[] = [];
itemsinmutasi : any = [];
items : any[] = [];
details : any[] = [];
Object = Object;
itemsview : any[] = [];
ItemsDataProduct : any[] = [];

//ASSET
flag : any[]= [];             
listdt : any[]=[];
message:string="";            
code = "";
modal = false
claritys : any[] = [];        
colors : any[] = [];
series : any[] = [];          
denoms : any[] = [];
input : any = {};   
addinput : any = {};
edit : any = {};          
Flag = Object.values(FlagMutasi);
username = "";                
mongoMutasi : any[] = [];
kadars : any[] = [];          
warnas : any[] = [];  
jeniss : any[] = [];  
error : boolean = false;   
jml : number = 0;
berat : number = 0;
dorong : any[] = [];

pickpush : any[] = [];

itemsdata : any[] = [];
itempick  : number = 0;
datareduce : any[] = [];
vendor : any[] = [];

//CLARITY
modalshow = false;            
modal_pick = false;
modaleditdialog = false;
modalview : boolean = false;
formInput : TemplateRef<any> = null;
params = "?";

date_time : String;
timezone : String;
date_now : String;
time : String;

constructor(private UnitService : UnitService, private sessionservice : SessionService, 
  private mutasiservice : MutasiService, private productservice : ProductService,
  private warnaservice : ProductGoldColorService, private kadarservice : ProductPurityService,
  private jenisservice : ProductJenisService, private denomservice : ProductDenomService,
  private productkategoryservice : ProductCategoryService,
  private klarityservice : ProductClarityService, private datetimeservice : ServerDateTimeService,
  private seriesservice : ProductSeriesService, private toastr : ToastrService,
  private vendorservice : VendorService) { }


  ngOnInit(): void {
//    var waktu = (new Date()).getTimezoneOffset() * 60000;
//    //offset in milliseconds
  	   
//      let tgl = this.date_time.split("T");
//      this.date_now = tgl[0];
//      this.time = tgl[1].split(".")[0];
	  
	  //DATE & TIME
	
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

    for(let key in this.searchModel){
      params += key+"="+this.searchModel[key]+"&";
    }
    console.log(params);
    this.UnitService.list(params).subscribe(output=>{
        if(output!=false){
          this.units = output;
          this.unit_tj = this.units.slice();
        }
        let userUnitCode = this.sessionservice.getUser().unit.code;
        for (let index = 0; index < this.unit_tj.length; index++) {
          const element = this.unit_tj[index];
          if(element.code == userUnitCode)
            this.unit_tj.splice(index, 1);
          
        }
    });
  }


  codeGet(data){
    this.edit = true;
    console.log(this.searchModel[data]);
  }


  doSearch(){

    let params = "?";
    for(let key in this.input){
      if(this.input[key] == null)continue;

      switch(key){
        case 'unit_tujuan':
          params += 'unit_tujuan.code='+this.input[key].code+"&";
          break;

        case 'created_date':
          params += 'created_date='+this.input[key]+"&";
          break;

        case 'tgl_terima':
          params += 'tgl_terima='+this.input[key]+"&";
          break;

        case 'flag':
          params += 'flag='+this.input[key].code+"&";
          break;

        default:
        params += key+="="+this.input[key]+"&";
        break;
      }
    console.log(params);
    }

    this.mutasiservice.list(params).subscribe(output=>{
      if(output==false){
        if(this.mutasiservice.message() != ""){
          console.log(output);
	  this.toastr.info('Data tidak ditemukan','Informasi');
//          this.modal = true;
          this.input = {};
          this.listdt = [];
          return
        }
      }
      this.listdt = output;
    });


  }

  onAdd(){    
    this.itemsdata = [];
    this.itempick = 0;
    this.searchModel = {};
    this.addinput['keterangan']="";
    let params ="?";
    this.onChange();
    this.modalshow=true;

    this.productkategoryservice.list(params).subscribe(output=>{
      if(output!=false){
        this.products2 = output;
      }
    })

    this.vendorservice.list(params).subscribe(output=>{
     if(output!=false){
       this.vendor = output;
     }
   })

  }

  reset(){
    this.searchModel = {};
    this.input = {};
    this.listdt = [];
  }

  onChange(){
     
  this.itemsinmutasi = [];
  this.products = [];
     if(this.searchModel['product-category']==null)return;

    switch(this.searchModel['product-category'].code)
    {
      case "c00":
        this.formInput = this.perhiasanInput;
        break;

      case "c01":
        this.formInput = this.berlianInput;
        break;

      case "c02":
        this.formInput = this.souvenirInput
        break;

      case "c03":
        this.formInput = this.adiratnaInput;
        break;

      case "c04":
        this.formInput = this.giftInput;
        break;

      case "c05":
        this.formInput = this.muliaInput;
        break;
      
      case "c06":
        this.formInput = this.dinarInput;
        break;

      default:
        this.formInput = null;
        break;
    }

    
    let params = "?";

    //WARNA
    this.warnaservice.list(params).subscribe(output=>{
      if(output==false){
        if(this.warnaservice.message() != ""){
          console.log(output);
          return
        }
      }
      this.warnas = output;
    });

    //KARAT
    this.kadarservice.list(params).subscribe(output=>{
      if(output==false){
        if(this.kadarservice.message() != ""){
          console.log(output);
          return
        }
      }
      this.kadars = output;
    });

    //JENIS
    this.jenisservice.list(params).subscribe(output=>{
      if(output==false){
        if(this.jenisservice.message() != ""){
          console.log(output);
          return
        }
      }
      this.jeniss = output;
    });

    //DENOM
    this.denomservice.list(params).subscribe(output=>{
      if(output == false){
        if(this.denomservice.message() != ""){
          console.log(output);
          return
        }
      }
      this.denoms = output;
    })
    
    //KLARITY
    this.klarityservice.list(params).subscribe(output=>{
      if(output == false){
        if(this.klarityservice.message() != ""){
          console.log(output);
          return
        }
      }
      this.claritys = output;
    })

    //SERIES
    this.seriesservice.list(params).subscribe(output=>{
      if(output == false){
        if(this.seriesservice.message() != ""){
          console.log(output);
          return
        }
      }
      this.series = output;
    })

  }

  Add(){

    let tujuan = this.addinput['unit_tujuan'];
	  let ktr = this.addinput['keterangan'];
    let vdr = this.addinput['vndr'];

    let value = 0;
    for(let index = 0; index < this.itemsdata.length; index++){

      if(this.itemsdata[index]['berat'] == undefined)
      {
        value = this.itemsdata[index]['product-denom'].value;
        console.log(value);
      }else {
        value = parseFloat(this.itemsdata[index]['berat']);
        console.log(value, 'berat');
      }
      this.berat = this.berat + value;
    }
      // this.berat = this.berat + value;

     console.log(this.berat.toString(),"total berat");
    console.log(this.itemsdata.length);
    let jml = this.itemsdata.length;


    let data = {
      created_by : this.sessionservice.getUser().username,
      created_date : this.date_now,
      created_time : this.time,
      unit_asal : this.sessionservice.getUser().unit,
      unit_tujuan : tujuan,
      jumlah_item : jml.toString(),
      total_berat : this.berat.toString(),
	  keterangan  : ktr,
      flag : "submit",
      approve_by : null,
      approve_date : null,
      update_by : null,
      update_date : null,
      update_time : null,
      tgl_terima : null,
      terima_by: null,
      items : []
      
    }

    for(let index =0; index < this.itemsdata.length; index++){
      data.items.push(this.itemsdata[index]);
    }

    console.log(data);

    let cfg = DataTypeUtil.Encode(data);
    console.log(cfg);

    if(this.itemsdata.length < 0 || tujuan == null || tujuan == "" || ktr == "" || ktr == null){
      this.toastr.warning("Field Unit Tujuan belum dipilih atau data barang yang dimutasi belum di tambah. Dan cek kembali field keterangan","Peringatan");
      // this.itemsdata = [];
      this.berat = 0;
      return;
    }
    this.mutasiservice.add(cfg).subscribe(output => {
      if(output!=false){
        this.modalshow = false;
        this.products = [];
        this.listdt = [];
        this.addinput = {};
        this.searchModel = {};
        this.itemsinmutasi = [];
      }
    })
     
  }


  searchProduct(){
    this.products = [];
    this.modal_pick = false;
    let params = "?";
    for (let key in this.searchModel) {
      if(this.searchModel[key] == ""||this.searchModel[key] == null||this.searchModel[key] == "null")continue;
      switch(key){
        case "vndr":
          params += "vendor.code="+this.searchModel[key].code+"&";
          break;

        case "product-category":
          params += "product-category.code="+this.searchModel[key].code+"&";
          break;

        case "jenis":
          params += "product-jenis.code="+this.searchModel[key].code+"&";
          break;

        case "warna":
          params += "product-gold-color.name="+this.searchModel[key].name+"&";
          break;
        
        case "berat":
          params += "berat="+this.searchModel[key]+"&";
          break;

        case "kadar":
          params += "product-purity.code="+this.searchModel[key].code+"&";
          break;

        case "cut":
          params += "product-cut.code="+this.searchModel[key].code+"&";
          break;

        case "clarity":
          params += "product-clarity.code="+this.searchModel[key].code+"&";
          break;        
        
        case "carat":
          params += "carat="+this.searchModel[key]+"&";
          break;

        case "denom":
          params += "product-denom.code="+this.searchModel[key].code+"&";
          break;

        case "seri":
          params += "product-series.code="+this.searchModel[key].code+"&";
          break;

        default:
          params += key+="="+this.searchModel[key]+"&";
          break;
      }
    }
    params.endsWith("&") ? params = params.substring(0, params.length-1) : null;
    console.log(this.searchModel);
    this.productservice.list(params).subscribe(output => {
      if(output != false){
        this.products = output;
        this.searchModel = {};
        this.formInput = null;
      }else{
        // this.modal = true;
        this.toastr.info("Data Produk tidak ditemukan","Informasi");
      }
    })
  }

pickitem(){
      this.selected = [];
      if(this.itempick > 0 && this.itempick <= this.products.length){
      for(let y = 0; y < this.itempick; y++){
        this.selected.push(this.products[y]);
        }
      }else{
        this.toastr.info("Item yang dipilih tidak sesuai");
        this.itempick = 0;
      }
  }

//--------------------------------------------------------------------------------------------

Addmutasi(){
  // this.selected_detail = [];
  if(this.selected == [] || this.selected == null)return;
  console.log(this.selected);
  // let safe = JSON.stringify(this.selected);
  
//   for(let o = 0; o < this.itemsinmutasi.length; o++){
//     if(this.selected[o]._id==this.itemsinmutasi._id){
//       alert("Items sudah ada");
// //      console.log(this.ItemsDataProduct[o]);
//       return;
//     }
//   }

   
  this.itemsinmutasi.push(this.selected);
  for(let r = 0; r < this.itemsinmutasi.length; r++){
    this.dorong[r] = this.itemsinmutasi[r];
    this.itemsdata = this.dorong[r];
    // if(this.selected[r]._id  == this.itemsdata[r]._id){
    //   alert("data sudah ada");
    // }
  }

    // function reducer(acc,cur){
    //   return{...acc,[cur._id]:cur};
    // }
    // this.datareduce = this.ayoo.reduce(reducer,{});
    // console.log(this.datareduce);

}




//-----------------------------------------------------------------------------------------


refresh(){
  this.itemsinmutasi = [];
  this.itemsdata = [];
  this.products = [];
}

onView(){
  this.details = [];
    this.details.push(this.data_view);
    for(let i = 0; i < this.details.length; i++){
      console.log(this.details[i].items);
      this.itemsview = this.details[i].items;
      this.modalview = true;
    }
    console.log(this.itemsview); 
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


      case 'sku':
        name = "SKU";
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

    case 'weight':
    name = "Weight";
    break;

    case 'unit':
    name = "Unit";
    break;

    case 'tipestock':
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

}
