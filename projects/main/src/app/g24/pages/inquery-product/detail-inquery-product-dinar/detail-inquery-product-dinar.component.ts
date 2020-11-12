import { Component, OnInit, ViewChild } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { VendorService } from '../../../services/vendor.service';
import { ProductService } from '../../../services/product/product.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { PrmLookupService } from '../../../services/location/prm-lookup.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { UnitService } from '../../../services/system/unit.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingSpinnerComponent } from '../../../../g24/nav/modal/loading-spinner/loading-spinner.component';
import { FlagProduct, TipeStock } from '../../../lib/enum/flag-product';


@Component({
  selector: 'detail-inquery-product-dinar',
  templateUrl: './detail-inquery-product-dinar.component.html',
  styleUrls: ['./detail-inquery-product-dinar.component.scss']
})
export class DetailInqueryProductDinarComponent implements OnInit {

  constructor(private vendorservice : VendorService,
              private toastr : ToastrService,
              private denomservice : ProductDenomService,
              private sessionService : SessionService,
              private unitservice : UnitService,
              private locationservice : PrmLookupService,
              private productservice : ProductService) { }

              @ViewChild('spinner',{static:false}) spinner : LoadingSpinnerComponent;

  inquery : any = {};
  vendor : any = [];
  denom : any = [];
  outputdata : any = [];
  lokasi : any = [];
  unit : any = [];
  showUnit : Boolean = false;

  Tipe = Object.values(TipeStock);
  Flag = Object.values(FlagProduct);
  ErrorPage : Boolean = false;
  LoadingSearch : ClrLoadingState = ClrLoadingState.DEFAULT;
  LoadingPage : ClrLoadingState = ClrLoadingState.DEFAULT;

  ngOnInit(): void {
    this.LoadData();
  }

  async LoadData(){
    this.LoadVendor();
    this.LoadDenom();
    this.LoadUnit();
    this.LocationProduct();
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
      this.ErrorPage = true;
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

  async Search(){
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();
    this.LoadingSearch = ClrLoadingState.LOADING;
    let params = "?product-category.code=c06&";

    if(this.sessionService.getUser().unit.code!="00005"){
      params += "unit.code="+this.sessionService.getUser().unit.code+"&";
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
          params += 'no_po='+this.inquery[key]+"&";
          break;

        case "vendor" :
          params += "vendor.code="+this.inquery[key].code+"&";
          break;

        case "denom" :
          params += "product-denom.code="+this.inquery[key].code+"&";
          break;

          case "unit" : 
          params += "unit.code="+this.inquery[key].code+"&";
          break;

          case "location" :
            params += "location="+this.inquery[key].code+"&";
            break;

        case "tipe_stock" : 
          params += "tipe_stock="+this.inquery[key].code+"&";
          break;

        case "flag" :
          params += "flag="+this.inquery[key].code+"&";
          break;

        default : 
        params += key +="="+this.inquery[key]+"&";
        break;
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
    this.spinner.Close();
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
