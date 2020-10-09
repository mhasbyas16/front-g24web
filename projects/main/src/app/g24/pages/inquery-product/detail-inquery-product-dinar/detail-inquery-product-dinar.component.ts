import { Component, OnInit } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { VendorService } from '../../../services/vendor.service';
import { ProductService } from '../../../services/product/product.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'detail-inquery-product-dinar',
  templateUrl: './detail-inquery-product-dinar.component.html',
  styleUrls: ['./detail-inquery-product-dinar.component.scss']
})
export class DetailInqueryProductDinarComponent implements OnInit {

  constructor(private vendorservice : VendorService,
              private toastr : ToastrService,
              private denomservice : ProductDenomService,
              private productservice : ProductService) { }

  inquery : any = {};
  vendor : any = [];
  denom : any = [];
  outputdata : any = [];
  ErrorPage : Boolean = false;
  LoadingSearch : ClrLoadingState = ClrLoadingState.DEFAULT;
  LoadingPage : ClrLoadingState = ClrLoadingState.DEFAULT;

  ngOnInit(): void {
    this.LoadData();
  }

  async LoadData(){
    this.LoadVendor();
    this.LoadDenom();
  }

  async LoadVendor(){
    let data = await this.vendorservice.list("?product-category.code=c06").toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.vendor = data;
  }

  async LoadDenom(){
    let data = await this.denomservice.list("?product-category.code=c06").toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.denom = data;
  }

  async Search(){
    this.LoadingSearch = ClrLoadingState.LOADING;
    let params = "?product-category.code=c06&";
    for(let key in this.inquery){
      if(this.inquery[key]==null)continue;
      switch(key){
        case "code" :
          params += "code="+this.inquery[key]+"&";
          break;

        case "vendor" :
          params += "vendor.code="+this.inquery[key].code+"&";
          break;

        case "denom" :
          params += "product-denom.code="+this.inquery[key].code+"&";
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
    this.LoadingSearch = ClrLoadingState.SUCCESS;
    this.toastr.success("Data ditemukan "+data.length);
    this.Reset();
    this.outputdata = data;
  }

  Reset(){
    this.inquery = {}
  }

  Refresh(){
    this.Reset();
    this.outputdata = [];
    this.LoadingPage = ClrLoadingState.SUCCESS;
    this.ErrorPage = false;
    this.LoadData(); 
  }



}
