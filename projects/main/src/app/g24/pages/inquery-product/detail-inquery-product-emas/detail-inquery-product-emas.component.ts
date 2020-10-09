import { Component, OnInit } from '@angular/core';
import { VendorService } from '../../../services/vendor.service';
import { ProductService } from '../../../services/product/product.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { ProductSeriesService } from '../../../services/product/product-series.service';
import { ClrLoadingState } from '@clr/angular';
import { TipeStock } from '../../../lib/enum/flag-product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'detail-inquery-product-emas',
  templateUrl: './detail-inquery-product-emas.component.html',
  styleUrls: ['./detail-inquery-product-emas.component.scss']
})
export class DetailInqueryProductEmasComponent implements OnInit {

  constructor(private vendorservice : VendorService,
             private productservice : ProductService,
             private productdenomservice : ProductDenomService,
             private productseriesService : ProductSeriesService,
             private toastr : ToastrService) { }

  inquery : any = {};
  vendor : any = [];
  series : any = [];
  denom : any = [];
  outputdata : any[] = [];
  Tipe = Object.values(TipeStock);
  LoadingSearch : ClrLoadingState = ClrLoadingState.DEFAULT;
  LoadingPage : ClrLoadingState = ClrLoadingState.DEFAULT;
  ErrorPage : Boolean = false;

  ngOnInit(): void {
    this.LoadData();
  }

  async LoadData(){
    this.LoadVendor();
    this.LoadSeries();
    this.LoadDenom();
  }

  async LoadVendor(){
    let params = "?product-category.code=c05";
    let data = await this.vendorservice.list(params).toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.vendor = data;
  }

  async LoadSeries(){
    let data = await this.productseriesService.list("?").toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.series = data;
  }

  async LoadDenom(){
    let params = "?product-category.code=c05";
    let data = await this.productdenomservice.list(params).toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.denom = data;
  }

  async Search(){
    this.LoadingSearch = ClrLoadingState.LOADING;
    let params = "?product-category.code=c05&";
    for(let key in this.inquery){
      if(this.inquery[key]==null)continue;
        switch(key){
          case "nopo" :
            params += "no_po="+this.inquery[key]+"&";
            break;

          case "vendor" : 
          params += "vendor.code="+this.inquery[key].code+"&";
          break;

          case "series" : 
          params += "product-series.code="+this.inquery[key].code+"&";
          break;

          case "denom" :
          params += "product-denom.code="+this.inquery[key].code+"&";
          break;

          case "tipe_stock" : 
          params += "tipe_stock="+this.inquery[key].code+"&";
          break;

          default:
            params += key +="="+this.inquery[key]+"&";
            break;
        }
    }
    let data = await this.productservice.list(params).toPromise();
    if(data==false){
      this.toastr.info("Data tidak di temukan","Informasi");
      this.LoadingSearch = ClrLoadingState.ERROR;
      this.outputdata = [];
      this.Reset();
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
