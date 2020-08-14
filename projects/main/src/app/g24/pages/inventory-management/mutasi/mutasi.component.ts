import { Component, OnInit, Output, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { DContent } from 'src/app/decorators/content/pages';
import { EMenuID } from 'src/app/lib/enums/emenu-id.enum';
import { DataTypeUtil } from 'src/app/lib/helper/data-type-util';
import { UnitService } from 'src/app/services/resource/unit.service';
import { ModalErrorType } from 'src/app/lib/enums/modal-error-type.enum';
import { SessionService } from 'src/app/lib/common/session.service';
import { MutasiService } from 'src/app/services/resource/mutasi.service';
import { Flag } from 'src/app/lib/enums/flag';
import { ProductService } from 'src/app/services/resource/product.service';
import { GoldColorService } from 'src/app/services/resource/gold-color.service';
import { KadarService } from 'src/app/services/resource/kadar.service';
import { JenisService } from 'src/app/services/resource/jenis.service';
import { DenomService } from 'src/app/services/resource/denom.service';
import { ClarityService } from 'src/app/services/resource/clarity.service';
import { SeriesService } from 'src/app/services/resource/series.service';

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


//DATA
units : any[] = [];          
unit_tj : any[] = [];
products:  any[] = [];        
products2 : any[] = [];
errorTitle = "";              
errorMessage = "";
errorType = "";               
ErrorType = ModalErrorType;
searchModel : any = {};       
datas : any[] = [];
itemsinmutasi :any[] = [];
items : any[] = [];

//ASSET
flag : any[]= [];             
listdt : any[]=[];
message:string="";            
code = "";
modal = false;                
edit = false;
claritys : any[] = [];        
colors : any[] = [];
series : any[] = [];          
denoms : any[] = [];
input : any = {};             
Flag = Object.values(Flag);
username = "";                
mongoMutasi : any[] = [];
kadars : any[] = [];          
warnas : any[] = [];  
jeniss : any[] = [];  
error : boolean = false;   

//CLARITY
modalshow = false;            
modal_pick = false;
modaleditdialog = false;
formInput : TemplateRef<any> = null;
params = "?";


constructor(private UnitService : UnitService, private sessionservice : SessionService, 
  private mutasiservice : MutasiService, private productservice : ProductService,
  private warnaservice : GoldColorService, private kadarservice : KadarService,
  private jenisservice : JenisService, private denomservice : DenomService,
  private klarityservice : ClarityService, private seriesservice : SeriesService) { }


  ngOnInit(): void {



    var tgl = new Date();
    var tahun = tgl.getFullYear();
    var bulan = tgl.getMonth();
    var hari = tgl.getDay(); 
     this.username = this.sessionservice.getUser().username;
    console.log(tahun+"/"+bulan+"/"+hari);

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


  //TAMPIL MUTASI DI DATAGRID DETAIL PICK
  // params += "created_by="+this.username+"&";
  // this.mutasiservice.list(params).subscribe(output => {
  //   if(output!=false){
  //     console.log(output);
  //     this.itemsinmutasi = output;
  //   }
  // })
  
  }


  codeGet(data){
    this.edit = true;
    console.log(this.searchModel[data]);
  }


  doSearch(){

    let params = "?";
    for(let key in this.searchModel){
      if(this.searchModel[key] == null){
        continue;
      }
      //if(key == "unit_asal"){
        params += "unit_asal.code="+this.searchModel[key]+"&";
      // }else{
      // params += key+"="+this.searchModel[key]+"&";
      // }
    }
    console.log(params);
    this.mutasiservice.list(params).subscribe(output=>{
      if(output==false){
        if(this.mutasiservice.message() != ""){
          console.log(output);
          this.modal = true;
          this.searchModel = {};
          return
        }
      }
      this.listdt = output;
    });


  }
  
  delete(){
    
  }

  onAdd(){
    // this.mutasiservice.add(this.searchModel).subscribe(output=>{
    //   if(output==false){
    //     this.errorMessage = this.mutasiservice.message();
    //     console.log(this.errorMessage);
    //   }
    // })
    //PRODUCT MONGO
    
    // let params = "?";
    // this.productservice.list(params).subscribe((outputdata : any)=>{
    //   if(outputdata == false){
    //     if(this.productservice.message() != ""){
    //       this.errorMessage;
    //       console.log("data not found");
    //       return;
    //     }
    //   }
    //   this.products = outputdata;
    // })
    
    this.onChange();
    this.modalshow=true;
    this.products2 = [
      {code: "00", name: "Perhiasan"},
      {code: "01", name: "Berlian"},
      {code: "02", name: "Souvenir"},
      {code: "03", name: "Adiratna"},
      {code: "04", name: "Gift"},
      {code: "05", name: "Mulia"},
      {code: "06", name: "Dinar"}
    ]
  }

  reset(){
    this.searchModel = {};
  }

  onChange(){
    if(this.products2 == null) return;
     console.log(this.searchModel['kategori']);
     

    switch(this.searchModel['product-category'])
    {
      case "00":
        this.formInput = this.perhiasanInput;
        break;

      case "01":
        this.formInput = this.berlianInput;
        break;

      case "02":
        this.formInput = this.souvenirInput
        break;

      case "03":
        this.formInput = this.adiratnaInput;
        break;

      case "04":
        this.formInput = this.giftInput;
        break;

      case "05":
        this.formInput = this.muliaInput;
        break;
      
      case "06":
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

    //DIAMOND COLOR

    
    


    // if(this.searchModel['kategori'] != InitiationType.STOCK.code)
    // {
    //   this.formInput = null;
    // }
  }

  Add(){

    
    let waktu = new Date()
    let sNow = waktu.toISOString().split("T");
    let date = sNow[0];
    let time = sNow[1].split(".")[0];


    // for(let key in this.input){
    // console.log(this.input[key]);
    // }

    let asal = this.input['unit_asal'];
    let tujuan = this.input['unit_tujuan'];
    let berat = this.searchModel['berat'];
    let flag = this.input['flag'];
    let jml = this.input['jml_item'];
    let ttl = this.input['total_berat'];

    let data = {
      created_by : this.sessionservice.getUser().username,
      created_date : date,
      created_time : time,
      unit_asal : asal,
      unit_tujuan : tujuan,
      jumlah_item : jml,
      total_berat : ttl,
      flag : flag,
      approve_by : " ",
      approve_date : " ",
      tgl_terima : " ",
      terima_by: " ",
      items : []
      
    }

    for(let index =0; index <= this.itemsinmutasi.length; index++){
      data.items.push(this.itemsinmutasi[index]);
    }

    console.log(data);

    let cfg = DataTypeUtil.Encode(data);
    console.log(cfg);

    // let params = "?";
    // params += "created_by="+this.username+"&";
    // params += "code="+this.selected.code+""

    // this.mutasiservice.list(params).subscribe(output=>{
    //   this.itemsinmutasi = output;
    // })


    if(asal==""||asal=="null"){
       this.error = true;
       console.log("unit asal masih kosong");
    }else{
      this.error = false;
    this.mutasiservice.add(cfg).subscribe(output => {
      if(output!=false){

      }
    })
  }
     
  }

  mainEdit(data){ 
    this.modaleditdialog = true;
    let params = "?";
    this.UnitService.list(params).subscribe(output=>{
      this.units = output;
    })
    console.debug(data)
  }

  mainDelete(data){

  }

  searchProduct(){
    this.modal_pick = false;
    let params = "?";
    for (let key in this.searchModel) {
      if(this.searchModel[key] == ""||this.searchModel[key] == null||this.searchModel[key] == "null")continue;
      switch(key){
        case "product-category":
          params += "product-category.code="+this.searchModel[key]+"&";
          break;

        case "jenis":
          params += "product-jenis.code="+this.searchModel[key]+"&";
          break;

        case "warna":
          params += "product-gold-color.code="+this.searchModel[key]+"&";
          break;
        
        case "berat":
          params += "berat="+this.searchModel[key]+"&";
          break;

        case "kadar":
          params += "product-purity.code="+this.searchModel[key]+"&";
          break;

        case "cut":
          params += "product-cut.code="+this.searchModel[key]+"&";
          break;

        case "clarity":
          params += "product-clarity.code="+this.searchModel[key]+"&";
          break;        
        
        // case "carat":
        //   params += "product-cut.code="+this.searchModel[key]+"&";
        //   break;

        case "denom":
          params += "product-denom.code="+this.searchModel[key]+"&";
          break;

        // case "seri":
        //   params += "product-cut.code="+this.searchModel[key]+"&";
        //   break;

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
  
  //let data = DataTypeUtil.Encode(this.selected);
  // this.mutasiservice.add(data).subscribe(output => {
  //    if(output!=false){
  //      console.log("Sukses");
  //    }
  //  })
  
  // let params = "?";
  // params += "created_by="+this.username+"&";
  // params += "items.product-jenis.code="+this.searchModel['jenis']+"&";
  // params += "items.code="+this.selected['code']+"&";

  // console.log(params);

  

  // this.mutasiservice.list(params).subscribe(output=>{
  //   if(output!=false){
  //     console.log(output);
  //   }else{
  //     this.modal_pick = true;
  //   }
  // })
  this.itemsinmutasi.push(this.selected);
}

deleteData(){
  //this.itemsinmutasi.splice(this.selected_detail);
  const array = this.itemsinmutasi;
  const index = array.indexOf(this.selected_detail);
  if(index > -1){
    array.splice(index,1);
  }
  console.log(array);
}

}
