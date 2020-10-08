import { Component, OnInit } from '@angular/core';
import { ServerDateTimeService } from '../../../../services/system/server-date-time.service';
import { ProductCategoryService } from '../../../../services/product/product-category.service';
import { ProductJenisService } from '../../../../services/product/product-jenis.service';
import { ProductGoldColorService } from '../../../../services/product/product-gold-color.service';
import { ProductPurityService } from '../../../../services/product/product-purity.service';
import { PrmMarginService } from '../../../../services/parameter/prm-margin.service';
import { ToastrService } from 'ngx-toastr';
import { PrmJualService } from '../../../../services/parameter/prm-jual.service';
import { VendorService } from '../../../../services/vendor.service';
import { InitiationType } from '../../../../lib/enums/initiation-type';
import { PaymentType } from '../../../../lib/enums/payment-type';
import { BankService } from '../../../../services/transaction/bank.service';
import { environment } from 'projects/main/src/environments/environment';
import { InisiasiService } from '../../../../services/stock/inisiasi.service';
import { OrderStatus } from '../../../../lib/enum/order-status';
import { DataTypeUtil } from '../../../../lib/helper/data-type-util';
import { LoadingSpinnerComponent } from '../../../../nav/modal/loading-spinner/loading-spinner.component';
import { ViewChild } from '@angular/core';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { SequenceService } from '../../../../services/system/sequence.service';
import { StringHelper } from '../../../../lib/helper/string-helper';

@Component({
  selector: 'detail-inisiasi-permata',
  templateUrl: './detail-inisiasi-permata.component.html',
  styleUrls: ['./detail-inisiasi-permata.component.scss']
})
export class DetailInisiasiPermataComponent implements OnInit {

  @ViewChild('spinner', {static: false}) spinner : LoadingSpinnerComponent;

  constructor
  (
    private dateService : ServerDateTimeService,
    private toastr : ToastrService,
    private session : SessionService,
    private sequencer : SequenceService,

    private inisiasiService : InisiasiService,

    private productCatService : ProductCategoryService,
    private vendorService : VendorService,
    private jenisService : ProductJenisService,
    private gColorService : ProductGoldColorService,
    private kadarService : ProductPurityService,
    private prmJualService : PrmJualService,
    private marginService : PrmMarginService,
    private bankService : BankService,
  ) { }
  
  isDev = !environment.production;

  InitiationType = Object.values(InitiationType);
  PaymentTypeValues = Object.values(PaymentType);
  PaymentType = PaymentType;
  
  OnlyUpperAlphabetsPattern  = new RegExp('[^A-Z]+', 'g');
  AlphaNumericPattern = new RegExp('[^A-Z0-9]+', 'g');

  user : any = this.session.getUser();
  date : string = "";
  time : string = "";

  input : any = {};

  defaultInput() {
    let harga_beli = Number(this.hbeli.harga_buyback);
    let id_harga = this.hbeli._id;
    let id_margin = this.margin._id;
    let margin = this.margin.margin;
    let margin_batu = this.margin.margin_batu;
    let margin_berlian = this.margin.margin_berlian;

console.log(this.hbeli);
    return {
      nomor_nota : null, tgl_inisiasi : this.date,  id_harga : id_harga, harga_beli : Number(harga_beli), 
      id_margin : id_margin, persen_margin : Number(margin),
      persen_margin_batu : Number(margin_batu), persen_margin_berlian : Number(margin_berlian),

      create_date : this.date,
      'product-category' : null, vendor : null,
      'product-purity' : null, 'product-jenis' : null,
      'product-gold-color' : null,
      berat_emas : 0, hpp_emas : 0,
      asal_uang : "", bank : "", tipe_bayar : "",

      jenis_batu : "", warna_batu : "",
      carat_batu : 0, dimensi_batu : "0x0x0",
      hpp_batu : 0, margin_batu : 0,
      
      warna_berlian : "", clarity_berlian : "",
      cutting_berlian : "",
      total_butir_berlian : 0, total_carat_berlian : 0,
      hpp_berlian : 0, margin_berlian : 0,
      
      ongkos : 0, berat : 0
    };
  }

  products : any[] = [];
  jeniss : any[] = [];
  kadars : any[] = [];
  warnas : any[] = [];
  vendors : any[] = [];
  latestMargin : any[] = [];
  margin : any = {};
  hbeli : any = {};
  
  banks : any[] = [];

  errorHappened : boolean = false;


  async ngOnInit() {
    await this.LoadAllParameter();

    await this.LoadParameterJual();
    await this.LoadMargin();
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
    
    this.LoadBanks();
    // this.LoadShape();
    
    // this.onProductChanged();
  }

  async LoadVendor()
  {
    while(this.vendors.length > 0)
    {
      this.vendors.pop();
    }

    let msg = "";
    let vendors : any = false;
    try {
      vendors = await this.vendorService.list("?product-category.code=c03").toPromise();
    } catch(err) {
      vendors = false;
      msg = err.message;
    }
    
    if(vendors == false)
    {
      this.errorHappened = true;
      if(msg == "") msg = this.vendorService.message();
      this.toastr.error("Gagal Loading 'Vendor'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }

    for(let i = 0; i < vendors.length; i++)
    {
      this.vendors.push(vendors[i]);
    }
    this.vendors.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }
  
  async LoadParameterJual()
  {
    let hbeli = await this.prmJualService.list("?_rows=1&flag=approved&product-category.code=c03").toPromise();
    if(hbeli == false)
    {
      this.errorHappened = true;
      let msg = this.prmJualService.message();
      this.toastr.error("Gagal Loading 'Parameter Harga Beli'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
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

    this.hbeli = hbeli[0];
  }

  async LoadMargin()
  {
    let margins = await this.marginService.list("?_rows=1&flag=approved&product-category.code=c03").toPromise();
    if(margins == false)
    {
      this.errorHappened = true;
      let msg = this.marginService.message();
      this.toastr.error("Gagal Loading 'Margin'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
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

    this.margin = margins[0];
  }

  async LoadDate()
  {
    let resp : any = false;
    try {
      resp = await this.dateService.task("").toPromise();
    } catch(err) {
      resp = false;
    }
    if(resp == false)
    {
      this.errorHappened = true;
      return;
    }

    let dtarr = resp.split("T");
    this.date = dtarr[0];
    this.time = dtarr[0].split("Z")[0];
  }
  
  async LoadBanks()
  {
    while(this.banks.length > 0)
    {
      this.banks.pop();
    }
    
    let msg = "";
    let banks : any = false;
    try {
      banks = await this.bankService.list("?").toPromise();
    } catch(err) {
      banks = false;
      msg = err.message;
    }

    if(banks == false)
    {
      this.errorHappened = true;
      if(msg == "") msg = this.bankService.message();
      this.toastr.error("Gagal Loading 'Bank'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }

    console.log(banks);

    for(let i = 0; i < banks.length; i++)
    {
      this.banks.push(banks[i]);
    }
    this.banks.sort((a, b) => ('' + a.name).localeCompare(b.name));
  }

  async LoadProductCategory()
  {
    while(this.products.length > 0)
    {
      this.products.pop();
    }

    let msg = "";
    let products : any = false;
    try {
      products = await this.productCatService.list("?code=c03").toPromise();
    } catch(err) {
      products = false;
      msg = err.message;
    }
    
    if(products == false)
    {
      this.errorHappened = true;
      if(msg == "") msg = this.productCatService.message();
      this.toastr.error("Gagal Loading 'Jenis Produk'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
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
    while(this.jeniss.length > 0)
    {
      this.jeniss.pop();
    }

    let msg = "";
    let jeniss : any = false;
    try {
      jeniss = await this.jenisService.list("?").toPromise();
    } catch(err) {
      jeniss = false;
      msg = err.message;
    }

    if(jeniss == false)
    {
      this.errorHappened = true;
      if(msg == "") msg = this.jenisService.message();
      this.toastr.error("Gagal Loading 'Jenis Perhiasan'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
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
    while(this.kadars.length > 0)
    {
      this.kadars.pop();
    }

    let msg = "";
    let kadars : any = false;
    try {
      kadars = await this.kadarService.list("?").toPromise();
    } catch(err) {
      kadars = false;
      msg = err.message;
    }

    if(kadars == false)
    {
      this.errorHappened = true;
      if(msg == "") msg = this.kadarService.message();
      this.toastr.error("Gagal Loading 'Kadar Perhiasan'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }
    for(let i = 0; i < kadars.length; i++)
    {
      this.kadars.push(kadars[i]);
    }
    this.kadars.sort((a,b) => parseInt(a.name) - parseInt(b.name));
  }

  async LoadGWarna()
  {
    while(this.warnas.length > 0)
    {
      this.warnas.pop();
    }

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
    
  }
  
  onTipeBayarChanged()
  {
    this.input.bank = null;
    this.input.asal_uang = "";

    // this.hitungAllPajak();
  }

  onBeratEmasChanged()
  {
    this.hitungHPPEmas();
  }

  onKadarEmasChanged()
  {
    this.hitungHPPEmas();
  }

  hitungHPPEmas()
  {
    if(this.input == null) return;
    if(this.input['product-purity'] == null) return;
    if(this.hbeli == null) return;

    let kadar = Number(this.input['product-purity'].name);
    let berat_emas = Number(this.input.berat_emas);
    let hbuy = Number(this.hbeli.harga_buyback);

    let hpp_emas = kadar * berat_emas * hbuy / 1000;
    hpp_emas = Math.round(hpp_emas);
console.log(hpp_emas, kadar,berat_emas,hbuy)
    this.input.hpp_emas = hpp_emas;
    return this.input.hpp_emas;
  }

  /**
   * true: !Valid
   * false : Valid
   */
  validateInput()
  {
    let input = this.input;

    if(input.tipe_bayar == "" || input.tipe_bayar == null)
    {
      this.toastr.warning("Tipe Bayar belum diisi")
      return true;
    }
    if(input.tipe_bayar == PaymentType.UANG.code && input.asal_uang == "")
    {
      this.toastr.warning("Asal Uang belum diisi")
      return true;
    }
    
    if(input.tipe_bayar == PaymentType.UANG.code && input.asal_uang == "bank" && input.bank == "")
    {
      this.toastr.warning("Bank belum diisi");
      return true;
    }


    // EMAS
    if(input['product-jenis'] == null)
    {
      this.toastr.warning("Jenis Emas belum diisi");
      return true;
    }
    
    if(input['product-gold-color'] == null)
    {
      this.toastr.warning("Warna Emas belum diisi");
      return true;
    }
    
    if(input['product-purity'] == null)
    {
      this.toastr.warning("Kadar Emas belum diisi");
      return true;
    }

    if(input['berat_emas'] == 0 || input['berat_emas'] == null)
    {
      this.toastr.warning("Berat Emas masih 0");
      return true;
    }

    if(input['hpp_emas'] == 0 || input['hpp_emas'] == null)
    {
      this.toastr.warning("HPP Emas masih 0");
      return true;
    }

    if(input['id_margin'] == "" || input['persen_margin'] == "" || input['persen_margin'] == 0)
    {
      this.toastr.warning("Margin belum diunduh. Harap Refresh/Klik RESET dibawah.");
      return true;
    }
    // EMAS


    // BATU
    let batu_empty : boolean = false;
    if( // jika param batu ada yang keisi, semua param batu kena validasi
      (input['jenis_batu'] != "" ) ||
      input['warna_batu'] != "" ||
      ((input['carat_batu'] != 0)) ||
      (input['dimensi_batu'] != "0x0x0")
    )
    {
      console.log((input['carat_batu'] != 0), (input['dimensi_batu'] != "0x0x0"),
      input['warna_batu'] != "", input['jenis_batu'] != "");
      if(
        input['jenis_batu'] == "" || input['jenis_batu'] == null ||
        input['warna_batu'] == "" || input['warna_batu'] == null ||
        input['carat_batu'] == 0 || input['carat_batu'] == null ||
        input['dimensi_batu'] == "" || input['dimensi_batu'] == null || input['dimensi_batu'] == "0x0x0" ||
        input['hpp_batu'] == 0 || input['hpp_batu'] == "" || input['hpp_batu'] == null ||
        input['margin_batu'] == 0 || input['margin_batu'] == null
        )
      {
        this.toastr.warning("Atribut Batu belum semua terisi");
        return true;
      }
    } else {
      batu_empty = false;
    }
    // BATU

    // BERLIAN
    let berlian_empty : boolean = false; // salah satu harus true
    if( // jika param batu ada yang keisi, semua param batu kena validasi
      input['warna_berlian'] != "" ||
      input['clarity_berlian'] != "" ||
      input['cutting_berlian'] != "" ||
      (input['total_butir_berlian'] != 0) ||
      (input['total_carat_berlian'] != 0)
    )
    {
      console.log((input['carat_berlian'] != 0),input['carat_berlian'] ,
      input['warna_berlian'] != "", input['warna_berlian'], input['jenis_berlian'] != "", input['jenis_berlian']);
      if(
        input['warna_berlian'] == "" || input['warna_berlian'] == null ||
        input['cutting_berlian'] == "" || input['cutting_berlian'] == null ||
        input['clarity_berlian'] == "" || input['clarity_berlian'] == null ||
        input['hpp_berlian'] == 0 || input['hpp_berlian'] == "" || input['hpp_berlian'] == null ||
        input['margin_berlian'] == 0 || input['margin_berlian'] == null ||
        input['total_butir_berlian'] == 0 || input['total_butir_berlian'] == null ||
        input['total_carat_berlian'] == 0 || input['total_carat_berlian'] == null
        )
      {
        this.toastr.warning("Atribut Berlian belum semua terisi");
        return true;
      }
    } else {
      berlian_empty = false;
    }
    // BERLIAN

    if(berlian_empty && batu_empty)
    {
      this.toastr.warning("Kedua Atribut Berlian dan Batu kosong.");
      return true;
    }

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

    if(input['id_harga'] == "")
    {
      this.toastr.warning("Harga belum diunduh. Harap Refresh!");
      return true;
    }

    if(input['id_margin'] == "")
    {
      this.toastr.warning("Margin belum diunduh. Harap Refresh!");
      return true;
    }

    if(input.ongkos == 0 || input.ongkos == null)
    {
      this.toastr.warning("Ongkos masih 0");
      return true;
    }

    if(input.berat == 0 || input.berat == null)
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
  async doSave()
  {
    this.spinner.Open();
    if(this.errorHappened)
    {
      this.spinner.Close();
      this.toastr.error("Harap Refresh sebelumnya terjadi kesalahan.");
      return;
    }

    if(this.validateInput())
    {
      this.spinner.Close();
      return;
    }
    if(this.user?.unit == null)
    {
      this.spinner.Close();
      this.toastr.warning("Unit dari User belum di-Assign. Harap hubungi IT Support/Helpdesk.", "Error!");
      return;
    }

    let date = this.date;
    let date_split = date.split("-");
    let time = this.time;

    let unitCode = this.session.getUnit()?.code;
    let key = {key : "PO-" + unitCode + "-" + this.date }
    let seq : any = "";
    let msg = "";
    try
    {
      seq = await this.sequencer.use(key).toPromise();

    } catch(err)
    {
      msg = err.message;
      seq = false;
    }

    if(seq == false)
    {
      if(msg == "") msg = this.sequencer.message();
      this.toastr.error("Gagal membentuk Format Nomor PO. Error: " + msg);
      this.spinner.Close();
      this.ResetAll();
      return;
    }

    let st = StringHelper.LeftZeroPad(Number(seq.value).toString(), 5);
    let PO = "PO" + this.session.getUnit()?.code + date_split[0].substring(2, 4) + date_split[1] + date_split[2] + st;

    let def = {
      no_po : PO,
      // __format : "no_po:inc",
      create_by : this.user,
      create_date : date,
      create_time : time,
      unit : this.user.unit.code,
      status_bayar : '1',
      order_status : OrderStatus.SUBMIT.code,
      __version : new Date().getMilliseconds(),
      __version_d : "0",
      _log : 1
    }

    Object.assign(this.input, def);
    let init = DataTypeUtil.Encode(this.input);

    // this.input.id_harga = this.hbeli._id;
    // this.input.harga_beli = this.hbeli.harga_buyback;

    this.inisiasiService.add(init).subscribe(output => {
      this.spinner.Close();
      if(output == false)
      {
        this.toastr.error("Inisiasi gagal. Harap hubungi IT Support/Helpdesk. Reason: " + this.inisiasiService.message());
        return;
      } else {
        this.toastr.success("Inisiasi Berhasil. Harap hubungi Kepala Departemen untuk melakukan Approval. No. PO : " + output.no_po, "Info", {disableTimeOut : true, tapToDismiss : false, closeButton : true});
        if(!environment.production)console.log(output,'ts');
        this.ResetAll();
      }
    }, err => {
      this.spinner.Close();
      this.toastr.error("Inisiasi gagal. Harap hubungi IT Support/Helpdesk. Reason: " + err.message, "Error!", {disableTimeOut : true, tapToDismiss : false, closeButton : true});
      return;
    });
  }

  async ResetAll()
  {
    this.errorHappened = false;
    await this.LoadAllParameter();
    await this.LoadDate();
    await this.LoadParameterJual();
    await this.LoadMargin();
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

  onHPPBatuChanged()
  {
    this.hitungHPPBatu();
  }

  onHPPBerlianChanged()
  {
    this.hitungHPPBerlian()
  }

  hitungHPPBerlian()
  {
    // if(this.input == null) return;
    // if(this.hbeli == null) return;

    let hpp_berlian = Number(this.input.hpp_berlian);
    let persen_margin_berlian = Number(this.input.persen_margin_berlian);

    let margin_berlian = hpp_berlian * persen_margin_berlian / 100;
    margin_berlian = Math.round(margin_berlian);

    console.log(this.hbeli, this.input, this.hbeli, margin_berlian, hpp_berlian, persen_margin_berlian);
    this.input.margin_berlian = margin_berlian;
    return this.input.margin_berlian;
  }

  hitungHPPBatu()
  {
    // if(this.input == null) return;
    // if(this.hbeli == null) return;
console.log(this.input.margin_batu)
    let hpp_batu = Number(this.input.hpp_batu);
    let persen_margin_batu = Number(this.input.persen_margin_batu);

    let margin_batu = hpp_batu * persen_margin_batu / 100;
    margin_batu = Math.round(margin_batu);
    
    if(!environment.production) console.log(margin_batu);

    this.input.margin_batu = margin_batu;
    return this.input.margin_batu;
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

  ResetParamBerlian()
  {
    let input = this.input;

    input.warna_berlian = "";
    input.clarity_berlian = "";
    input.cutting_berlian = "";
    input.total_butir_berlian = 0;
    input.total_carat_berlian = 0;
    input.hpp_berlian = 0;
    input.margin_berlian = 0;  
  }

  ResetParamBatu()
  {
    let input = this.input;

    input.jenis_batu = "";
    input.warna_batu = "";
    input.carat_batu = 0;
    input.dimensi_batu = "0x0x0";
    input.hpp_batu = 0;
    input.margin_batu = 0;
  }

  RestrictInputOnModel(value : string, pattern : RegExp)
  {
    let nVal = value.replace(pattern, '');
    if(!environment.production)console.log(nVal)
    return nVal;
  }

  debug()
  {
    console.log(this.input);
  }
}
