import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCategoryService } from '../../../../services/product/product-category.service';
import { VendorService } from '../../../../services/vendor.service';
import { ProductService } from '../../../../services/product/product.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ServerDateTimeService } from '../../../../services/system/server-date-time.service';
import { KonversiService } from '../../../../services/konversi/konversi.service';
import { LoadingSpinnerComponent } from '../../../../../g24/nav/modal/loading-spinner/loading-spinner.component';
import { DataTypeUtil } from '../../../../lib/helper/data-type-util';
import { ToastrService } from 'ngx-toastr';
import { FlagProductKonversi, Konversi } from '../../../../lib/enum/konversi';
import { StringHelper } from '../../../../lib/helper/string-helper';

@Component({
  selector: 'detail-approval-konversi',
  templateUrl: './detail-approval-konversi.component.html',
  styleUrls: ['./detail-approval-konversi.component.scss']
})
export class DetailApprovalKonversiComponent implements OnInit {

  constructor(private produccategory : ProductCategoryService,
    private vendorservice : VendorService,
    private productservice : ProductService,
    private konversiservice : KonversiService,
    private session : SessionService,
    private datetimeservice : ServerDateTimeService,
    private toastr : ToastrService) { }


    @ViewChild('spinner', {static: false}) spinner : LoadingSpinnerComponent;

  konversi : any = {};
  datas : any = [];
  selected_data : any = {};
  getdataKonversiItems : any = [];

  dataoutput : any = {};

  date : String = "";
  time : String = "";

  Object = Object;
  isOpened : Boolean = false;

  datapushApprove : any = [];
  
  opened : Boolean = false;
  view : Boolean = false;

  ngOnInit(): void {
    this.LoadDate();
  }

  public set IsOpened(open : Boolean){
    this.isOpened = open;
  }

  public get IsOpened(){
    return this.isOpened;
  }

   Close(){
    this.spinner.Close();
    this.isOpened = false;
  }

  async searchKonversi(){
    let params = "?";
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();
    for(let key in this.konversi){
      if(this.konversi[key]==null)continue;
      switch(key){
        case "id" :
          params += "_id="+this.konversi[key]+"&";
          break;

        case "tanggal" :
          params += "tgl_pengajuan="+StringHelper.StandardFormatDate('/',this.konversi[key],'MM/dd/yyyy')+"&";
          break;

        default :
          params += key += "="+this.konversi[key]+"&";
          break;
      }
    }
    let data = await this.konversiservice.list(params).toPromise();
    if(data==false){
      this.toastr.info("Data tidak ditemukan","Informasi");
      this.datas = [];
      this.spinner.Close();
      return;
    }
    this.spinner.Close();
    this.datas = data;
    this.toastr.success("Data ditemukan "+this.datas.length,"Sukses");
  }

  async LoadDate(){
    let tgl = await this.datetimeservice.task("").toPromise();
    let split = tgl.split("T");
    this.date = split[0];
    this.time = split[1].split("Z")[0];
    console.log(this.date);
  }

  onApprove(){
    if(!this.selected_data){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }else if(Object.keys(this.selected_data).length==0){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }

    this.datapushApprove.push(this.selected_data);
    for(let i = 0; i < this.datapushApprove.length; i++){
      this.spinner.Close();
      this.dataoutput = this.datapushApprove[i];
      this.getdataKonversiItems = this.datapushApprove[i].items;
      console.log(this.dataoutput.pengajuan_by.nama.toUpperCase());
      this.opened = true;
    }
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

      case 'baku_tukar':
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

        case 'no_po':
          name = "No PO";
          break;

        case 'location':
          name = "Lokasi";
          break;

        case 'margin' :
          name = "Margin";
          break;

        case 'hargabaku' :
          name = "Harga Baku"

        case 'ongkos':
          name = "Ongkos";
          break;

        case 'price':
          name = "Price";
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

      case "no_item_po":
        return false;
      break;

      case "no_index_products":
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
			
      case "status":
        return false;
        break;

      default:
        return true;
    }
  }

  Lihat(){
    if(!this.selected_data){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }else if(Object.keys(this.selected_data).length==0){
      this.toastr.warning("Data belum dipilih","Peringatan");
      return;
    }

    this.datapushApprove.push(this.selected_data);
    for(let i = 0; i < this.datapushApprove.length; i++){
      this.dataoutput = this.datapushApprove[i];
      this.getdataKonversiItems = this.datapushApprove[i].items;
      console.log(this.dataoutput.pengajuan_by.nama.toUpperCase());
    }
    this.view = true;
  }

  async ApproveData(){
    console.log(this.dataoutput._id);
    let sendData;

    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();

    let data = {
      _id : this.dataoutput._id,
      update_date : this.date,
      update_by : this.session.getUser().unit,
      update_time : this.time,
      approve_by : this.session.getUser().unit,
      tgl_approve : this.date,
      status_konversi : Konversi.APPROVAL.code,
      approve_keterangan : "Berhasil dikonversi"
    }

    let hash = DataTypeUtil.Encode(data);
    // let updateKonversi = await this.konversiservice.approve(hash).toPromise(); 404
    let updateKonversi = await this.konversiservice.update(hash).toPromise();
    if(updateKonversi==false){
      let msg = this.konversiservice.message();
      this.toastr.error("Data gagal di aproved "+msg,"Error");
      this.spinner.Close();
      return;
    }

    for(let i = 0; i < this.getdataKonversiItems.length; i++){
      let data = this.getdataKonversiItems[i];
      sendData = {
        _id : data._id,
        flag : FlagProductKonversi.KONVERSI.code
      }
      console.log(data._id);
      let hash = DataTypeUtil.Encode(sendData);
      let updateKonversi = await this.productservice.update(hash).toPromise();
      if(updateKonversi==false){
        this.toastr.error("Data flag konversi gagal diupdate","Error");
        this.spinner.Close();
        return;
      }
    }

    this.spinner.Close();
    this.toastr.success("Data berhasil di approval","Sukses");
    this.opened = false;
    this.Reset();


  }

  async RefuseData(){

    this.spinner.SetSpinnerText("Mohon Tunggu ...");
    this.spinner.Open();
    let sendData;

    let data = {
      _id : this.dataoutput._id,
      update_date : this.date,
      update_by : this.session.getUser().unit,
      update_time : this.time,
      approve_by : this.session.getUser().unit,
      tgl_approve : this.date,
      status_konversi : Konversi.TOLAK.code,
      approve_keterangan : "Tidak dilanjutkan ke konversi"
    }

    let hash = DataTypeUtil.Encode(data);
    let updateKonversi = await this.konversiservice.approve(hash).toPromise();
    if(updateKonversi==false){
      this.toastr.error("Data gagal di tolak","Error");
      this.spinner.Close();
      return;
    }

    for(let i = 0; i < this.getdataKonversiItems.length; i++){
      let data = this.getdataKonversiItems[i];
      sendData = {
        _id : data._id,
        flag : FlagProductKonversi.STOCK.code
      }
      console.log(data._id);
      let hash = DataTypeUtil.Encode(sendData);
      let updateKonversi = await this.productservice.update(hash).toPromise();
      if(updateKonversi==false){
        this.toastr.error("Data flag konversi gagal diupdate","Error");
        this.spinner.Close();
        return;
      }
    }

    this.spinner.Close();
    this.toastr.success("Data berhasil di tolak","Sukses");
    this.opened = false;
    this.Reset();

  }

  async Reset(){
    this.konversi = {};
    this.datas = [];
  }
}