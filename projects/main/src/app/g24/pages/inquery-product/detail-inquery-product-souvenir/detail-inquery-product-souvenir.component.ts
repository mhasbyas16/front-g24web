import { Component, OnInit, ViewChild } from '@angular/core';
import { VendorService } from '../../../services/vendor.service';
import { ProductService } from '../../../services/product/product.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { ProductSeriesService } from '../../../services/product/product-series.service';
import { PrmLookupService } from '../../../services/location/prm-lookup.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { UnitService } from '../../../services/system/unit.service';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';
import { ClrLoadingState } from '@clr/angular';
import { TipeStock } from '../../../lib/enum/flag-product';
import { ToastrService } from 'ngx-toastr';
import { viewClassName } from '@angular/compiler';

@Component({
  selector: 'detail-inquery-product-souvenir',
  templateUrl: './detail-inquery-product-souvenir.component.html',
  styleUrls: ['./detail-inquery-product-souvenir.component.scss']
})
export class DetailInqueryProductSouvenirComponent implements OnInit {

  constructor(private vendorservice : VendorService,
              private productservice : ProductService,
              private productdenomservice : ProductDenomService,
              private productseriesService : ProductSeriesService,
              private sessionService : SessionService,
              private unitservice : UnitService,
              private locationservice : PrmLookupService,
              private toastr : ToastrService) { }

              @ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;

  inquery : any = {};
  vendor : any = [];
  series : any = [];
  denom : any = [];
  lokasi : any = [];
  unit : any = [];
  showUnit : Boolean = false;

  outputdata : any[] = [];
  Tipe = Object.values(TipeStock);
  ErrorPage : Boolean = false;
  LoadingSearch : ClrLoadingState = ClrLoadingState.DEFAULT;
  LoadPage : ClrLoadingState = ClrLoadingState.DEFAULT;

  ngOnInit(): void {
    this.LoadData();
  }

  async LoadData(){
    this.LoadVendor();
    this.LoadSeries();
    this.LoadDenom();
    this.LocationProduct();
    this.LoadUnit();
  }

  async LoadVendor(){
    let params = "?product-category.code=c02"
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


  async LoadDenom(){
    let params = "?product-category.code=c02";
    let data = await this.productdenomservice.list(params).toPromise();
    if(data==false){
      this.ErrorPage = true;
      return;
    }
    this.denom = data;
  }

  async Search(){
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();
    this.LoadingSearch = ClrLoadingState.LOADING;
    let params = "?product-category.code=c02&";
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

          case "location" :
            params += "location="+this.inquery[key].code+"&";
            break;

          case "unit" :
            params += "unit.code="+this.inquery[key].code+"&";
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
      this.spinner.Close();
      this.toastr.info("Data tidak di temukan","Informasi");
      this.LoadingSearch = ClrLoadingState.ERROR;
      this.outputdata = [];
      this.Reset();
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
  }

  Refresh(){
    this.ErrorPage = false;
    this.LoadPage = ClrLoadingState.SUCCESS;
    this.Reset();
    this.outputdata = [];
    this.LoadData();
  }

}
