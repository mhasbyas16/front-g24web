import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { ProductService } from '../../../services/product/product.service';
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { ProductPurityService } from '../../../services/product/product-purity.service';
import { ProductGoldColorService } from '../../../services/product/product-gold-color.service';
import { ProductDiamondColorService } from '../../../services/product/product-diamond-color.service';
import { ProductClarityService } from '../../../services/product/product-clarity.service';
import { PrmLookupService } from '../../../services/location/prm-lookup.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { UnitService } from '../../../services/system/unit.service';
import { VendorService } from '../../../services/vendor.service';
import { TipeStock, FlagProduct } from '../../../lib/enum/flag-product';
import { ToastrService } from 'ngx-toastr';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';

@Component({
  selector: 'detail-inquery-product-permata',
  templateUrl: './detail-inquery-product-permata.component.html',
  styleUrls: ['./detail-inquery-product-permata.component.scss']
})
export class DetailInqueryProductPermataComponent implements OnInit {

  constructor(private productjenisservice : ProductJenisService,
              private productpurityservice : ProductPurityService,
              private productgoldservice : ProductGoldColorService,
              private productdiamondservice : ProductDiamondColorService,
              private productclarityservice : ProductClarityService,
              private sessionService : SessionService,
              private unitservice : UnitService,
              private locationservice : PrmLookupService,
              private vendorservice : VendorService,
              private productservice : ProductService,
              private toastr : ToastrService) { }

              @ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;

  inquery : any = {};
  dimension : any = {};
  vendor : any = [];
  kadar : any = [];
  warna : any = [];
  jenis : any = [];
  lokasi : any = [];
  klarity : any = [];
  unit : any = [];
  warnaberlian : any = [];
  showUnit : Boolean = false;

  x : number = 0;
  y : number = 0;
  z : number = 0;

  outputdata : any[] = [];
  Tipe = Object.values(TipeStock);
  Flag = Object.values(FlagProduct);
  LoadingSearch : ClrLoadingState = ClrLoadingState.DEFAULT;
  ErrorPage : Boolean = false;
  LoadingPage : ClrLoadingState = ClrLoadingState.DEFAULT;

  ngOnInit(): void {
    this.LoadData();
  }

  async LoadData(){
    this.LoadVendor();
    this.LoadKadar();
    this.LoadJenis();
    this.LoadWarna();
    this.LoadWarnaBerlian();
    this.LocationProduct();
    this.LoadUnit();
    this.LoadClarity();
  }

  async LoadJenis(){
    // let params = "?product-category.code=c03";
    let data = await this.productjenisservice.list("?").toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.jenis = data;
  }

  async LoadKadar(){
    let data = await this.productpurityservice.list("?").toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.kadar = data;
  }

  async LoadWarna(){
    let data = await this.productgoldservice.list("?").toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.warna = data;
  }

  async LoadWarnaBerlian(){
    let data = await this.productdiamondservice.list("?").toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.warnaberlian = data;
  }

  async LoadClarity(){
    let data = await this.productclarityservice.list("?").toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.klarity = data;
  }

  async LoadVendor(){
    let params = "?product-category.code=c03";
    let data = await this.vendorservice.list(params).toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.vendor = data;
  }

  async LocationProduct(){
    let maping = await this.locationservice.list("?code=location-product").toPromise();
    if(maping==false){
      this.ErrorPage = true;
      return;
    }
    this.lokasi = maping.map(datalokasi => datalokasi.value);
  }

  async LoadUnit(){
    let cekUnit = this.sessionService.getUser().unit.code;
    if(cekUnit=="00005"){
    let data = await this.unitservice.list("?").toPromise();
    if(data==false){
      this.toastr.info("Data unit tidak ditemukan","Informasi");
      return;
    }
    let output = data;
    this.unit = output.slice();

    let userUnitCode = this.sessionService.getUser().unit.code;
        for (let index = 0; index < this.unit.length; index++) {
          const element = this.unit[index];
          if(element.code == userUnitCode)
            this.unit.splice(index, 1);
        }
    this.showUnit = true;
    }
  }

  dimensiX(){
    this.x;
    this.x = this.inquery.x;
    if(!this.inquery.x){
      this.x = 0;
    }
  }

  dimensiY(){
    this.y;
    this.y = this.inquery.y;
    if(!this.inquery.y){
      this.y = 0;
    }
  }

  dimensiZ(){
    this.z;
    this.z = this.inquery.z;
    if(!this.inquery.z){
      this.z = 0;
    }
  }

  async Search(){
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();
    this.LoadingSearch = ClrLoadingState.LOADING;
    let params = "?product-category.code=c03&unit.code="+this.sessionService.getUser().unit.code+"&";

    this.x = this.inquery["x"];
    this.y = this.inquery["y"];
    this.z = this.inquery["z"];

    // if(this.dimension["x"]!=="" || this.dimension["y"]!=="" || this.dimension["z"]!==""){
    //   this.toastr.warning("Mohon isi dengan 0 jika salah satu dimensi batu kosong","Peringatan");
    //   this.LoadingSearch = ClrLoadingState.ERROR;
    //   this.spinner.Close();
    //   return;
    // }

    // this.inquery["dimensi_product"] = x + "x" + y + "x" + z;


    // if(this.sessionService.getUser().unit.code!="00005"){
    //   params += "unit.code="+this.sessionService.getUser().unit.code+"&";
    // }

    if(this.inquery.x == undefined || this.inquery.y == undefined || this.inquery.z == undefined){
      // params += "product-stone-dimension="+x+"x"+y+"x"+z+"&";
    }else if(this.inquery.x != "" || this.inquery.y != "" || this.inquery.z != ""){
      params += "product-stone-dimension="+this.x+"x"+this.y+"x"+this.z+"&";
    }else if(this.inquery.x == "0" && this.inquery.y == "0" && this.inquery.z == "0"){
      params += "product-stone-dimension=0x0x0";
    }
    
    for(let key in this.inquery){
      if(this.inquery[key]==null)continue;
      switch(key){

        case "id" :
          params += "_id="+this.inquery[key]+"&";
          break;

        case "code" :
          params += "code="+this.inquery[key]+"&";
          break;

        case "nopo" :
          params += "no_po="+this.inquery[key]+"&";
          break;

        case "vendors" :
          params += "vendor.code="+this.inquery[key].code+"&";
          break;

        case "kadars" :
          params += "product-purity.code="+this.inquery[key].code+"&";
          break;

        case "warnas" :
          params += "product-gold-color.code="+this.inquery[key].code+"&";
          break;

        case "jenis" :
          params += "product-jenis.code="+this.inquery[key].code+"&";
          break;

        case "location" :
          params += "location="+this.inquery[key].code+"&";
          break;

        case "unit" :
          params += "unit.code="+this.inquery[key].code+"&";
          break;

        case "tipe_stock" :
          params += "tipe_stock="+this.inquery[key].code+"&";
          break;

        case "product_stone" : 
          params += "product-stone="+this.inquery[key]+"&";
          break;

        case "product_stone_dimension" : 
          params += "product-stone-dimension="+this.inquery[key]+"&";
          break;

        case "product_carat" :
          params += "product-carat="+this.inquery[key]+"&";
          break;

        case "hpp_batu" :
          params += "hpp_batu="+this.inquery[key]+"&hpp_batu_encoded=double&";
          break;

        case "hpp_inisiasi" :
          params += "hpp_inisiasi="+this.inquery[key]+"&hpp_inisiasi_encoded=int&";
          break;

        case "hpp_berlian" :
          params += "hpp_berlian="+this.inquery[key]+"&hpp_berlian_encoded=double&";
          break;

        case "hpp_berlian_inisiasi" : 
          params += "hpp_berlian_inisiasi="+this.inquery[key]+"&hpp_berlian_inisiasi_encoded=double&";
          break;

        case "hpp_batu_inisiasi" : 
          params += "hpp_batu_inisiasi="+this.inquery[key]+"&hpp_batu_inisiasi_encoded=double&";
          break;

        case "product_stone_color" :
          params += "product-stone-color="+this.inquery[key]+"&";
          break;

        case "product_diamond_color" :
          params += "product-diamond-color="+this.inquery[key]+"&";
          break;

        case "product_cut" :
          params += "product-cut="+this.inquery[key]+"&";
          break;

        case "jumlah_butir" :
          params += "jumlah_butir="+this.inquery[key]+"&";
          break;

        // case "product_stone_carat" :
        //   params += "product-stone-carat="+this.inquery[key]+"&";
        //   break;

        case "gram_tukar" :
          params += "gram_tukar="+this.inquery[key]+"&gram_tukar_encoded=double&";
          break;

        case "total_berat" :
          params += "total_berat="+parseFloat(this.inquery[key])+"&total_berat_encoded=double&";
          break;

        case "product_clarity" :
          params += "product-clarity="+this.inquery[key].code.toUpperCase()+"&";
          break;

        case "flag" : 
          params += "flag="+this.inquery[key].code+"&";
          break;

        // default :
        // params += key +="="+this.inquery[key]+"&";
        // params += "";
        // break;
        }
    }
    let data = await this.productservice.list(params).toPromise();
    if(data==false){
      this.spinner.Close();
      this.toastr.info("Data tidak ditemukan","Informasi");
      this.LoadingSearch = ClrLoadingState.ERROR;
      this.Reset();
      this.outputdata = [];
      return;
    }
    this.toastr.success("Data ditemukan "+data.length,"Sukses");
    this.spinner.Close();
    this.outputdata = data;
    this.LoadingSearch = ClrLoadingState.SUCCESS;
    this.Reset();
  }

  Reset(){
    this.inquery = {};
    this.dimension = {};
    this.x = 0;
    this.y = 0;
    this.z = 0;
  }

  Refresh(){
    this.Reset();
    this.outputdata = [];
    this.ErrorPage = false;
    this.LoadingPage = ClrLoadingState.SUCCESS;
    this.LoadData();
  }

}
