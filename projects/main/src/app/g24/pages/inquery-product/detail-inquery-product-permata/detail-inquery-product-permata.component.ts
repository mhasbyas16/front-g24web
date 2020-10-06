import { Component, OnInit } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { ProductService } from '../../../services/product/product.service';
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { ProductPurityService } from '../../../services/product/product-purity.service';
import { ProductGoldColorService } from '../../../services/product/product-gold-color.service';
import { VendorService } from '../../../services/vendor.service';
import { TipeStock } from '../../../lib/enum/flag-product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'detail-inquery-product-permata',
  templateUrl: './detail-inquery-product-permata.component.html',
  styleUrls: ['./detail-inquery-product-permata.component.scss']
})
export class DetailInqueryProductPermataComponent implements OnInit {

  constructor(private productjenisservice : ProductJenisService,
              private productpurityservice : ProductPurityService,
              private productgoldservice : ProductGoldColorService,
              private vendorservice : VendorService,
              private productservice : ProductService,
              private toastr : ToastrService) { }


  inquery : any = {};
  vendor : any = [];
  kadar : any = [];
  warna : any = [];
  jenis : any = [];
  outputdata : any[] = [];
  Tipe = Object.values(TipeStock);
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
  }

  async LoadJenis(){
    let params = "?product-category.code=c03";
    let data = await this.productjenisservice.list(params).toPromise();
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

  async LoadVendor(){
    let params = "?product-category.code=c03";
    let data = await this.vendorservice.list(params).toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.vendor = data;
  }

  async Search(){
    let params = "?product-category.code=c03&";
    this.LoadingSearch = ClrLoadingState.LOADING;
    for(let key in this.inquery){
      if(this.inquery[key]==null)continue;
      switch(key){
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

        case "tipe_stock" :
          params += "tipe_stock="+this.inquery[key]+"&";
          break;

        default :
        params += key +="="+this.inquery[key]+"&";
        break;
        }
    }
    let data = await this.productservice.list(params).toPromise();
    if(data==false){
      this.toastr.info("Data tidak ditemukan","Informasi");
      this.LoadingSearch = ClrLoadingState.ERROR;
      this.Reset();
      this.outputdata = [];
      return;
    }
    this.toastr.success("Data ditemukan "+data.length,"Sukses");
    this.outputdata = data;
    this.LoadingSearch = ClrLoadingState.SUCCESS;
    this.Reset();
  }

  Reset(){
    this.inquery = {};
  }

  Refresh(){
    this.Reset();
    this.outputdata = [];
    this.ErrorPage = false;
    this.LoadingPage = ClrLoadingState.SUCCESS;
    this.LoadData();
  }

}
