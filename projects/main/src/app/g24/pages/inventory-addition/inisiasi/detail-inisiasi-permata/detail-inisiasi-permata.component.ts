import { Component, OnInit } from '@angular/core';
import { ServerDateTimeService } from '../../../../services/system/server-date-time.service';
import { ProductCategoryService } from '../../../../services/product/product-category.service';
import { ProductJenisService } from '../../../../services/product/product-jenis.service';
import { ProductGoldColorService } from '../../../../services/product/product-gold-color.service';
import { ProductPurityService } from '../../../../services/product/product-purity.service';
import { PrmMarginService } from '../../../../services/parameter/prm-margin.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { VendorService } from '../../../../services/vendor.service';

@Component({
  selector: 'detail-inisiasi-permata',
  templateUrl: './detail-inisiasi-permata.component.html',
  styleUrls: ['./detail-inisiasi-permata.component.scss']
})
export class DetailInisiasiPermataComponent implements OnInit {

  

  constructor
  (
    private dateService : ServerDateTimeService,
    private toastr : ToastrService,

    private productCategoryService : ProductCategoryService,
    private vendorService : VendorService,
    private jenisService : ProductJenisService,
    private gColorService : ProductGoldColorService,
    private kadarService : ProductPurityService,
    private prmJualService : PrmJualService,
    private marginService : PrmMarginService,
  ) { }

  date : string = "";
  time : string = "";

  input : any = this.defaultInput();

  defaultInput() {
    return {
      nomor_nota : null, tgl_inisiasi : this.date,  id_harga : "", id_margin : "",
      create_date : this.date,
      'product-category' : null, vendor : null,
      'product-purity' : null, 'product-jenis' : null,
      'product-gold-color' : null,
      berat_emas : 0, hpp_emas : 0,
      // jenis_batu : "", warna_batu : "",
      // carat_batu : 0, dimensi_batu : "0x0x0",
      // hpp_batu : 0, margin_batu : 0,
      // warna_berlian : "", clarity_berlian : "",
      // cutting_berlian : "",
      // total_butir_berlian : 0, total_carat_berlian : 0,
      // hpp_berlian : 0, margin_berlian : 0,
      // ongkos : 0, berat : 0
    };
  }

  products : any[] = [];
  jeniss : any[] = [];
  kadars : any[] = [];
  warnas : any[] = [];
  vendors : any[] = [];
  latestMargin : any[] = [];
  margin : number = 0;
  hbeli : number = 0;

  errorHappened : boolean = false;


  async ngOnInit() {
    await this.LoadAllParameter();

    await this.LoadDate();
    this.input = this.defaultInput();
  }
  
  async LoadAllParameter()
  {
    this.LoadProductCategory();
    this.LoadVendor();
    this.LoadJenis();
    this.LoadKadar();
    this.LoadGWarna();
    this.LoadParameterJual();
    this.LoadMargin();
    // this.LoadShape();
    
    // this.onProductChanged();
  }

  async LoadVendor()
  {
    while(this.products.length > 0)
    {
      this.vendors.pop();
    }
    let vendors = await this.vendorService.list("?product-category.code=c03").toPromise();
    if(vendors == false)
    {
      this.errorHappened = true;
      let msg = this.vendorService.message();
      this.toastr.error("Gagal Loading 'Vendor'. Harap Refresh halaman, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }

    console.log(vendors);

    for(let i = 0; i < vendors.length; i++)
    {
      this.vendors.push(vendors[i]);
    }
    this.vendors.sort((a, b) => ('' + a.name).localeCompare(b.name));
  }
  
  async LoadParameterJual()
  {
    let hbeli = await this.prmJualService.list("?_rows=1&flag=approved&product-category.code=c03").toPromise();
    if(hbeli == false)
    {
      this.errorHappened = true;
      let msg = this.prmJualService.message();
      this.toastr.error("Gagal Loading 'Parameter Harga Beli'. Harap Refresh halaman, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }

    console.log(hbeli);
    if(hbeli.length == 0)
    {
      this.errorHappened = true;
      let msg = this.prmJualService.message();
      this.toastr.error("Parameter Harga Beli tidak ditemukan. error: " + msg);
      return;
    }

    this.hbeli = Number(hbeli[0]);
  }

  async LoadMargin()
  {
    let margins = await this.marginService.list("?_rows=1&flag=approved&product-category.code=c03").toPromise();
    if(margins == false)
    {
      this.errorHappened = true;
      let msg = this.marginService.message();
      this.toastr.error("Gagal Loading 'Margin'. Harap Refresh halaman, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }

    console.log(margins);
    if(margins.length == 0)
    {
      this.errorHappened = true;
      let msg = this.marginService.message();
      this.toastr.error("Margin tidak ditemukan. error: " + msg);
      return;
    }

    this.margin = Number(margins[0]);
  }

  async LoadDate()
  {
    let dt = await this.dateService.task().toPromise();
    if(dt == false)
    {
      this.toastr.error("Gagal load tanggal server.");
      this.errorHappened = true;
      return;
    }

    let dtarr = dt.split("T");
    this.date = dtarr[0];
    this.time = dtarr[1].split("Z")[0];
  }

  async LoadProductCategory()
  {
    while(this.products.length > 0)
    {
      this.products.pop();
    }
    let products = await this.productCategoryService.list("?code=c03").toPromise();
    if(products == false)
    {
      this.errorHappened = true;
      let msg = this.productCategoryService.message();
      this.toastr.error("Gagal Loading 'Jenis Produk'. Harap Refresh halaman, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }

    console.log(products);

    for(let i = 0; i < products.length; i++)
    {
      this.products.push(products[i]);
    }
    this.products.sort((a, b) => ('' + a.name).localeCompare(b.name));
  }

  async LoadJenis()
  {
    let jeniss = await this.jenisService.list("?").toPromise();
    if(jeniss == false)
    {
      this.errorHappened = true;
      let msg = this.jenisService.message();
      this.toastr.error("Gagal Loading 'Jenis Perhiasan'. Harap Refresh halaman, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }

    for(let i = 0; i < jeniss.length; i++)
    {
      this.jeniss.push(jeniss[i]);
    }

    this.jeniss.sort((a,b) => ('' + a.name).localeCompare(b.name));
  }

  async LoadKadar()
  {
    let kadars = await this.kadarService.list("?").toPromise();
    if(kadars == false)
    {
      this.errorHappened = true;
      let msg = this.kadarService.message();
      this.toastr.error("Gagal Loading 'Kadar Perhiasan'. Harap Refresh halaman, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }

    for(let i = 0; i < kadars.length; i++)
    {
      this.kadars.push(kadars[i]);
    }
    this.kadars.sort((a,b) => parseInt(a.name) - parseInt(b.name))
  }

  async LoadGWarna()
  {
    let warnas = await this.gColorService.list("?").toPromise();
    if(warnas == false)
    {
      this.errorHappened = true;
      let msg = this.gColorService.message();
      this.toastr.error("Gagal Loading 'Warna Perhiasan'. Harap Refresh halaman, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }

    for(let i = 0; i < warnas.length; i++)
    {
      this.warnas.push(warnas[i]);
    }
    this.warnas.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }

  // ON EVENTS  
  onProductChanged()
  {
    // this.input['create_date'] = this.date.split("T")[0];

    // for(let i = 0; i < this.products.length; i++)
    // {
    //   let perhiasan = this.products[i];
    //   if(perhiasan.code == "c03")
    //   {
    //     this.input['product-category'] = perhiasan;
    //     break;
    //   }
    // }
  }

  onBeratChanged()
  {
    
  }

  // validation
  validateInput()
  {
    let input = this.input;
    if(input.nomor_nota == "" || input.nomor_nota == null)
    {
      this.toastr.warning("Nomor Nota belum diisi");
      return true;
    }

    if(input.vendor == null)
    {
      this.toastr.warning("Vendor belum diisi");
      return true;
    }

    if(input['product-category'] == null)
    {
      this.toastr.warning("Jenis Produk belum diisi");
      return true;
    }

    if(input['id_harga'] == 0 || input['id_harga'] == "")
    {
      this.toastr.warning("Harga belum diunduh. Harap Refresh!");
      return true;
    }

    if(input['id_margin'] == "")
    {
      this.toastr.warning("Margin belum diunduh. Harap Refresh!");
      return true;
    }

    if(input.ongkos == 0)
    {
      this.toastr.warning("Ongkos masih 0");
      return true;
    }

    if(input.berat)
    {
      this.toastr.warning("Berat masih 0");
      return true;
    }
    // for(let key in this.input)
    // {
    //   let value = this.input[key];
    //   console.log(value, key, 'key')
    //   if(value == null || value == "null" || value == 0 || (typeof value === 'number' && value === 0))
    //   {
    //     this.toastr.warning(this.GetDisplayName(key) + " belum diisi / sama dengan 0 ");
    //     return true
    //   }
    // }

    return false
  }
  // nomor_nota : null, tgl_inisiasi : new Date().toISOString().split("T")[0],  harga_baku : 0, pajak : 0, 
  //     create_date : new Date().toISOString().split("T")[0],
  //     'product-category' : null,
  //     berat_emas : 0, hpp_emas : 0,
  //     jenis_batu : "", warna_batu : "",
  //     carat_batu : 0, dimensi_batu : "0x0x0",
  //     hpp_batu : 0, margin_batu : 0,
  //     warna_berlian : "", clarity_berlian : "",
  //     cutting_berlian : "",
  //     total_butir_berlian : 0, total_carat_berlian : 0,
  //     hpp_berlian : 0, margin_berlian : 0,
  //     ongkos : 0, berat : 0
  
  GetDisplayName(key : string) : string
  {
    let name = "No Name Found";

    key = key.toLowerCase();

    switch(key)
    {
      case 'total_ongkos':
        name = "Total Ongkos";
        break;

      case 'total_pajak':
        name = "Total Pajak";
        break;

      case 'total_gram_tukar':
        name = "Total Gram Tukar";
        break;

      case 'total_baku_tukar':
        name ="Total Baku Tukar";
        break;

      case 'total_harga':
        name = "Total Harga";
        break;

      case 'total_piece':
        name = "Total Piece";
        break;

      case 'total_berat':
        name = "Total Berat";
        break;

      case 'nomor_nota':
        name = "Nomor Nota";
        break;

      case 'gram_tukar':
        name = "Gram Tukar";
        break;

      case 'sku':
        name = "SKU";
        break;
        
      case 'product-category':
        name = "Jenis Produk";
        break;

      case 'vendor':
        name = "Vendor";
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

      // case ''

      default:
        name += " - " + key
    }

    return name;
  }

  // 'DO' EVENTS
  doSave()
  {
    if(this.errorHappened)
    {
      this.toastr.error("Harap Refresh sebelumnya terjadi kesalahan.");
      return;
    }

    if(this.validateInput()) return;

    console.log(this.input, "in");

    // if(this.input.items?.length <= 0) {
    //   this.toastr.warning("Tidak ada item pada Tabel Input Detail.", "Peringatan!");
    //   return;
    // }
  }

  async ResetAll(form2reset : NgForm)
  {
    await this.LoadAllParameter();
    await this.LoadDate();
    this.input = this.defaultInput();
  }

  onPanjangChanged()
  {
    this.setDimensi();
  }

  onLebarChanged()
  {
    this.setDimensi();
  }

  onTinggiChanged()
  {
    this.setDimensi();
  }

  panjang : number = 0;
  lebar : number = 0;
  tinggi : number = 0;
  setDimensi()
  {
    let p = this.panjang;
    let l = this.lebar;
    let t = this.tinggi;

    this.input["dimensi_batu"] = p + "x" + l + "x" + t;
  }
}
