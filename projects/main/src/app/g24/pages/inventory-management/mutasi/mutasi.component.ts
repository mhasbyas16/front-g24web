import { Component, OnInit, Output, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { NgForm, Form, FormGroup } from '@angular/forms';
import { Key } from 'protractor';
import { environment } from 'src/environments/environment';
import { Observable, config } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { ModalErrorType } from '../../../lib/enums/modal-error-type.enum';
import { ProductService } from '../../../services/product/product.service';
import { MutasiService } from '../../../services/stock/mutasi.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { UnitService } from '../../../services/system/unit.service';
import { ProductGoldColorService } from '../../../services/product/product-gold-color.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { ProductPurityService } from '../../../services/product/product-purity.service';
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { ProductClarityService } from '../../../services/product/product-clarity.service';
import { ProductSeriesService } from '../../../services/product/product-series.service';
import { DataTypeUtil } from '../../../lib/helper/data-type-util';
import { Flag } from '../../../lib/enum/flag';
import { DateService } from '../../../services/system/date.service';

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


  selected : any = {};
  selected_detail : any = {};
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
itemsinmutasi :any[] = [];
items : any[] = [];
details : any[] = [];
Object = Object;
itemsview : any[] = [];

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
Flag = Object.values(Flag);
username = "";                
mongoMutasi : any[] = [];
kadars : any[] = [];          
warnas : any[] = [];  
jeniss : any[] = [];  
error : boolean = false;   
jml : number = 0;
berat : number = 0;

//CLARITY
modalshow = false;            
modal_pick = false;
modaleditdialog = false;
modalview : boolean = false;
formInput : TemplateRef<any> = null;
params = "?";

date_time : Date;
date_now : string;
time : string;

constructor(
  private UnitService : UnitService, 
  private sessionservice : SessionService, 
  private mutasiservice : MutasiService, 
  private productservice : ProductService,
  private warnaservice : ProductGoldColorService, 
  private productkategoryservice : ProductCategoryService,
  private kadarservice : ProductPurityService,
  private jenisservice : ProductJenisService,
  private denomservice : ProductDenomService,
  private klarityservice : ProductClarityService,
  private seriesservice : ProductSeriesService,
  private datetimeservice : DateService,
  ) { }


  ngOnInit(): void {
//    var waktu = (new Date()).getTimezoneOffset() * 60000;
//    //offset in milliseconds
      let data = "";
  	   
//      let tgl = this.date_time.split("T");
//      this.date_now = tgl[0];
//      this.time = tgl[1].split(".")[0];
	  
	  //DATE & TIME
	
	  this.datetimeservice.task(data).subscribe(output=>{
	  	if(output!=false){
	  		this.date_time = new Date(output);
	  		let tgl = this.date_time.toISOString().split("T");
      		this.date_now = tgl[0];
      		this.time = tgl[1].split("Z")[0];
	  		console.log(this.time);
  		}
  	})
	
    let params = "?";

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
          this.modal = true;
          this.input = {};
          this.listdt = [];
          return
        }
      }
      this.listdt = output;
    });


  }

  onAdd(){    
    let params ="?";
    this.onChange();
    this.modalshow=true;
    this.productkategoryservice.list(params).subscribe(output=>{
      if(output!=false){
        this.products2 = output;
      }
    })
  }

  reset(){
    this.searchModel = {};
    this.input = {};
    this.listdt = [];
  }

  onChange(){
     
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

    for(let index = 0; index < this.itemsinmutasi.length; index++){
      let value = 0;

      if(this.itemsinmutasi[index]['berat'] == undefined)
      {
        value = this.itemsinmutasi[index]['product-denom'].value;
        console.log(value);
      }else {
        value = parseFloat(this.itemsinmutasi[index]['berat']);
        console.log(value, 'berat');
      }
      this.berat = this.berat + value;
    }

     console.log(this.berat,"diluar for");
    console.log(this.itemsinmutasi.length);
    let jml = this.itemsinmutasi.length;


    let data = {
      created_by : this.sessionservice.getUser().username,
      created_date : this.date_now,
      created_time : this.time,
      unit_asal : this.sessionservice.getUser().unit,
      unit_tujuan : tujuan,
      jumlah_item : jml.toString(),
      total_berat : this.berat.toString(),
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

    for(let index =0; index < this.itemsinmutasi.length; index++){
      data.items.push(this.itemsinmutasi[index]);
    }

    console.log(data);

    let cfg = DataTypeUtil.Encode(data);
    console.log(cfg);

    if(this.itemsinmutasi.length < 0 || tujuan == null || tujuan == ""){
      alert("Field Unit Tujuan belum dipilih atau data barang yang dimutasi belum di pilih");
      return;
    }
    this.mutasiservice.add(cfg).subscribe(output => {
      if(output!=false){
        this.modalshow = false;
        this.products = [];
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
      }else{
        this.modal = true;
      }
    })
  }


Addmutasi(){
  //this.modal_pick = true;
  this.selected_detail = {};
  if(this.selected == "" || this.selected == null || this.selected == "null")return;
  console.log(this.selected);
  let safe = JSON.stringify(this.selected);
  
  let berat = "";
  for(let o = 0; o < this.itemsinmutasi.length; o++){
    if(this.selected._id==this.itemsinmutasi[o]._id){
      alert("Items sudah ada");
      console.log(this.itemsinmutasi[o]);
      return;
    }
  }
  this.itemsinmutasi.push(this.selected);
  console.log(this.itemsinmutasi.length);
  console.log(this.itemsinmutasi);

}

deleteData(){
  const array = this.itemsinmutasi;
  const index = array.indexOf(this.selected_detail);
  if(index > -1){
    array.splice(index,1);
  }
  console.log(array);
}

refresh(){
  this.itemsinmutasi = [];
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

      case "status":
        return false;
      break;

      default:
        return true;
    }
  }

}
