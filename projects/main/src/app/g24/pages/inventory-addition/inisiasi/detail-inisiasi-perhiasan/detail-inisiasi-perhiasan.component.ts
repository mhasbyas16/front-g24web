import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, ElementRef, AfterViewInit, TemplateRef, ChangeDetectionStrategy, ViewContainerRef, Output } from '@angular/core';
import { NgForm, Form, FormGroup, FormBuilder } from '@angular/forms';

import { isArray } from 'util';
import { ClarityModule } from '@clr/angular';
import { ToastrService } from 'ngx-toastr';
import { BasePersistentFields } from '../../../../lib/base/base-persistent-fields';
import { InitiationType } from '../../../../lib/enums/initiation-type';
import { PaymentType } from '../../../../lib/enums/payment-type';
import { DocumentStatus } from '../../../../lib/enums/document-status.enum';
import { ModalErrorType } from '../../../../lib/enums/modal-error-type.enum';
import { EMenuID } from '../../../../lib/enums/emenu-id.enum';
import { VendorService } from '../../../../services/vendor.service';
import { InisiasiService } from '../../../../services/stock/inisiasi.service';
import { ProductCategoryService } from '../../../../services/product/product-category.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ProductJenisService } from '../../../../services/product/product-jenis.service';
import { ProductPurityService } from '../../../../services/product/product-purity.service';
import { ProductGoldColorService } from '../../../../services/product/product-gold-color.service';
import { ProductDiamondColorService } from '../../../../services/product/product-diamond-color.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { ProductClarityService } from '../../../../services/product/product-clarity.service';
import { DataTypeUtil } from '../../../../lib/helper/data-type-util';
import { OrderStatus } from '../../../../lib/enum/order-status';
import { ServerDateTimeService } from '../../../../services/system/server-date-time.service';
import { JurnalInisiasiService } from '../../../../services/keuangan/jurnal/stock/jurnal-inisiasi.service';
import { BankService } from '../../../../services/transaction/bank.service';

@Component({
  selector: 'detail-inisiasi-perhiasan',
  templateUrl: './detail-inisiasi-perhiasan.component.html',
  styleUrls: ['./detail-inisiasi-perhiasan.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
// @DContent(InisiasiComponent.key)
export class DetailInisiasiPerhiasanComponent extends BasePersistentFields implements OnInit, AfterViewInit
{
  @ViewChild('container', { read: ViewContainerRef}) container : ViewContainerRef;

  @ViewChild('inisiasi') searchForm : any;
  // @ViewChild('inisiasi', {static: false}) inisiasi : NgForm;
  @ViewChild('product') product : ElementRef;

  @ViewChild('Perhiasan', {static:false}) perhiasanInput : TemplateRef<any>;
  @ViewChild('Mulia', {static:false}) muliaInput : TemplateRef<any>;
  @ViewChild('Berlian', {static: false}) berlianInput : TemplateRef<any>;
  @ViewChild('Adiratna', {static: false}) adiratnaInput : TemplateRef<any>;
  @ViewChild('Souvenir', {static: false}) souvenirInput : TemplateRef<any>;
  @ViewChild('Gift', {static: false}) giftInput : TemplateRef<any>;
  @ViewChild('Dinar', {static: false}) dinarInput : TemplateRef<any>;

  btoa = btoa;
  parseInt = parseInt;
  console = console;
  Object = Object;

  user : any = {};
  unit : any = {};
  date : string = "";
  time : string = "";

  datas : any[] = [];

  products : any[] = [];
  vendors : any[] = [];
  jeniss : any[] = [];
  kadars : any[] = [];
  warnas : any[] = [];

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
    return {
      nomor_nota : null, tgl_inisiasi : this.date,  harga_baku : 0, pajak : 0, 
      create_date : this.date, create_time : this.time,
      'product-category' : null, vendor : null, tipe_bayar : null,
      total_berat : 0, total_piece : 0, total_baku_tukar : 0, total_gram_tukar : 0,
      total_ongkos : 0, total_pajak : 0, total_harga : 0,
      items : []
    };
  }

  defaultItem() :any
  {
    return {
      sku : null, 'product-purity' : null, 'product-gold-color' : null,
      'product-jenis' : null, pieces : 0,
      berat : 0, baku_tukar : 0, gram_tukar : 0, ongkos : 0, pajak : 0 }
  }

  InitiationType = Object.values(InitiationType);
  PaymentTypeValues = Object.values(PaymentType);
  PaymentType = PaymentType;
  DocumentStatus = Object.values(DocumentStatus);
  ErrorType = ModalErrorType;


  modalOpen = false;
  errorTitle = "";
  errorType = "";
  errorMessage = "";

  errorHappened : boolean = false;

  static key = EMenuID.INISIASI;

  GetDisplayName(key : string) : string
  {
    let name = "No Name Found";

    key = key.toLowerCase();

    switch(key)
    {
      case 'pajak':
        name = "Pajak";
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
    // private resolver : ComponentFactoryResolver,
    private dateService : ServerDateTimeService,
    // private unitService : UnitService,
    private jenisService : ProductJenisService,
    private kadarService : ProductPurityService,
    private gColorService : ProductGoldColorService,
    private vendorService : VendorService,
    private inisiasiService : InisiasiService,
    private productCatService : ProductCategoryService,
    // private logService : LogService,

    private bankService : BankService,
    private jurnalInisiasi : JurnalInisiasiService,
    private toastr : ToastrService,
    private session : SessionService)
  {
    super();
  }

  async ngOnInit(): Promise<void>
  {
    await this.LoadDate();

    this.input = this.defaultInput();
    this.selected = this.defaultItem();
    this.user = this.session.getUser();
    this.unit = this.session.getUnit();
    // this.selected = this.defaultInput();
    // console.log("user",this.user);
    
    // window['perhiasan'] = this.perhiasanInput;

    await this.LoadAllParameter();

    // NotificationUtil.Show(Notification.ERROR("fade", NotificationSize.DEFAULT))

    // ModalOutlet.AddModal('inisiasi-detail');

    this.onProductChanged();
  }

  async LoadDate()
  {
    let dt = await this.dateService.task("").toPromise();
    if(dt == false)
    {
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
    let products = await this.productCatService.list("?code=c00").toPromise();

    console.log(products);

    for(let i = 0; i < products.length; i++)
    {
      this.products.push(products[i]);
    }
    this.products.sort((a, b) => ('' + a.name).localeCompare(b.name));
  }

  async LoadJenis()
  {
    let jeniss = await this.jenisService.list("?product-category.code=c00").toPromise();
    for(let i = 0; i < jeniss.length; i++)
    {
      this.jeniss.push(jeniss[i]);
    }
    this.jeniss.sort((a,b) => ('' + a.name).localeCompare(b.name));
  }

  async LoadKadar()
  {
    let kadars = await this.kadarService.list("?").toPromise();
    for(let i = 0; i < kadars.length; i++)
    {
      this.kadars.push(kadars[i]);
    }
    this.kadars.sort((a,b) => parseInt(a.name) - parseInt(b.name))
  }

  async LoadGWarna()
  {
    let warnas = await this.gColorService.list("?").toPromise();
    for(let i = 0; i < warnas.length; i++)
    {
      this.warnas.push(warnas[i]);
    }
    this.warnas.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }

  async LoadVendor()
  {
    let vendors = await this.vendorService.list("?product-category.code=c00").toPromise();
    for(let i = 0; i < vendors.length; i++)
    {
      this.vendors.push(vendors[i]);
    }
    this.vendors.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }

  async LoadBanks()
  {
    let banks = await this.bankService.list("?").toPromise();
    for(let i = 0; i < banks.length; i++)
    {
      this.banks.push(banks[i]);
    }
    this.banks.sort((a,b) => ('' + a.name).localeCompare(b.name))
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
    
    this.onProductChanged();
  }

  ngAfterViewInit()
  {
    window['perhiasan'] = this.perhiasanInput;
  }

  async ResetAll()
  {
    await this.LoadDate();
    let tmpInput = this.defaultInput();
    Object.assign(this.input, tmpInput);
  }

  onProductChanged()
  {
    this.input['create_date'] = this.date;

    for(let i = 0; i < this.products.length; i++)
    {
      let perhiasan = this.products[i];
      if(perhiasan.code == "c00")
      {
        this.input['product-category'] = perhiasan;
        break;
      }
    }
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
      this.openMessageBox(ModalErrorType.ERROR, "Pencarian Gagal", "Model null")
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
    if(this.errorHappened)
    {
      this.toastr.error("Sebelumnya ada error terjadi. Harap Refresh halaman, apabila masih terjadi harap hubungi IT Support/Helpdesk");
      return;
    }

    if(this.validateInput()) return;

    if(this.input.items?.length <= 0) {
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
      this.toastr.warning("Unit dari User belum di-Assign. Harap hubungi IT Support/Helpdesk.", "Error!");
      return;
    }

    let PO = "PO" + this.user.unit.code + date_split[0].substring(1, 3) + date_split[1] + "[0,5]";

    let def = 
    {
      no_po : PO,
      __format : "no_po:inc",
      create_date : this.input['create_date'],
      create_time : time,
      create_by : this.user.username,
      unit : this.user.unit.code,
      order_status : OrderStatus.SUBMIT.code,
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
      if(output == false)
      {
        this.toastr.error("Inisiasi gagal. Harap hubungi IT Support/Helpdesk. Reason: " + this.inisiasiService.message());
        return;
      } else {
        this.toastr.success("Inisiasi Berhasil. Harap hubungi Kepala Departemen untuk melakukan Approval. No. PO : " + output.no_po, "Info", {disableTimeOut : true, tapToDismiss : false, closeButton : true});
        console.log(output,'ts');
        this.ResetAll();
        // this.doAccounting(output._id);
      }
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

  validateInput()
  {
    for(let key in this.input)
    {
      if(key == 'total_pajak' && this.input['tipe_bayar'] == PaymentType.UANG.code)
      {
        continue;
      }

      if(key == 'bank' && this.input.tipe_bayar == PaymentType.MAKLON.code) continue;

      if(key == 'bank' && this.input.asal_uang == 'kas') continue;

      if(key == 'asal_uang' && this.input.tipe_bayar == PaymentType.MAKLON.code) continue;

      if(key == 'asal_uang' && this.input.tipe_bayar == PaymentType.MAKLON.code) continue;

      let value = this.input[key];
      console.log(value, key, 'key')
      if(value == null || value == "null" || value <= 0 || (typeof value === 'number' && value <= 0))
      {
        this.toastr.warning(this.GetDisplayName(key) + " belum diisi / sama dengan 0 ");
        return true
      }
    }

    return false
  }

  openMessageBox(type : string, title: string, message: string)
  {
    this.errorType = type
    this.errorTitle = title
    this.errorMessage = message
    this.modalOpen = true
  }

  ModelChange(key : string, event : any)
  {
    console.log("event", event);
    // this.searchModel[key] = event.
  }

  OnSelectedChange(event : any)
  {
    // let target = event;
    // console.log("tgt", target, target.value);
  }

  validateAdd(item : any)
  {
    for(let key in item)
    {
      if(key == 'pajak' && this.input.tipe_bayar == PaymentType.UANG.code)
      {
        continue;
      }

      if(item[key] == null || item[key] == "null")
      {
        this.toastr.warning(this.GetDisplayName(key) + ' belum diisi.', "Peringatan!");
        return true;
      }

      if(item[key] <= 0)
      {
        this.toastr.warning(this.GetDisplayName(key) + ' kurang dari atau sama dengan 0', "Peringatan!");
        return true;
      }
    }

    return false;
  }

  onAddItem()
  {
    if(this.input['product-category'] == null || this.input['vendor'] == null)
    {
      this.toastr.warning("Kategori Produk atau Vendor belum diisi");
      return;
    }

    let tempItem = this.defaultItem();
    
    Object.assign(tempItem, this.selected);

    if(this.validateAdd(tempItem))
    {
      return;
    }
    
    this.input['items'].push(tempItem);

    for(let i = 0; i < this.input.items.length; i++)
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
    if(this.input == null) return 0;
    let berat = 0.0;
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i].berat == null || this.input.items[i].berat == "null")
        continue;
      berat += parseFloat(this.input.items[i].berat);
    }
    this.input['total_berat'] = berat;
    return berat;
  }

  getPiecesFromItems()
  {
    if(this.input == null) return 0;
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
    if(this.input == null) return 0;
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
    if(this.input == null) return 0;
    let value = 0;
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i]?.gram_tukar == null || this.input.items[i]?.gram_tukar == "null")
        continue;
      
      value += parseFloat(this.input.items[i].gram_tukar);
    }

    this.input['total_gram_tukar'] = Math.round(value*100) / 100;
    return value;
  }
  
  getOngkosFromItems()
  {
    if(this.input == null) return 0;
    let value = 0;
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i]?.ongkos == null || this.input.items[i]?.ongkos == "null")
        continue;
        value += parseFloat(this.input.items[i].ongkos);
    }

    this.input['total_ongkos'] = value;
    return value;
  }
  
  getPajakFromItems()
  {
    if(this.input == null) return 0;
    let value = 0;
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i]?.pajak == null || this.input.items[i]?.pajak == "null")
        continue;
        value += parseFloat(this.input.items[i].pajak);
    }

    this.input['total_pajak'] = value;
    return value;
  }
  
  totalHargaStyleValid()
  {
    if(this.hitungTotalHarga() > 0) return {};

    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
  }

  totalDPPStyleValid()
  {
    if(this.hitungTotalDPP() > 0) return {};
    
    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
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
    if(this.getPajakFromItems() > 0) return {}; // valid

    if(this.input != null)
    {
      if(this.input['tipe_bayar'] == PaymentType.UANG.code)
      {
        return {}; // valid
      }
    }

    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
  }

  hitungAllPajak()
  {
    for(let i = 0; i < this.input.items.length; i++)
    {
      let item = this.input.items[i];

      this.hitungPajak(item);
      console.log(item)
    }
    
    this.hitungPajak();
  }

  hitungPajak(item? : any)
  {
    if(this.input == null)
    {
      return 0;
    }
    if(this.input['tipe_bayar'] == PaymentType.UANG.code)
    {
      return 0;
    }

    item = item == null ? this.selected : item;
    let ongkos : number = item.ongkos;
    let hpajak : number= this.input?.pajak;
    let gram_tukar : number= item.gram_tukar;

    if(ongkos == null || hpajak == null || gram_tukar == null) return 0;
    
    let persenPajak = 2.00;

    let pajakItem : number = (ongkos/1000) * gram_tukar * hpajak * persenPajak / 100;
    item.pajak = Math.round(pajakItem);
    console.log(pajakItem)
    return item.pajak;
  }

  hitungHarga()
  {

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

  onKadarChanged(item)
  {
    item = item ? item : this.selected;

    this.hitungOngkos(item);
    this.hitungGramTukar(item);
  }

  onBeratChanged(item)
  {
    item = item ? item : this.selected;

    this.hitungPajak(item);
    this.hitungGramTukar(item);
  }
  
  onGramTukarChanged(item)
  {
    item = item ? item : this.selected;

    this.hitungPajak(item);
    this.hitungTotalHarga();
  }

  onBakuTukarChanged(item)
  {
    this.hitungOngkos(item);
    this.hitungGramTukar(item);
    this.hitungPajak(item);
  }

  hitungOngkos(item)
  {
    item = item ? item : this.selected;

    let kadar = Number(item['product-purity'].name);
    let baku_tukar = Number(item['baku_tukar']);

    item.ongkos = baku_tukar - kadar;
  }

  hitungGramTukar(item)
  {
    item = item ? item : this.selected;

    let berat = Number(item.berat);
    let baku_tukar = Number(item.baku_tukar);

    item.gram_tukar = baku_tukar * berat / 1000;
    item.gram_tukar = Math.round(Number(item.gram_tukar.toFixed(2) * 100)) / 100;
    console.log(item.gram_tukar);
  }

  hitungTotalHarga()
  {
    let hbaku = Number(this.input['harga_baku']);
    let total_gram_tukar = this.getGramTukarFromItems();

    this.input['total_harga'] = Math.round(hbaku * total_gram_tukar);
    return this.input['total_harga'];
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

    this.input['total_dpp'] = total_harga;
    return this.input['total_dpp'];
  }
}
