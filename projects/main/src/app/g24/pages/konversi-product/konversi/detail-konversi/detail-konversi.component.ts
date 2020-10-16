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
  selector: 'detail-konversi',
  templateUrl: './detail-konversi.component.html',
  styleUrls: ['./detail-konversi.component.scss']
})
export class DetailKonversiComponent implements OnInit {

  constructor(private produccategory : ProductCategoryService,
    private vendorservice : VendorService,
    private productservice : ProductService,
    private konversiservice : KonversiService,
    private session : SessionService,
    private datetimeservice : ServerDateTimeService,
    private toastr : ToastrService) { }

    
    @ViewChild('spinner', {static: false}) spinner : LoadingSpinnerComponent;

    konversi : any = {};
  tambah : any = {};
  quick : number = 0;

  produkItem : any = [];
  Items : any = [];

  
  dataoutput : any = {};
  datapush : any = [];
  getdataKonversiItems : any = [];

  date : String = "";
  time : String = "";
  modalview : Boolean = false;
  opened : Boolean = false;
  Object = Object;

  getdata : any = [];

  selected_data : any = {}; 
  multiple_select : any[] = [];
  produk : any = [];
  datas : any = [];
  vendors : any = [];
  productCategory : any = [];

  ngOnInit(): void {
    this.LoadAttribut();
  }

  async LoadAttribut(){
    this.LoadKategori();
    this.LoadDate();
  }

  async LoadKategori(){
    this.productCategory = await this.produccategory.list("?").toPromise();
  }

  async LoadVendor(){

  }

  async LoadDate(){
    let data = await this.datetimeservice.task("").toPromise();
    let split = data.split("T");
    this.date = split[0];
    this.time = split[1].split("Z")[0];
    console.log(this.date);
  }

  async change_vendor(){
    this.vendors = [];
    this.produk = [];
    this.Items = [];
    let params = "?product-category.code="+this.tambah["kategori"].code;
    this.vendors = await this.vendorservice.list(params).toPromise();
  }

  async change_data(){
    this.produk = [];
    this.Items = [];
  }

  Tambah(){
    this.opened = true;
    this.Reset();
  }

  Lihat(){
    this.spinner.Open();
    if(!this.selected_data){
      this.toastr.warning("Data belum dipilih","Peringatan");
      this.spinner.Close();
      return;
    }else if(Object.keys(this.selected_data).length==0){
      this.toastr.warning("Data belum dipilih","Peringatan");
      this.spinner.Close();
      return;
    }

    this.datapush.push(this.selected_data);
    for(let i = 0; i < this.datapush.length; i++){
      this.dataoutput = this.datapush[i];
      this.getdataKonversiItems = this.datapush[i].items;
      console.log(this.dataoutput.pengajuan_by.nama.toUpperCase());
    }
    this.modalview = true;
    this.spinner.Close();
  }

  async searchProduk(){
    let params = "?flag=stock&location=pusat&";
    if(!this.tambah["kategori"]){
      this.toastr.warning("Produk Kategori belum dipilih","Peringatan");
      return;
    }else if(!this.tambah["vendor"]){
      this.toastr.warning("Vendor belum dipilih","Peringatan");
      return;
    }
    for(let key in this.tambah){
      if(this.tambah[key]==null)continue;
      switch(key){
        case "kategori" : 
          params += "product-category.code="+this.tambah[key].code+"&";
          break;

        case "vendor" : 
          params += "vendor.code="+this.tambah[key].code+"&";
          break;

        // default : 
        //   params += key +="="+this.tambah[key]+"&";
        //   break;
      }
    }
    let data = await this.productservice.list(params).toPromise();
    if(data==false){
      this.toastr.info("Data tidak ditemukan","Informasi");
      return;
    }
    this.produk = data;
    console.log(this.produk);
  }

  async searchKonversi(){
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();
    let params = "?";
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

  tambahItem(){
    console.log(this.multiple_select);
    console.log("Jumlah",this.multiple_select.length);
    if(this.multiple_select.length == 0){
      this.toastr.warning("Data item belum dipilih","Peringatan");
      return;
    }

    this.produkItem.push(this.multiple_select);
    for(let i = 0; i < this.produkItem.length; i++){
        this.Items = this.produkItem[i];
    }
  }

  Reset(){
    this.tambah = {};
    this.produk = [];
    this.Items = [];
    this.quick = 0;
    this.vendors = [];
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

  pick(){
    this.multiple_select = [];
    if(this.quick > 0 && this.quick <= this.produk.length){
    for(let y = 0; y < this.quick; y++){
      this.multiple_select.push(this.produk[y]);
      this.Items = [];
      }
    }else{
      this.toastr.info("Item yang dipilih tidak sesuai");
      this.quick = 0;
    }
  }

  async doSave(){
    this.spinner.SetSpinnerText("Mohon Tunggu...");
    this.spinner.Open();
    if(this.Items.length == 0){
      this.spinner.Close();
      this.toastr.warning("Items belum ditambahkan","Peringatan");
      return;
    }else if(!this.tambah["kategori"]||!this.tambah["vendor"]){
      this.spinner.Close();
      this.toastr.warning("Produk kategori atau vendor belum dipilih","Peringatan");
      return;
    }else if(!this.tambah["keterangan"]){
      this.spinner.Close();
      this.toastr.warning("Keterangan belum di isi","Peringatan");
      return;
    }

    let data = {
      create_by : this.session.getUser().unit,
      create_date : this.date,
      create_time : this.time,
      update_by : {},
      update_date : "",
      update_time : "",
      pengajuan_by : this.session.getUser().unit,
      tgl_pengajuan : this.date,
      pengajuan_keterangan : this.tambah["keterangan"],
      approve_by : {},
      tgl_approve : "",
      approve_keterangan : "",
      "product-category" : this.tambah["kategori"],
      vendor : this.tambah["vendor"],
      jumlah_barang : this.Items.length,
      items : [],
      status_konversi : Konversi.PENGAJUAN.code
    }

    for(let i = 0; i < this.Items.length; i++){
      data.items.push(this.Items[i]);
    }

    let hash = DataTypeUtil.Encode(data);
    let sendData = await this.konversiservice.add(hash).toPromise();
      if(sendData==false){
        this.toastr.error("Data gagal di ajukan ke konversi","Error");
        this.spinner.Close();
        return;
      }
        this.toastr.success("Data berhasil di ajukan ke konversi","Sukses");
        this.spinner.Close();
        this.opened = false;

    for(let i = 0; i < this.Items.length; i++){
      console.log("Id Produk",this.Items[i]._id);
      let updateProduk = {
        _id : this.Items[i]._id,
        flag : FlagProductKonversi.APPROVE_KONVERSI.code
      }

     let update = await this.productservice.update(updateProduk).toPromise();
     if(update==false){
       this.toastr.error("Data flag produk gagal di update","Error");
       this.spinner.Close();
       return;
     }
    }
    this.spinner.Close();
    this.toastr.success("Data flag product berhasil di update","Sukses");
  }

}
