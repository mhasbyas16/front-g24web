import { Component, OnInit, Output, TemplateRef, ViewChild, ElementRef } from '@angular/core';


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
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { ProductClarityService } from '../../../services/product/product-clarity.service';
import { ServerDateTimeService } from '../../../services/system/server-date-time.service';
import { ProductSeriesService } from '../../../services/product/product-series.service';
import { ProductDiamondColorService } from '../../../services/product/product-diamond-color.service';
import { TipeStock } from '../../../lib/enum/flag-product';
import { FlagProduct } from '../../../lib/enum/flag-product';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';
import { CetakMutasiComponent } from '../../../../g24/cetakan/stock/cetak-mutasi/cetak-mutasi.component';
import { StringHelper } from '../../../lib/helper/string-helper';

//SORTING CLARITY LIB
import {ClrDatagridSortOrder} from '@clr/angular';

@Component({
  selector: 'app-mutasi',
  templateUrl: './mutasi.component.html',
  styleUrls: ['./mutasi.component.scss']
})

@DContent(MutasiComponent.key)
export class MutasiComponent implements OnInit {
static key = EMenuID.MUTASI;


  //ELEMENT HTML [ NG TEMPLATE ] UNTUK MEMUNCULKAN ATTRIBUT KATEGORI YANG DIPILIH PADA SAAT MEMILIH PRODUK KATEGORI
  @ViewChild('kategori') kategori : ElementRef;
  @ViewChild('Perhiasan', {static:false}) perhiasanInput : TemplateRef<any>;
  @ViewChild('Emas_Batangan', {static:false}) emasbatanganInput : TemplateRef<any>;
  @ViewChild('Berlian', {static: false}) berlianInput : TemplateRef<any>;
  @ViewChild('Adiratna', {static: false}) adiratnaInput : TemplateRef<any>;
  @ViewChild('Souvenir', {static: false}) souvenirInput : TemplateRef<any>;
  @ViewChild('Gift', {static: false}) giftInput : TemplateRef<any>;
  @ViewChild('Dinar', {static: false}) dinarInput : TemplateRef<any>;

  //ELEMENT HTML LOADING SPINNER UNTUK LOAD DATA
  @ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;

  //ELEMENT HTML EXPORT PDF UNTUK CETAK KIRIM MUTASI
  @ViewChild('exportPDF',{static:false}) pdf : CetakMutasiComponent;


  //UNTUK MEMILIH DATA PRODUK PADA SAAT INGIN MENAMBAHKAN MUTASI 
  selected : any[] = [];

  //UNTUK MEMILIH DATA PRODUK YANG SUDAH DITAMBAHKAN PADA MODAL TAMBAH MUTASI
  //FUNGSI UNTUK MENGHAPUS PRODUK YANG DIPILIH SEBELUMNYA
  selected_items : any[] = [];

  //UNTUK MEMILIH DATA MUTASI YANG TELAH DIMUTASIKAN
  //FUNGSINYA UNTUK MELIHAT DATA MUTASI YANG DIPIILIH
  data_view : any = {};

  //VARIABEL UNTUK MENGECEK UNIT TUJUAN YANG DIINPUT PADA SAAT MENG
  searchCode : any = {};

  unittuju : any[] = [];
  unitnya : any = {};
//DATA
units : any[] = [];          
unit_tj : any[] = [];
products:  any[] = [];        
product_kategori : any[] = [];

errorMessage = "";
errorType = "";               
ErrorType = ModalErrorType;

searchModel : any = {};      
itemsinmutasi : any = [];
items : any[] = [];
details : any[] = [];
Object = Object;
itemsview : any[] = [];
ItemsDataProduct : any[] = [];

jml_hpp : number = 0;
ttl_hpp : number = 0;

//ASSET
flag : any[]= [];             
listdt : any[]=[];
message:string="";            
code = "";
modal = false;
claritys : any[] = [];        
colors : any[] = [];
series : any[] = [];          
denomsSouvenir : any[] = [];
denomsGift : any[] = [];
denomsDinar : any[] = [];
denomsEmas : any[] = [];
input : any = {};   
addinput : any = {};
Flag = Object.values(FlagMutasi);
Tipe = Object.values(TipeStock);
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

isVendor : boolean = false;

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

product_cut : any[] = [];
Lock : Boolean = false;

noItem : number = 0;
innerDoc : any = {};
date : String = "";

//VARIABEL SORT 
descSort : any; 
descSort_terima : any;

Tesdata : any = [];

constructor(private UnitService : UnitService, private sessionservice : SessionService, 
  private mutasiservice : MutasiService, private productservice : ProductService,
  private warnaservice : ProductGoldColorService, 
  private diamondservice : ProductDiamondColorService,
  private kadarservice : ProductPurityService,
  private jenisservice : ProductJenisService, private denomservice : ProductDenomService,
  private productkategoryservice : ProductCategoryService,
  private klarityservice : ProductClarityService, private datetimeservice : ServerDateTimeService,
  private seriesservice : ProductSeriesService, private toastr : ToastrService,
  private vendorservice : VendorService,
  ) { }


  ngOnInit(): void {
	
    let params = "?";
    this.Lock = false;
    
	 


	this.datetimeservice.task("").subscribe(output=>{
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

    this.LoadAllAtribut();
    
    this.descSort = ClrDatagridSortOrder.ASC;
    this.descSort_terima = ClrDatagridSortOrder.ASC;

  }

  async LoadAllAtribut(){
      this.LoadCategory();
      this.LoadColor();
      this.LoadKadar();
      this.LoadJenis();
      this.LoadDenomSouvenir();
      this.LoadDenomGift();
      this.LoadDenomDinar();
      this.LoadDenomEmas();
      this.LoadKlarity();
      this.LoadSeries();
      this.LoadDiamondColor();
      this.LoadProductCutArray();
  }

  async LoadUnit(){
    // let data = await this.UnitService.list("?").toPromise();
    // if(data==false){
    //   let msg = this.UnitService.message();
    //   this.toastr.error("Gagal load unit "+msg,"Error");
    //   return;
    // }
    
}

  async LoadCategory(){
    //Product Kategori
    let data = await this.productkategoryservice.list("?").toPromise();
    if(data==false){
      let msg = this.productkategoryservice.message(); 
      this.toastr.error("Data kategori gagal diload "+msg,"Error");
      return;
    }    
    let datakategori = data;
    for(let i = 0; i < datakategori.length; i++){
      if(datakategori[i].name=="Berlian" || datakategori[i].name=="Dinar"){
        this.product_kategori = datakategori;
        this.product_kategori.splice(i,1);
      }
    }
    
  }

  async LoadDiamondColor(){
    let data = await this.diamondservice.list("?").toPromise();
    if(data==false){
      let msg = this.diamondservice.message();
      this.toastr.error("Data Load Diamond Color gagal diload "+msg, "Error");
      return;
    }
    this.colors = data;
  }

  async LoadColor(){
    //Product Gold Color
    let data = await this.warnaservice.list("?").toPromise();
    if(data==false){
      let msg = this.warnaservice.message();
      this.toastr.error("Gagal load warna "+msg,"Error");
      return;
    }
    this.warnas = data;
  }

  async LoadKadar(){
    //Product Purity
    let data = await this.kadarservice.list("?").toPromise();
    if(data==false){
      let msg = this.kadarservice.message();
      this.toastr.error("Gagal load Product Purity "+msg,"Error");
      return;
    }
      this.kadars = data;
  }

  async LoadJenis(){
    //Product Jenis
    let data = await this.jenisservice.list("?").toPromise();
    if(data==false){
      let msg = this.jenisservice.message();
      this.toastr.error("Gagal load Product Jenis "+msg,"Error");
      return;
    }
      this.jeniss = data;
  }

  async LoadDenomSouvenir(){
    //Product Denom Souvuenir
    let data = await this.denomservice.list("?product-category.name=Souvenir").toPromise();
    if(data==false){
      let msg = this.denomservice.message();
      this.toastr.error("Gagal load Product Denom "+msg,"Error");
      return;
    }
      this.denomsSouvenir = data;
  }
  
  async LoadDenomGift(){
    //Product Denom Gift
    let data = await this.denomservice.list("?product-category.name=Gift").toPromise();
    if(data==false){
      let msg = this.denomservice.message();
      this.toastr.error("Gagal load Product Denom "+msg,"Error");
      return;
    }
      this.denomsGift = data;
  }

  async LoadDenomDinar(){
    //Product Denom Dinar
    let data = await this.denomservice.list("?product-category.name=Dinar").toPromise();
    if(data==false){
      let msg = this.denomservice.message();
      this.toastr.error("Gagal load Product Denom "+msg,"Error");
      return;
    }
      this.denomsDinar = data;
  }

  async LoadDenomEmas(){
    //Product Denom Emas
    let data = await this.denomservice.list("?product-category.name=Mulia").toPromise();
    if(data==false){
      let msg = this.denomservice.message();
      this.toastr.error("Gagal load Product Denom "+msg,"Error");
      return;
    }
      this.denomsEmas = data;
  }

  async LoadKlarity(){
    //Product Clarity
    let data = await this.klarityservice.list("?").toPromise();
    if(data==false){
      let msg = this.klarityservice.message();
      this.toastr.error("Gagal load Product Klarity "+msg,"Error");
      return;
    }
      this.claritys = data;
  }

  async LoadSeries(){
    //Product Series
    let data = await this.seriesservice.list("?").toPromise();
    if(data==false){
      let msg = this.seriesservice.message();
      this.toastr.error("Gagal load Product Series "+msg,"Error");
      return;
    }
      this.series = data;
  }

  async LoadProductCutArray(){
    this.product_cut = [
      {code : "vg" , name : "very good"},
      {code : "g" , name : "good"}
    ]
  }


  async doSearch(){

    let params = "?";
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();

    // if(this.sessionservice.getUser().unit.code!="00005"){
    //   params += "unit_asal.code="+this.sessionservice.getUser().unit.code+"&";
    // }

    params += "unit_asal.code="+this.sessionservice.getUser().unit.code+"&";

    for(let key in this.input){
      if(this.input[key] == null || this.input[key]=="null" || this.input[key]=="")continue;

      switch(key){
        case 'unit_tujuan':
          params += 'unit_tujuan.code='+this.input[key].code+"&";
          break;

        case 'created_date':
          params += 'created_date='+StringHelper.StandardFormatDate('/',this.input[key],'MM/dd/yyyy')+"&";
          break;

        case 'tgl_terima':
          params += 'tgl_terima='+StringHelper.StandardFormatDate('/',this.input[key],'MM/dd/yyyy')+"&";
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

    let data = await this.mutasiservice.list(params).toPromise();
    if(data==false){
      this.toastr.info('Data tidak ditemukan','Informasi');
      this.spinner.Close();
      this.input = {};
      this.listdt = [];
      return;
    }
    this.toastr.success("Data ditemukan "+data.length,"Sukses");
    this.listdt = data;
    console.log(this.listdt[this.listdt.length - 1]._id,"Id terakhir data");
    this.spinner.Close();
  }

  onAdd(){    
    this.items = [];
    this.Lock = false;
    this.itempick = 0;
    this.searchModel = {};
    this.addinput={};
    this.searchCode = {};
    let params ="?";
    this.onChange();
    this.LoadCategory();
    this.modalshow=true;

  }

  reset(){
    this.LoadCategory();
    this.searchModel = {};
    this.input = {};
    this.products = [];
    this.items = [];
    this.searchCode = {};
    this.Lock = false;
    this.addinput = {};
    this.formInput = null;
    this.itempick = 0;
    this.berat = 0;
    this.jml_hpp = 0;
    // this.listdt = [];
  }

  async validateInputNumerik(){
    let validate = "^[0-9]+$";
    if(!this.searchCode['code'].match(validate)){
      this.toastr.info("Inputan harus numerik","Informasi");
    }

    if(this.searchCode['code']==""){
      this.addinput.unit_tujuan = {};
    }

  }

  oncekUnitCode(){
    this.spinner.SetSpinnerText("Mencari Unit, Mohon Tunggu...");
    this.spinner.Open();
    this.unitnya = {};
    let unit = this.searchCode["code"];

    if(unit == this.sessionservice.getUser().unit.code){
      this.toastr.info("Anda saat ini berada pada unit tsb","Informasi");
      this.spinner.Close();
      this.addinput['unit_tujuan'] = "";
      return;
    }

    if(!unit){
      this.toastr.warning("Harap masukan kode unit","Peringatan");
      this.addinput['unit_tujuan'] = "";
      this.spinner.Close();
      return;
    }

    let params ="?code="+unit;
    this.UnitService.list(params).subscribe(data=>{
      if(data==false){
        if(this.UnitService.message()!=""){
          this.toastr.warning("Unit tidak ditemukan","Peringatan");
          this.addinput['unit_tujuan'] = "";
          this.spinner.Close();
          return;
        }
      } else if(data.length == 0)
      {
        this.spinner.Close();
        this.toastr.warning("Unit tidak ditemukan","Peringatan");
        return;
      }

      this.addinput['unit_tujuan'] = data[0];
      this.spinner.Close();
      // console.log(this.addinput["unit_tujuan"]);
    })
  }

  vendorReset(){
    this.itemsinmutasi = [];
    this.items = [];
    this.products = [];
  }

  async onChange(){

  this.itemsinmutasi = [];
  this.items = [];
  this.vendor = [];
  this.products = [];
  this.isVendor = true;
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
        this.formInput = this.souvenirInput;
        break;

      case "c03":
        this.formInput = this.adiratnaInput;
        break;

      case "c04":
        this.formInput = this.giftInput;
        break;

      case "c05":
        this.formInput = this.emasbatanganInput;
        break;
      
      case "c06":
        this.formInput = this.dinarInput;
        break;

      default:
        this.formInput = null;
        break;
    }

    
    let params = "?";

    //VENDOR
    let data = await this.vendorservice.list(params+"product-category.code="+this.searchModel["product-category"].code).toPromise();
    if(data==false){
      let msg = this.vendorservice.message();
      this.toastr.error("Gagal load vendor "+msg,"Error");
      return;
    }
    this.vendor = data;
}

  async Add(){

    console.log(this.date_now);
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();

    for(let i = 0; i < this.items.length; i++){
      let cekFlagItems = this.items[i].flag;
      let id = this.items[i]._id;
      console.log("Id Product = ",id);
      let cekproductFlag = await this.productservice.list("?_id="+id+"&flag="+cekFlagItems+"&").toPromise();
      if(cekproductFlag[i]?.flag == "transit"){
        this.toastr.info("Items product yang dipilih, sudah tidak bertipe stock","Informasi");
        this.spinner.Close();
        return;
      }
    }

    let tujuan = this.addinput['unit_tujuan'];

	  let ktr = this.addinput['keterangan'];
    let vdr = this.addinput['vndr'];

    let unit = this.searchCode["code"];

    let cekUnitInvalid = await this.UnitService.list("?code="+unit).toPromise();
    if(cekUnitInvalid==false){
      this.toastr.warning("Unit Invalid, mohon isi kode unit yang benar","Peringatan");
      this.spinner.Close();
      this.addinput['unit_tujuan'] = "";
      return;
    }else if(this.addinput["unit_tujuan"].nama==""){
      this.toastr.warning("Unit tujuan belum di isi atau di cek","Peringatan");
      this.spinner.Close();
      return;
    }else if(this.searchCode["code"]==""){
      this.toastr.warning("Kode Unit tujuan belum diisi","Peringatan");
      this.spinner.Close();
      return;
    }else if(unit == this.sessionservice.getUser().unit.code){
      this.toastr.info("Anda saat ini berada pada unit tsb","Informasi");
      this.spinner.Close();
      this.addinput['unit_tujuan'] = "";
      return;
    }


    let value = 0;
    for(let index = 0; index < this.items.length; index++){

      // if(this.items[index]['berat'] == undefined)
      // {
      //   value = parseFloat(this.items[index]['product-denom'].value);
      //   console.log(value, "denom");
      // }else if(this.items[index]['product-denom']?.value == undefined){
      //   value = parseFloat(this.items[index]['berat']);
      //   console.log(value, "berat ( di isi jika product denom tidak ada )");
      // }else{
      //   value = parseFloat(this.items[index]['product-denom'].value);
      //   console.log(value, 'denom');
      // }
      // this.berat = this.berat + value;

      if(this.searchModel["product-category"].name == "Perhiasan"){

        value = parseFloat(this.items[index]['berat']);
        console.log("Berat perhiasan = ",value);

      }else if(this.searchModel["product-category"].name == "Souvenir"){
        
        value = parseFloat(this.items[index]["product-denom"].value);
        console.log("Denom dari Souvenir ",value);
      
      }else if(this.searchModel["product-category"].name == "Gift"){
      
        value = parseFloat(this.items[index]["product-denom"].value);
        console.log("Denom dari Dinar ",value);
      
      }else if(this.searchModel["product-category"].name == "Emas Batangan"){
      
        value = parseFloat(this.items[index]["product-denom"].value);
        console.log("Denom Emas Batangan ",value);
      
      }else if(this.searchModel["product-category"].name == "Permata"){
      
        value = parseFloat(this.items[index]["total_berat"]);
        console.log("Total berat dari Permata ",value);
      
      }else if(this.searchModel["product-category"].name == "Dinar"){
      
        value = parseFloat(this.items[index]["product-denom"].value);
        console.log("Denom Dinar ",value);
      }
      this.berat = Math.round((this.berat + value) * 100) / 100;
    }
      // this.berat = this.berat + value;

     console.log(this.berat.toString(),"total berat");
    console.log(this.items.length);
    let jml = this.items.length;

    //JUMLAH HPP
    for(let p = 0; p < this.items.length; p++){
      if(this.searchModel["product-category"].name == "Permata"){
        this.jml_hpp = this.jml_hpp + this.items[p].hpp + this.items[p].hpp_berlian + this.items[p].hpp_batu + this.items[p].ongkos_pembuatan;
        console.log("Jumlah HPP Permata" ,this.jml_hpp);
      }else{
      this.jml_hpp = this.jml_hpp + this.items[p].hpp;
      console.log(this.jml_hpp,"Jumlah HPP");
      }
    }
    console.log("Jumlah HPP ",this.jml_hpp);

    let cetak = {
      created_by : this.sessionservice.getUser().username,
      created_date : this.date_now,
      unit_tujuan : tujuan,
      "product-category" : this.searchModel["product-category"],
      unit_asal : this.sessionservice.getUser().unit,
      total_hpp : this.jml_hpp.toString(),
      total_berat : this.berat.toString(),
      keterangan : ktr,
      items : []
    }
    


    let data = {
      created_by : this.sessionservice.getUser().username,
      created_date : this.date_now,
      created_time : this.time,
      unit_asal : this.sessionservice.getUser().unit,
      unit_tujuan : tujuan,
      jumlah_item : jml.toString(),
      total_hpp : this.jml_hpp.toString(),
      total_berat : this.berat.toString(),
	    keterangan  : ktr,
      flag : FlagMutasi.SUBMIT.code,
      "product-category" : this.searchModel["product-category"],
      approve_by : null,
      approve_date : null,
      update_by : null,
      update_date : null,
      update_time : null,
      tgl_terima : null,
      terima_by: null,
      items : []
      
    }

    
    for(let index =0; index < this.items.length; index++){
      data.items.push(this.items[index]);
      cetak.items.push(this.items[index]);
    }

    console.log(data);

    let cfg = DataTypeUtil.Encode(data);
    console.log(cfg);

    if(this.items.length <= 0 || tujuan == null || tujuan == "" || ktr == "" || ktr == null){
      this.spinner.Close();
      this.toastr.warning("Field Unit Tujuan belum dipilih atau data barang yang dimutasi belum di tambah. Dan cek kembali field keterangan","Peringatan");
    
      this.berat = 0;
      this.jml_hpp = 0;
      return;
    }

    this.mutasiservice.add(cfg).subscribe(output => {
      if(output!=false){
        this.spinner.Close();
        this.modalshow = false;
        this.products = [];
        this.listdt = [];
        this.berat = 0;
        this.jml_hpp = 0;
        this.addinput = {};
        this.searchModel = {};
        this.itemsinmutasi = [];
      }

      for(let i = 0; i < this.items.length; i++){
        console.log(this.items[i]._id);
        let updateproduk = {
          _id : this.items[i]._id,
          flag : FlagProduct.TRANSIT.code
        }
  
        let encode = DataTypeUtil.Encode(updateproduk);
        this.productservice.update(encode).subscribe(data=>{
          if(data==false){
            if(this.productservice.message()!=""){
              let msg = this.productservice.message();
              this.toastr.error("Error product "+msg,"Error");
              this.spinner.Close();
              return;
            }
          }
        })
      }
      this.doSearch();

      this.spinner.Close();
      this.modalshow=false;
      this.pdf.Makepdf(cetak);
      this.toastr.success("Data berhasil di mutasi","Berhasil");
      this.reset();

      //PROSES LOADING CETAK MUTASI
      this.toastr.info("Mohon tunggu, sedang memproses cetak mutasi","Informasi");
    });



      
     
  }

  async searchProduct(){
    this.spinner.SetSpinnerText("Sedang melakukan pencarian Produk...");
    this.spinner.Open();

    if(!this.searchModel["product-category"]){
      this.toastr.warning("Produk kategori belum dipilih","Peringatan");
      this.spinner.Close();
      return;
    }else if(!this.searchModel.vndr){
      this.spinner.Close();
      this.toastr.warning("Vendor belum dipilih","Peringatan");
      return;
    }else if(!this.searchModel.tipe_stock){
      this.spinner.Close();
      this.toastr.warning("Tipe stock belum dipilih","Peringatan");
      return;
    }
    

    // this.products = [];

    this.modal_pick = false;
    let params = "?flag=stock&";
    params += "unit.code="+this.sessionservice.getUser().unit.code+"&";
    for (let key in this.searchModel) {
      if(this.searchModel[key] == null||this.searchModel[key] == "null"||this.searchModel[key]=="")continue;
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

        case "color":
          params += "product-diamond-color="+this.searchModel[key].name.toUpperCase()+"&";
          break;
        
        case "berat":
          params += "berat="+this.searchModel[key]+"&berat_encoded=double&";
          break;

        case "kadar":
          params += "product-purity.code="+this.searchModel[key].code+"&";
          break;

        case "cut":
          params += "product-cut.code="+this.searchModel[key].code+"&";
          break;

        case "product_stone":
          params += "product-stone="+this.searchModel[key]+"&";
          break;

        case "product_stone_color":
          params += "product-stone-color="+this.searchModel[key]+"&";
          break;

        case "clarity":
          params += "product-clarity="+this.searchModel[key]+"&";
          break;        
        
        case "carat":
          params += "product-carat="+this.searchModel[key]+"&";
          break;

        case "denom":
          params += "product-denom.code="+this.searchModel[key].code+"&";
          break;

        case "seri":
          params += "product-series.code="+this.searchModel[key].code+"&";
          break;

         case "tipe_stock":
           params += "tipe_stock="+this.searchModel[key].code+"&";
           break;

        default:
          params += key+="="+this.searchModel[key]+"&";
          break;
      }
    }
    params.endsWith("&") ? params = params.substring(0, params.length-1) : null;
    console.log(this.searchModel);
    let search = await this.productservice.list(params).toPromise();
    if(search==false){
      let msg = this.productservice.message();
      this.toastr.info("Data tidak ditemukan","Informasi");
      this.products = [];
      this.spinner.Close();
      return;
    }
    this.spinner.Close();
    this.toastr.success("Data ditemukan "+search.length,"Sukses");
    this.products = search;
    // this.formInput = null;

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
  this.selected_items = [];
  if(this.searchCode.code == "" || this.searchCode.code == null){
    this.toastr.warning("Mohon isi kode branch dahulu","Peringatan");
    return;
  }else if(this.addinput.unit_tujuan == "" || this.addinput.unit_tujuan == null){
    this.toastr.warning("Mohon cek nama unit tersebut dengan menekan ENTER","Peringatan");
    return;
  }else if(this.searchModel["product-category"]=="" || this.searchModel["product-category"]==null){
    this.toastr.warning("Mohon pilih produk katergori dahulu","Peringatan");
    return;
  }else if(this.addinput.keterangan=="" || this.addinput.keterangan == null){
    this.toastr.warning("Mohon isi keterangan dahulu","Peringatan");  
    return;
  }

  if(!this.selected.length){
    this.toastr.warning("Data produk belum dipilih","Peringatan");
  }

  
  for(let r = 0; r < this.selected.length; r++){
    for(let i = 0; i < this.items.length; i++){
      if(this.selected[r]._id == this.items[i]._id){
        this.toastr.info("Data sudah dipilih","Informasi");
        return;
      }
    }
    this.items.push(this.selected[r]);
    this.Lock = true;
    // if(this.selected.indexOf(this.items[r]) == -1){
    //   this.items.push(this.selected[r]);
    //   this.Lock = true;
    // }
  }

}

deleteItems(){
  // const index = this.items.indexOf(this.selected_items);
  // if (index > -1) {
  //   this.items.splice(index, 1);
  // }

  //tes array hapus multiple
  if(this.selected_items.length <= 0){
    this.toastr.warning("Harap pilih item terlebih dahulu","Warning");
    return;
  }
  const idofselected : string[] = this.selected_items.map((e : any) => e._id);
  this.removeData(idofselected);


}

private removeData(idnya : string[]){
  const indexData : number = this.items.findIndex((e : any)=> e._id == idnya[0]);
  this.items.splice(indexData,1);
  idnya.shift();
  if(idnya.length){
    this.removeData(idnya);
  }
}




//-----------------------------------------------------------------------------------------


refresh(){
  this.LoadCategory();
  this.itemsinmutasi = [];
  this.itemsdata = [];
  this.products = [];
  this.searchCode = {};
  this.addinput = {};
  this.vendor = [];
}

onView(){
  this.spinner.SetSpinnerText("Mohon Tunggu...");
  this.spinner.Open();
  if(!this.data_view){
    this.toastr.warning("Data belum dipilih","Peringatan");
    this.spinner.Close();
		return;
	}else if(Object.keys(this.data_view).length==0){
    this.toastr.warning("Data belum dipilih","Peringatan");
    this.spinner.Close();
    return;
  }
  this.details = [];
    this.details.push(this.data_view);
    for(let i = 0; i < this.details.length; i++){
      console.log(this.details[i].items);
      this.itemsview = this.details[i].items;
      this.spinner.Close();
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

    case 'no_po':
    name = "No PO";
    break;

    case 'baku_tukar':
    name = "Baku Tukar";
    break;

    case "location":
    name = "Lokasi";
    break;

    case "price":
    name = "Price";
    break;

    case "ongkos":
    name = "Ongkos";
    break;

    case "gram_tukar":
    name = "Gram Tukar";
    break;

    case "pengajuan_by":
    name = "Pengajuan Dari";
    break;

    case "ongkos_pembuatan":
      name = "Ongkos Pembuatan";
      break;

    case "product-carat":
      name = "Product Carat";
      break;

    case "product-stone":
      name = "Product Stone";
      break;

    case "hpp_batu":
      name = "Hpp Batu";
      break;

    case "total_berat":
      name = "Total Berat";
      break;

    case "product-stone-color":
      name = "Product Stone Color";
      break;

    case "hpp_berlian":
      name = "Hpp Berlian";
      break;

    case "product-stone-dimension":
      name = "Product Stone Dimension";
      break;

    case "hpp_batu_inisiasi":
      name = "Hpp Batu Inisiasi";
      break;

    case "jumlah_butir":
      name = "Jumlah Butir";
      break;

    case "hpp_berlian_inisiasi":
      name = "Hpp Berlian Inisiasi";
      break;

    case "product-stone-carat":
      name = "Product Stone Carat";
      break;

    case "no_urut":
      name = "No Urut";
      break;

    case "nomor_nota":
      name = "Nomer Nota";
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
         
      case "no_item_po":
          return false;
         break;
        
      case "no_index_products":
          return false;
         break;
			
      case "status":
        return false;
        break;

      case "create_by":
        return false;
        break;

      case "create_date":
        return false;
        break;

      case "create_time":
        return false;
        break;

      case "isterima":
        return false;
        break;

      

      default:
        return true;
    }
  }

}
