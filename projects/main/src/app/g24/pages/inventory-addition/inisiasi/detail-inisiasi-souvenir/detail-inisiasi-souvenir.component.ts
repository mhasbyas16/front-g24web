import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, ElementRef, AfterViewInit, TemplateRef, ChangeDetectionStrategy, ViewContainerRef, Output } from '@angular/core';
import { NgForm, Form, FormGroup, FormBuilder } from '@angular/forms';

import { isArray } from 'util';
import { ToastrService } from 'ngx-toastr';
import { InitiationType } from '../../../../lib/enums/initiation-type';
import { PaymentType } from '../../../../lib/enums/payment-type';
import { DocumentStatus } from '../../../../lib/enums/document-status.enum';
import { ModalErrorType } from '../../../../lib/enums/modal-error-type.enum';
import { EMenuID } from '../../../../lib/enums/emenu-id.enum';
import { ProductSeriesService } from '../../../../services/product/product-series.service';
import { VendorService } from '../../../../services/vendor.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { InisiasiService } from '../../../../services/stock/inisiasi.service';
import { ProductCategoryService } from '../../../../services/product/product-category.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DataTypeUtil } from '../../../../lib/helper/data-type-util';
import { BasePersistentFields } from '../../../../lib/base/base-persistent-fields';
import { ServerDateTimeService } from '../../../../services/system/server-date-time.service';
import { JurnalInisiasiService } from '../../../../services/keuangan/jurnal/stock/jurnal-inisiasi.service';
import { BankService } from '../../../../services/transaction/bank.service';
import { LoadingSpinnerComponent } from '../../../../nav/modal/loading-spinner/loading-spinner.component';
import { SequenceService } from '../../../../services/system/sequence.service';
import { StringHelper } from '../../../../lib/helper/string-helper';
 
@Component({
  selector: 'detail-inisiasi-souvenir',
  templateUrl: './detail-inisiasi-souvenir.component.html',
  styleUrls: ['./detail-inisiasi-souvenir.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
// @DContent(InisiasiComponent.key)
export class DetailInisiasiSouvenirComponent extends BasePersistentFields implements OnInit, AfterViewInit
{
  @ViewChild('container', { read: ViewContainerRef}) container : ViewContainerRef;

  @ViewChild('inisiasi') searchForm : any;
  // @ViewChild('inisiasi', {static: false}) inisiasi : NgForm;
  @ViewChild('product') product : ElementRef;

  @ViewChild('Souvenir', {static: false}) souvenirInput : TemplateRef<any>;
  
  @ViewChild('spinner', {static: false}) spinner : LoadingSpinnerComponent;

  btoa = btoa;
  parseInt = parseInt;
  console = console;
  Object = Object;

  errorHappened : boolean = false;

  user : any = {};

  datas : any[] = [];
  date : string = "";
  time : string = "";

  products : any[] = [];
  vendors : any[] = [];
  denoms : any[] = [];
  series : any[] = [];
  banks : any[] = [];

  parentPage : number = 0;

  selected : any = {};
  get Selected()
  {
    if(this.selected == null) this.selected = this.defaultItem();
    return this.selected;
  }
  set Selected(item)
  {
    this.selected = item
  }

  selectedId : number;
  productSelected = "";
  formInput : TemplateRef<any> = null;

  // searchModel : Map<string, any> = new Map<string, any>();
  input : any = {items : []};
  defaultInput() : any
  {
    let dt = this.date;
    let tm = this.time;
    return {
      nomor_nota : null, tgl_inisiasi : dt, create_date : dt, create_time : tm,
      harga_baku : 0, pajak : 0, 
      'product-category' : null, vendor : null, tipe_bayar : null,
      total_berat : 0, total_piece : 0,
      total_ongkos : 0, total_pajak : 0, total_harga : 0,
      items : []
    };
  }

  defaultItem() :any
  {
    return {
      sku : null, 'product-series' : null, 'product-denom' : null, 
      total_berat : 0,
      pieces : 0, ongkos_pieces : 0, total_ongkos : 0, pajak : 0, pajak_pieces : 0,
      harga_piece : 0, total_harga : 0
    }
  }

  InitiationType = Object.values(InitiationType);
  // PaymentTypeValues = Object.values(PaymentType);
  PaymentTypeValues = 
  [
    // {code : "E", name : "Maklon"}, 
    {code : "U", name : "Uang"}
  ];

  PaymentType = PaymentType;
  DocumentStatus = Object.values(DocumentStatus);
  ErrorType = ModalErrorType;

  modalOpen = false;
  errorTitle = "";
  errorType = "";
  errorMessage = "";

  static key = EMenuID.INISIASI;

  GetDisplayName(key : string) : string
  {
    let name = "No Name Found";

    key = key.toLowerCase();

    switch(key)
    {
      case 'pajak_pieces':
        name="Pajak per Piece";
        break;

      case 'ongkos_pieces':
        name = "Ongkos per Piece";
        break;

      case 'ongkos':
        name = "Ongkos";
        break;

      case 'product-series':
        name = "Series/Jenis";
        break;

      case 'harga_piece':
        name = "Harga per Piece";
        break;

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

  GetDisplayValue(object : any) : string
  {
    // console.log(typeof object)
    if(object == null) return "null";
    if(typeof object == 'string' || typeof object == 'number' || typeof object == 'undefined') return object.toString();

    return object.name;
  }

  constructor(
    private resolver : ComponentFactoryResolver,
    private dateService : ServerDateTimeService,
    private jurnalInisiasi : JurnalInisiasiService,
    private bankService : BankService,
    private sequencer : SequenceService,    
    // private unitService : UnitService,
    private seriesService : ProductSeriesService,
    private vendorService : VendorService,
    private denomService : ProductDenomService,
    private inisiasiService : InisiasiService,
    private productCatService : ProductCategoryService,
    // private logService : LogService,

    private toastr : ToastrService,
    private session : SessionService)
  {
    super();
  }

  async ngOnInit(): Promise<void>
  {
    await this.LoadDate();

    this.input = this.defaultInput();
    this.user = this.session.getUser();
    // console.log("user",this.user);
    
    // window['perhiasan'] = this.perhiasanInput;

    await this.LoadAllParameter();

    // NotificationUtil.Show(Notification.ERROR("fade", NotificationSize.DEFAULT))

    // ModalOutlet.AddModal('inisiasi-detail');

    this.onProductChanged();
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

  async LoadProductCategory()
  {
    while(this.products.length > 0)
    {
      this.products.pop();
    }

    let msg = "";
    let products : any = false;
    try {
      products = await this.productCatService.list("?code=c02").toPromise();
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

  async LoadVendor()
  {
    while(this.vendors.length > 0)
    {
      this.vendors.pop();
    }

    let msg = "";
    let vendors : any = false;
    try {
      vendors = await this.vendorService.list("?product-category.code=c02").toPromise();
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

  async LoadDenom()
  {
    while(this.denoms.length > 0)
    {
      this.denoms.pop();
    }
    
    let msg = "";
    let denoms : any = false;
    try {
      denoms = await this.denomService.list("?product-category.code=c02").toPromise();
    } catch(err) {
      denoms = false;
      msg = err.message;
    }
    
    if(denoms == false)
    {
      this.errorHappened = true;
      if(msg == "") msg = this.denomService.message();
      this.toastr.error("Gagal Loading 'Denom'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }

    for(let i = 0; i < denoms.length; i++)
    {
      this.denoms.push(denoms[i]);
    }
    this.denoms.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }
  
  async LoadSeries()
  {
    while(this.series.length > 0)
    {
      this.series.pop();
    }
    
    let msg = "";
    let series : any = false;
    try {
      series = await this.seriesService.list("?").toPromise();
    } catch(err) {
      series = false;
      msg = err.message;
    }
    
    if(series == false)
    {
      this.errorHappened = true;
      if(msg == "") msg = this.seriesService.message();
      this.toastr.error("Gagal Loading 'Series'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }

    for(let i = 0; i < series.length; i++)
    {
      this.series.push(series[i]);
    }
    this.series.sort((a,b) => ('' + a.name).localeCompare(b.name))
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

  async LoadAllParameter()
  {
    this.LoadProductCategory();
    this.LoadVendor();
    this.LoadDenom();
    this.LoadSeries();
    this.LoadBanks();
    
    this.onProductChanged();
  }

  ngAfterViewInit()
  {

  }

  async ResetAll()
  {
    this.errorHappened = false;
    await this.LoadAllParameter();
    await this.LoadDate();

    this.input = this.defaultInput();
  }

  onProductChanged()
  {
    
  }
  
  onTipeBayarChanged()
  {
    this.input.bank = null;
    this.input.asal_uang = "";

    this.hitungAllPajak();
  }

  loading = false;
  doSearch()
  {
    this.datas = [];
    this.selected = null;

    for(let d in this.InitiationType)
    {
      console.log(d)
    }
    // console.dir(JSON.stringify(this.searchModel))
    if(!this.searchValid(this.input))
    {
      return;
    }

    let params = "?";
    for (let key in this.input)
    {
      let value = typeof this.input[key];
      if(this.input[key] == null
        || this.input[key] == "") continue;

      switch(key)
      {
        case 'kadar':
          params += "items.kadar.code="+this.input[key]+"&";
          break;

        case 'warna':
          params += "items.warna.code="+this.input[key]+"&";
          break;
        
        case 'vendor':
          params += "items.vendor.code="+this.input[key]+"&";
          break;
          
        case 'jenis':
          params += "items.jenis.code="+this.input[key]+"&";
          break;
        
        case 'berat':
          params += "items.berat="+this.input[key]+"&";
          break;

        case 'color':
          params += "items.color.code="+this.input[key]+"&";
          break;

        case 'carat':
          params += "items.carat.code="+this.input[key]+"&";
          break;

        case 'carat':
          params += "items.carat.code="+this.input[key]+"&";
          break;

        case 'denom':
          params += "items.denom.code="+this.input[key]+"&";
          break;

        case 'unit':
          params += "unit.code"+this.input[key]+"&";
          break;

        case 'product':
          params += "product="+btoa(JSON.stringify(this.input[key]))+"&";
          break;

        default:
          params += key+"="+this.input[key]+"&";
          break;
      }
    };

    // params = DataTypeUtil.Encode(this.searchModel);
    // this.searchModel.items = {warna : "01"}

    // console.log('tes', btoa(JSON.stringify(this.searchModel['product'])));
    console.log('model', this.input);

    params.endsWith("&") ? params = params.substring(0, params.length-1) : null;
    // this.sear

    // formGroup.patchValue(this.searchModel)


    // this.loading = true;
    this.inisiasiService.list(params).subscribe(output =>
    {
        if(output != false)
        {
          // for(let data in output)
          // {
          //   this.datas.push(output[data]);
          // }
          this.datas = output
          window['datas'] = this.datas;
        }

        // this.loading = false;
    }
    )

  }

  searchValid(model : any) : boolean
  {
    if(model == null)
    {
      this.toastr.error("Pencarian Gagal", "Model null");
      return false;
    }

    if(model.no_po == "")
    {
      return false;
    }

    return true;
  }

  async doSave()
  {
    this.spinner.Open();
    if(this.errorHappened)
    {
      this.spinner.Close();
      this.toastr.error("Sebelumnya ada error terjadi. Harap Refresh halaman, apabila masih terjadi harap hubungi IT Support/Helpdesk");
      return;
    }

    if(this.validateInput())
    {
      this.spinner.Close();
      return;
    }

    if(this.validateItems())
    {
      this.spinner.Close();
      return;
    }

    if(this.input.items?.length <= 0)
    {
      this.spinner.Close();
      this.toastr.warning("Tidak ada item pada Tabel Input Detail.", "Peringatan!");
      return;
    }

    let now : Date = new Date;
    let sNow = now.toISOString().split("T");
    let date = sNow[0];
    let date_split = date.split("-");
    let time = sNow[1].split(".")[0];

    let no = this.input['no_po'];
    console.log(no, "no")

    if(this.user?.unit == null)
    {
      this.spinner.Close();
      this.toastr.warning("Unit dari User belum di-Assign. Harap hubungi IT Support/Helpdesk.", "Error!");
      return;
    }

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

    let def =
    {
      no_po : PO,
      // __format : "no_po:inc",
      create_date : this.input['create_date'],
      create_time : time,
      create_by : this.user.username,
      unit : this.user.unit.code,
      order_status : "submit",
      status_bayar : '1',
      __version : new Date().getMilliseconds(),
      __version_d : "0",
      items : this.input['items'],
      _log : 1
      // vendor : null,
      // 'product-category' : null,
    };
    Object.assign(def, this.input);
    let init = DataTypeUtil.Encode(def);

    this.inisiasiService.add(init).subscribe(async output => {
      this.spinner.Close();
      if(output == false)
      {
        this.toastr.error("Inisiasi gagal. Harap hubungi IT Support/Helpdesk. Reason: " + this.inisiasiService.message(), "Error!", {disableTimeOut : true, tapToDismiss : false, closeButton : true});
        return;
      } else {
        this.toastr.success("Inisiasi Berhasil. Harap hubungi Kepala Departemen untuk melakukan Approval. No. PO : " + output.no_po, "Info", {disableTimeOut : true, tapToDismiss : false, closeButton : true});
        console.log(output,'ts');
        this.ResetAll();
        // this.doAccounting(output._id);
      }
    }, err => {
      this.spinner.Close();
      this.toastr.error("Inisiasi gagal. Harap hubungi IT Support/Helpdesk. Reason: " + err.message, "Error!", {disableTimeOut : true, tapToDismiss : false, closeButton : true});
      return;
    });
    // console.log(output);
  }

  // doAccounting(idInisiasi :string)
  // {
  //   this.jurnalInisiasi.bayar(idInisiasi).subscribe(output => {
  //     if(output == false)
  //     {
  //       let msg = this.jurnalInisiasi.message();
  //       this.toastr.error("Inisiasi gagal. Harap hubungi IT Support/Helpdesk. Reason: " + msg, "Error!", {disableTimeOut : true, tapToDismiss : false, closeButton : true});
  //       // console.log()
  //       return;
  //     } else {
  //       this.toastr.success("Jurnal berhasil.")
  //       return;
  //     }
  //   });
  // }

  Debug()
  {
    console.log(this.input, "model", this.selected);
  }

  onDelete()
  {
    if(this.selected == null || this.selected == "" || this.selected == "null") return;

    this.inisiasiService.delete(this.selected).subscribe(output => {
      if(output != false)
      {
        this.errorMessage = output;
      }
    })
  }

  onEdit()
  {
    if(this.selected.flag == "0") return;
    // if(this.selected.length != 1) return;
    // switch(this.selected.product_code)
    // {
      // case '01':
        // let key = Modals.get(DetailInisiasiPerhiasanComponent.key);

    // }
    // ModalOutlet.AddModal('inisiasi-det-perhiasan');
  }

  onExportAll()
  {

  }

  onExportSelected()
  {

  }

  validateItems()
  {
    for(let i = 0; i < this.input.items.length; i++)
    {
      let item = this.input.items[i];
      if(this.validateAdd(item))
      {
        // console.log(item, "tralala")
        return true;
      }
    }

    return false;
  }

  validateInput()
  {
    for(let key in this.input)
    {
      if(key == 'total_pajak' && this.input.tipe_bayar == PaymentType.UANG.code) continue;
      
      if(key == 'bank' && this.input.tipe_bayar == PaymentType.MAKLON.code) continue;

      if(key == 'bank' && this.input.asal_uang == 'kas') continue;

      if(key == 'asal_uang' && this.input.tipe_bayar == PaymentType.MAKLON.code) continue;

      if(key == 'asal_uang' && this.input.tipe_bayar == PaymentType.MAKLON.code) continue;

      let value = this.input[key];
      console.log(value, key, 'key')
      if(value == null || value == "null" || value == 0 || (typeof value === 'number' && value === 0))
      {
        this.toastr.warning(this.GetDisplayName(key) + " belum diisi / sama dengan 0 ");
        return true
      }
    }

    return false
  }

  validateAdd(item : any)
  {
    for(let key in item)
    {
      if(key == 'pajak_pieces' && this.input.tipe_bayar == PaymentType.UANG.code) continue;
      if(key == 'pajak' && this.input.tipe_bayar == PaymentType.UANG.code) continue;

      if(item[key] == null || item[key] == "null")
      {
        this.toastr.warning(this.GetDisplayName(key) + ' belum diisi.', "Peringatan!");
        return true;
      }

      if(item[key] == 0)
      {
        this.toastr.warning(this.GetDisplayName(key) + ' masih 0', "Peringatan!");
        return true;
      }
    }

    return false;
  }

  onAddItem()
  {
    let tempItem = this.defaultItem();

    
    Object.assign(tempItem, this.selected);

    if(this.validateAdd(tempItem))
    {
      return;
    }
    
    this.input['items'].push(tempItem);

    for(let i = 0; i < this.input.length; i++)
    {
      let ass = {no : i};
      let item = this.input.items[i];
      Object.assign(item, ass);
      console.log(item)
    }

    // this.onResetItem();
  }

  onDeleteItem()
  {
    let i = this.input['items'].indexOf(this.selected);
    console.log(i)
    this.input['items']?.splice(i, 1);
    this.onResetItem();
  }

  onResetItem()
  {
    this.selected = this.defaultItem();
  }

  getBeratFromItems()
  {
    let berat = 0.0;
    let item = {};
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i]['product-denom'] == null || this.input.items[i]['product-denom'] == "null")
        continue;

      item = this.input.items[i];
      berat += parseFloat(item['product-denom'].value) * parseInt(item['pieces']);
    }
    this.input['total_berat'] = Number(berat.toFixed(2));
    return this.input['total_berat'];
  }

  getPiecesFromItems()
  {
    let value = 0;
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i]?.pieces == null || this.input.items[i].pieces == "null")
        continue;
      value += parseInt(this.input.items[i].pieces);
    }

    this.input['total_piece'] = value;
    return value;
  }
  
  getBakuTukarFromItems()
  {
    let value = 0;
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i]?.baku_tukar == null || this.input.items[i]?.baku_tukar == "null")
        continue;
        value += parseInt(this.input.items[i].baku_tukar);
    }

    this.input['total_baku_tukar'] = value;
    return value;
  }
  
  getGramTukarFromItems()
  {
    let value : number = 0;
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i]?.gram_tukar == null || this.input.items[i]?.gram_tukar == "null")
        continue;
        value += Math.round(parseInt(this.input.items[i].gram_tukar) * 100) / 100;
    }

    this.input['total_gram_tukar'] = Number(value.toFixed(2));
    return this.input['total_gram_tukar'];
  }
  
  getOngkosFromItems()
  {
    let value = 0;
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i]?.total_ongkos == null || this.input.items[i]?.total_ongkos == "null")
        continue;
        value += parseInt(this.input.items[i].total_ongkos);
    }

    this.input['total_ongkos'] = value;
    return value;
  }
  
  getPajakFromItems()
  {
    let value = 0;
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i]?.pajak == null || this.input.items[i]?.pajak == "null")
        continue;
        value += parseInt(this.input.items[i].pajak);
    }

    this.input['total_pajak'] = Math.round(value);
    return value;
  }

  beratStyleValid()
  {
    // if(this.input.items?.length > 0) return {};

    if(this.getBeratFromItems() > 0) return {};

    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
  }
  
  piecesStyleValid()
  {
    if(this.getPiecesFromItems() > 0) return {};

    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
  }

  bakuTukarStyleValid()
  {
    if(this.getBakuTukarFromItems() > 0) return {};

    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
  }
  
  ongkosStyleValid()
  {
    if(this.getOngkosFromItems() > 0) return {};

    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
  }
  
  gramTukarStyleValid()
  {
    if(this.getGramTukarFromItems() > 0) return {};

    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
  }
  
  pajakStyleValid()
  {
    if(this.getPajakFromItems() > 0) return {};

    if(this.input.tipe_bayar == PaymentType.UANG.code) return {};

    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
  }

  totalDPPStyleValid()
  {
    if(this.hitungTotalDPP() > 0) return {};
    
    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
  }

  hitungTotalDPP()
  {
    if(this.input == null)
    {
      return 0;
    }

    let total_harga = Math.round(Number(this.input['total_harga']));
    if(total_harga == 0)
    {
      return 0;
    }

    let total_pajak = Math.round(this.input['total_pajak']);

    total_harga -= total_pajak;

    this.input['total_dpp'] = Math.round(total_harga);
    return this.input['total_dpp'];
  }

  hitungAllPajak()
  {
    for(let i = 0; i < this.input.items.length; i++)
    {
      let item = this.input.items[i];

      this.countItemPajak(item);
      this.countItemTotalPajak(item);
      console.log(item)
    }
    
    this.countItemPajak();
    this.countItemTotalPajak();
  }

  // pajakCounted : boolean = false;
  countItemTotalPajak(item? : any)
  {
    // this.pajakCounted = false;
    if(!item)
      item = this.Selected;
      
    let hpajak : number= this.input?.pajak;

    if(hpajak == null) return 0;
    
    let persenPajak = 2.00; // harusnya dari DB

    let pajakItem : number = 0;
    pajakItem = (item.total_ongkos * persenPajak/100);

    if(this.input.tipe_bayar == PaymentType.UANG.code) pajakItem = 0;
    
    // if(this.input.tipe_bayar == PaymentType.UANG.code)
    //   pajakItem = (item.total_harga * persenPajak/100);
    // else
    //   pajakItem = ongkos * persenPajak/100;

    // if(this.input.tipe_bayar == PaymentType.MAKLON.code && item.totalHarga != 0)
    //   this.pajakCounted = true;
    
    // if(this.input.tipe_bayar == PaymentType.MAKLON.code && (ongkos != 0 || ongkos != null))
    //   this.pajakCounted = true;
    
    item.pajak = Math.round(pajakItem);
    console.log(pajakItem);
    return this.selected.pajak;
  }

  countItemPajak(item? : any)
  {
    // this.pajakCounted = false;
    if(!item)
      item = this.Selected;
      
    let hpajak : number= this.input?.pajak;
    let ongkos : number = parseInt(item.ongkos_pieces);

    if(hpajak == null) return 0;
    
    let persenPajak = 2.00; // harusnya dari DB
    persenPajak = 2 * 100;

    let pajakItem : number = 0;
    pajakItem = ongkos * (persenPajak/10000);

    if(this.input.tipe_bayar == PaymentType.UANG.code) pajakItem = 0;
    
    item.pajak_pieces = Math.round(pajakItem);
    console.log(pajakItem, item.pajak_pieces);
    return this.selected.pajak;
  }

  ValidateField(object : any, key : string, validationMethod?)
  {
    if(object) return false;

    if(object[key] == null || object[key] == "null" || "" == object[key])
      return false;
    
    if(validationMethod)
      return validationMethod();

    return true;
  }

  onPiecesChanged()
  {
    this.countItemTotalOngkos();
    this.countItemTotalBerat();
    this.countItemHargaPiece();
    this.countItemTotalHarga();
  }

  onDenomChanged()
  {
    this.countItemHargaPiece();
    this.countItemTotalBerat();
    this.countItemTotalHarga();
  }

  onOngkosChanged()
  {
    this.countItemTotalOngkos();
    this.countItemPajak();
    this.countItemTotalPajak();
    this.countItemHargaPiece();
    this.countItemTotalHarga();
  }

  onHargaBakuChanged()
  {
    this.countItemTotalBerat();
    this.countItemTotalOngkos();
    this.countItemPajak();
    this.countItemTotalPajak();
    this.countItemHargaPiece();
    this.countItemTotalHarga();

    for(let item in this.input['items'])
    {
      this.countItemTotalBerat(item);
      this.countItemTotalOngkos(item);
      this.countItemHargaPiece(item);
      this.countItemTotalHarga(item);
      this.countItemPajak(item);
      this.countItemTotalPajak(item);
    }
  }

  onHargaPieceChanged()
  {
    this.countItemTotalHarga();
  }
  
  countItemTotalOngkos(item? : any)
  {
    if(!item)
      item = this.Selected;

    let pieces = item['pieces'];
    let ongkos_pieces = parseInt(item['ongkos_pieces']);
  
    item['total_ongkos'] = parseFloat(pieces) * ongkos_pieces;
  }

  countItemTotalBerat(item? : any)
  {
    if(!item)
      item = this.Selected;
    let pieces = item['pieces'];
    let denom = item['product-denom']?.value;

    item['total_berat'] = Math.round(Number((parseFloat(pieces) * parseFloat(denom)).toFixed(2)) * 100) / 100;
  }

  countItemHargaPiece(item? : any)
  {
    if(!item)
      item = this.Selected;

    let harga_baku = this.input['harga_baku'];
    let denom = item['product-denom']?.value;
    let ongkos_pieces = item['ongkos_pieces'];
    let pajak_pieces = parseFloat(item['pajak_pieces']);

    // console.log('harga_piece', denom, harga_baku, ongkos_pieces, pajak_pieces);
    let h = parseFloat(denom) * parseFloat(harga_baku);
    let harga_piece = (parseFloat(denom) * parseFloat(harga_baku)) +  parseFloat(ongkos_pieces) + (pajak_pieces);

    item['harga_piece'] = (parseFloat(denom) * parseFloat(harga_baku)) +  parseFloat(ongkos_pieces) + (pajak_pieces);
    // console.log(item, h, pajak_pieces, parseFloat(ongkos_pieces), harga_piece, item['harga_piece']);
  }

  countItemTotalHarga(item? : any)
  {
    if(!item)
      item = this.Selected;

    let pieces = item['pieces'];
    let harga = item['harga_piece'];
    let item_pajak = item['pajak'];

    item['total_harga'] = Math.round(parseInt(pieces) * parseInt(harga));
    console.log(item, 'item harga total', pieces, harga);
  }

  
  totalHargaStyleValid()
  {
    if(this.hitungTotalHarga() > 0) return {};

    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
  }
  
  hitungTotalHarga()
  {
    let items = this.input['items'];
    let value : number = 0.0;

    for(let i = 0; i < items.length; i++)
    {
      value += Number(items[i].total_harga);
    }
    this.input['total_harga'] = Math.round(value);

    return this.input['total_harga'];
  }

}
