import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, ElementRef, AfterViewInit, TemplateRef, ChangeDetectionStrategy, ViewContainerRef, Output } from '@angular/core';
import { DContent } from 'src/app/decorators/content/pages';
import { EMenuID } from 'src/app/lib/enums/emenu-id.enum';
import { NgForm, Form, FormGroup, FormBuilder } from '@angular/forms';
import { InitiationType } from 'src/app/lib/enums/initiation-type';
import { PaymentType } from 'src/app/lib/enums/payment-type';
import { ModalErrorType } from 'src/app/lib/enums/modal-error-type.enum';
import { DocumentStatus } from 'src/app/lib/enums/document-status.enum';
import { BasePersistentFields } from 'src/app/lib/base/base-persistent-fields';
import { UnitService } from 'src/app/services/resource/unit.service';
import { InisiasiService } from 'src/app/services/resource/inisiasi.service';
import { Modals } from 'src/app/decorators/modal/modals';

import * as stringify from "stringify-object-keys";
import { isArray } from 'util';
import { DataTypeUtil } from 'src/app/lib/helper/data-type-util';
import { ProductCategoryService } from 'src/app/services/resource/product-category.service';
import { JenisService } from 'src/app/services/resource/jenis.service';
import { KadarService } from 'src/app/services/resource/kadar.service';
import { GoldColorService } from 'src/app/services/resource/gold-color.service';
import { VendorService } from 'src/app/services/resource/vendor.service';
import { SessionService } from 'src/app/lib/common/session.service';
import { DenomService } from 'src/app/services/resource/denom.service';
import { CutService } from 'src/app/services/resource/cut.service';
import { AlphaNumeric } from 'src/app/lib/helper/alpha-numeric';
import { ShapeService } from 'src/app/services/resource/shape.service';
import { DiamondColorService } from 'src/app/services/resource/diamond-color.service';
import { ClarityModule } from '@clr/angular';
import { ClarityService } from 'src/app/services/resource/clarity.service';
import { NotificationUtil, Notification, NotificationSize } from 'src/app/lib/helper/notification-util';
import { ModalOutlet, IModals } from 'src/app/lib/helper/modal-outlet';
import { DetailInitPerhiasanComponent } from 'src/app/modals/inisiasi/detail-init-perhiasan/detail-init-perhiasan.component';
import { EPriviledge } from 'src/app/lib/enums/epriviledge.enum';
import { EventEmitter } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { LogService } from 'src/app/services/resource/log.service';
import { DateService } from 'src/app/services/resource/date.service';

@Component({
  selector: 'detail-inisiasi-emas',
  templateUrl: './detail-inisiasi-emas.component.html',
  styleUrls: ['./detail-inisiasi-emas.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
// @DContent(InisiasiComponent.key)
export class DetailInisiasiEmasComponent extends BasePersistentFields implements OnInit, AfterViewInit
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

  datas : any[] = [];
  
  current_date : string = "";
  async CurrentDate() : Promise<string>
  {
    if(this.current_date == null || this.current_date == "")
    {
      this.current_date = await this.dateService.task().toPromise();
    }

    return this.current_date;
  }

  products : any[] = [];
  vendors : any[] = [];
  jeniss : any[] = [];
  kadars : any[] = [];
  warnas : any[] = [];
  denoms : any[] = [];
  series : any[] = [];
  colors : any[] = [];
  shapes : any[] = [];
  claritys : any[] = [];

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
  async defaultInput() : Promise<any>
  {
    let def = {
      nomor_nota : null, tgl_inisiasi : null,  harga_baku : 0, pajak : 0, 
      'product-category' : null, vendor : null, tipe_bayar : null,
      total_berat : 0, total_piece : 0, total_baku_tukar : 0, total_gram_tukar : 0,
      total_ongkos : 0, total_pajak : 0, total_harga : 0,
      items : []
    };
    let date : string = (await this.CurrentDate());
    def.tgl_inisiasi = date.split("T")[0];
    return 
  }

  defaultItem() :any
  {
    return {
      sku : null, 'product-purity' : null, 'product-jenis' : null, 'product-gold-color' : null, 
      berat : 0, baku_tukar : 0, gram_tukar : 0, ongkos : 0, pajak : 0 }
  }

  InitiationType = Object.values(InitiationType);
  PaymentType = Object.values(PaymentType);
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
    // private unitService : UnitService,
    private jenisService : JenisService,
    private kadarService : KadarService,
    private gColorService : GoldColorService,
    private dColorService : DiamondColorService,
    private vendorService : VendorService,
    private denomService : DenomService,
    private shapeService : ShapeService,
    private clarityService : ClarityService,
    private inisiasiService : InisiasiService,
    private productCatService : ProductCategoryService,
    private logService : LogService,
    private dateService : DateService,

    private toastr : ToastrService,
    private session : SessionService)
  {
    super();
  }

  async ngOnInit(): Promise<void>
  {
    this.input = this.defaultInput();
    this.user = this.session.getUser();
    // console.log("user",this.user);
    
    // window['perhiasan'] = this.perhiasanInput;

    await this.LoadAllParameter();

    // NotificationUtil.Show(Notification.ERROR("fade", NotificationSize.DEFAULT))

    // ModalOutlet.AddModal('inisiasi-detail');

    this.onProductChanged();
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
    let jeniss = await this.jenisService.list("?").toPromise();
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

  async LoadColor()
  {
    let colors = await this.dColorService.list("?").toPromise();
    for(let i = 0; i < colors.length; i++)
    {
      this.colors.push(colors[i]);
    }
    this.colors.sort((a,b) => ('' + a.name).localeCompare(b.name));
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

  async LoadDenom()
  {
    let denoms = await this.denomService.list("?").toPromise();
    for(let i = 0; i < denoms.length; i++)
    {
      this.denoms.push(denoms[i]);
    }
    this.denoms.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }
  
  async LoadShape()
  {
    let shapes = await this.shapeService.list("?").toPromise();
    for(let i = 0; i < shapes.length; i++)
    {
      this.shapes.push(shapes[i]);
    }
    this.shapes.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }
  
  async LoadClarity()
  {
    let claritys = await this.clarityService.list("?").toPromise();
    for(let i = 0; i < claritys.length; i++)
    {
      this.claritys.push(claritys[i]);
    }
    this.claritys.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }
  
  async LoadSeries()
  {
    let series = await this.clarityService.list("?").toPromise();
    for(let i = 0; i < series.length; i++)
    {
      this.series.push(series[i]);
    }
    this.series.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }

  async LoadAllParameter()
  {
    this.LoadProductCategory();
    this.LoadVendor();
    this.LoadJenis();
    this.LoadKadar();
    this.LoadGWarna();
    this.LoadColor()
    this.LoadDenom();
    this.LoadShape();
    this.LoadClarity();
    
    this.onProductChanged();
  }

  ngAfterViewInit()
  {
    window['perhiasan'] = this.perhiasanInput;
  }

  ResetAll(form2reset : NgForm)
  {
    this.formInput = null;
    this.input = this.defaultInput();
    form2reset.reset();
    console.log(form2reset.valid, this.input)
  }

  async onProductChanged()
  {
    this.input['create_date'] = (await this.CurrentDate()).split("T")[0];

    for(let i = 0; i < this.products.length; i++)
    {
      let emas = this.products[i];
      if(emas?.code.includes("05"))
      {
        this.input['product-category'] = emas;
        break;
      }
    }
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

    if(model.init_no == "")
    {
      return false;
    }

    return true;
  }

  async doSave()
  {
    if(this.validateInput()) return;

    if(this.input.items?.length <= 0) {
      this.toastr.warning("Tidak ada item pada Tabel Input Detail.", "Peringatan!");
      return;
    }


    let sNow = (await this.CurrentDate()).split("T");
    let date = sNow[0];
    let time = sNow[1].split(".")[0];

    let no = this.input['init_no'];
    console.log(no, "no")

    if(this.user.unit == null)
    {
      this.toastr.warning("Unit dari User belum di-Assign. Harap hubungi IT Support/Helpdesk.", "Error!");
      return;
    }

    let def = 
    {
      // init_no : "PO" + this.user.unit.code + "",//"IN0000512",
      create_date : date,
      create_time : time,
      create_by : this.user.username,
      unit : this.user.unit.code,
      flag : "submit",
      __version : new Date().getMilliseconds(),
      __version_d : "0",
      // vendor : null,
      // 'product-category' : null,
    };
    let init = DataTypeUtil.Encode(def);

    this.inisiasiService.add(init).subscribe(output => {
      if(output != false)
      {
        this.toastr.error("Inisiasi gagal. Harap hubungi IT Support/Helpdesk. Reason: " + this.inisiasiService.message);
      }
    });
    // console.log(output);
  }

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
    let tempItem = {
      sku : null, 'product-purity' : null, 'product-jenis' : null, 'product-gold-color' : null, 
      berat : 0, baku_tukar : 0, gram_tukar : 0, ongkos : 0, pajak : 0};

    
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
    this.input['items']?.splice(this.selectedId, 1);
    this.onResetItem();
  }

  onResetItem()
  {
    this.selected = this.defaultItem();
  }

  getBeratFromItems()
  {
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
    let value = 0;
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i]?.gram_tukar == null || this.input.items[i]?.gram_tukar == "null")
        continue;
        value += parseInt(this.input.items[i].gram_tukar);
    }

    this.input['total_gram_tukar'] = value;
    return value;
  }
  
  getOngkosFromItems()
  {
    let value = 0;
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i]?.ongkos == null || this.input.items[i]?.ongkos == "null")
        continue;
        value += parseInt(this.input.items[i].ongkos);
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

    this.input['total_pajak'] = value;
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
    item = item == null ? this.selected : item;
    let ongkos : number = item.ongkos;
    let hpajak : number= this.input?.pajak;
    let berat : number= item.berat;

    if(ongkos == null || hpajak == null || berat == null) return 0;
    
    let persenPajak = 2.00;

    let pajakItem : number = (ongkos/1000) * berat * hpajak * persenPajak / 100; 
    item.pajak = Math.trunc(pajakItem);
    console.log(pajakItem)
    return this.selected.pajak;
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
}
