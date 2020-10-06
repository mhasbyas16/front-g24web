import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../../services/vendor.service';
import { ClrLoadingState } from '@clr/angular';
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { ProductGoldColorService } from '../../../services/product/product-gold-color.service';
import { ProductPurityService } from '../../../services/product/product-purity.service';
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { ProductService } from '../../../services/product/product.service';
import { TipeStock } from '../../../lib/enum/flag-product';
import { ToastrService } from 'ngx-toastr';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';

@Component({
  selector: 'detail-inquery-product-perhiasan',
  templateUrl: './detail-inquery-product-perhiasan.component.html',
  styleUrls: ['./detail-inquery-product-perhiasan.component.scss']
})

@DContent(DetailInqueryProductPerhiasanComponent.key)
export class DetailInqueryProductPerhiasanComponent implements OnInit {
static key = EMenuID.DETAIL_INQUERY_PERHIASAN;

  constructor(private vendorservice : VendorService,
              private productcategpryservice : ProductCategoryService,
              private productgoldcolorservice : ProductGoldColorService,
              private productpurityservice : ProductPurityService,
              private productjenisservice : ProductJenisService,
              private productservice : ProductService,
              private toastr : ToastrService) { }

  inquery : any = {};
  vendor : any = [];
  warna : any = [];
  kadar : any = [];
  jenis : any = [];
  Tipe = Object.values(TipeStock);
  outputdata : any[] = [];

  ErrorPage : Boolean = false;

  LoadingSearch : ClrLoadingState = ClrLoadingState.DEFAULT;
  LoadingPage : ClrLoadingState = ClrLoadingState.DEFAULT;

  ngOnInit(): void {
    this.LoadDataAttribut();
    this.Reset();
  }

  async LoadDataAttribut(){
    this.LoadKadar();
    this.LoadWarna();
    this.LoadVendor();
    this.LoadJenis();
  }

  async LoadVendor(){
    let params = "?";

    params += "product-category.code=c00";
    let data = await this.vendorservice.list(params).toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.vendor = data;
    console.log(name);
  }

  async LoadWarna(){
      let data = await this.productgoldcolorservice.list("?").toPromise();
      if(data==false){
        this.ErrorPage = true;
        return;
      }
      this.warna = data;
  }

  async LoadKadar(){
    let data = await this.productpurityservice.list("?").toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.kadar = data;
  }

  async LoadJenis(){
    let data = await this.productjenisservice.list("?").toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.jenis = data;
  }

  async Search(){
    this.LoadingSearch = ClrLoadingState.LOADING;
    let params = "?product-category.code=c00&";
    for(let key in this.inquery){
      if(this.inquery[key]==null)continue;

      switch(key){
        case "nopo" :
          params += 'no_po='+this.inquery[key]+"&";
          break;

          case "vendors" : 
          params += 'vendor.code='+this.inquery[key].code+"&";
          break;

          case "kadars" :
            params += "product-purity.code="+this.inquery[key].code+"&";
            break;

          case "warnas" : 
          params += "product-gold-color.name="+this.inquery[key].name+"&";
          break;

          case "jeniss" : 
          params += "product-jenis.code="+this.inquery[key].code+"&";
          break;

          case "berat" :
            params += "berat="+this.inquery[key]+"&";
            break;

          case "tipe_stock" :
            params += "tipe_stock="+this.inquery[key].code+"&";
            break;

          default:
            params += key +="="+this.inquery[key]+"&";
            break;
      }
      console.log("Hasil Pencarian "+params);
    }
    let data = await this.productservice.list(params).toPromise();
    if(data==false){
      this.toastr.info("Data tidak ditemukan","Informasi");
      this.LoadingSearch = ClrLoadingState.ERROR;
      this.Reset();
      this.outputdata = [];
      return;
    }
    this.outputdata = data;
    this.toastr.success("Data di temukan "+data.length, "Sukses");
    this.LoadingSearch = ClrLoadingState.SUCCESS;
    this.Reset();
  }

  async Reset(){
    this.inquery = {};
  }

  async Refresh(){
    this.ErrorPage = false;
    this.LoadingPage = ClrLoadingState.SUCCESS;
    this.Reset();
    this.outputdata = [];
    this.LoadDataAttribut();
  }

}
