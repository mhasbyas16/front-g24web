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

  @ViewChild('Perhiasan', {static:false}) perhiasanInput : TemplateRef<any>;
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
  defaultInput() : any
  {
    let dt = new Date().toISOString().split("T")[0];
    return {
      nomor_nota : null, tgl_inisiasi : dt, create_date : dt,
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
      pieces : 0, ongkos_pieces : 0, total_ongkos : 0, pajak : 0,
      harga_piece : 0, total_harga : 0
    }
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
    let products = await this.productCatService.list("?code=c02").toPromise();

    console.log(products);

    for(let i = 0; i < products.length; i++)
    {
      this.products.push(products[i]);
    }
    this.products.sort((a, b) => ('' + a.name).localeCompare(b.name));
  }

  async LoadVendor()
  {
    let vendors = await this.vendorService.list("?product-category.code=c02").toPromise();
    for(let i = 0; i < vendors.length; i++)
    {
      this.vendors.push(vendors[i]);
    }
    this.vendors.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }

  async LoadDenom()
  {
    let denoms = await this.denomService.list("?product-category.code=c02").toPromise();
    for(let i = 0; i < denoms.length; i++)
    {
      this.denoms.push(denoms[i]);
    }
    this.denoms.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }
  
  async LoadSeries()
  {
    let series = await this.seriesService.list("?").toPromise();
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
    this.LoadDenom();
    this.LoadSeries();
    
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

  onProductChanged()
  {
    this.input['create_date'] = new Date().toISOString().split("T")[0];

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
      order_status : "submit",
      status_bayar : '1',
      __version : new Date().getMilliseconds(),
      __version_d : "0",
      items : this.input['items']
      // vendor : null,
      // 'product-category' : null,
    };
    Object.assign(def, this.input);
    let init = DataTypeUtil.Encode(def);

    this.inisiasiService.add(init).subscribe(output => {
      if(output == false)
      {
        this.toastr.error("Inisiasi gagal. Harap hubungi IT Support/Helpdesk. Reason: " + this.inisiasiService.message);
        return;
      } else {
        this.toastr.success("Inisiasi Berhasil. Harap hubungi Kepala Departemen untuk melakukan Approval. No. PO : " + output.no_po, "Info", {disableTimeOut : true, closeButton : true, tapToDismiss : false});
        this.input = this.defaultInput();
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
    let value = 0;
    for(let i = 0; i < this.input.items.length; i++)
    {
      if(this.input.items[i]?.gram_tukar == null || this.input.items[i]?.gram_tukar == "null")
        continue;
        value += parseInt(this.input.items[i].gram_tukar);
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
        value += parseInt(this.input.items[i].ongkos_pieces);
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

      this.countItemPajak(item);
      console.log(item)
    }
    
    this.countItemPajak();
  }

  pajakCounted : boolean = false;
  countItemPajak(item? : any)
  {
    this.pajakCounted = false;
    if(!item)
      item = this.Selected;
      
    let hpajak : number= this.input?.pajak;
    let ongkos : number = this.input?.ongkos_pieces;

    if(hpajak == null) return 0;
    
    let persenPajak = 2.00; // harusnya dari DB

    let pajakItem : number = 0;
    
    if(this.input.tipe_bayar == PaymentType.UANG.code)
      pajakItem = (item.total_harga * persenPajak/100);
    else
      pajakItem = ongkos * persenPajak/100;

    if(this.input.tipe_bayar == PaymentType.MAKLON.code && item.totalHarga != 0)
      this.pajakCounted = true;
    
    if(this.input.tipe_bayar == PaymentType.MAKLON.code && (ongkos != 0 || ongkos != null))
      this.pajakCounted = true;
    
    item.pajak = Math.trunc(pajakItem);
    console.log(pajakItem);
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
  }

  onOngkosChanged()
  {
    this.countItemTotalOngkos();
    this.countItemHargaPiece();
    this.countItemTotalHarga();
  }

  onHargaBakuChanged()
  {
    for(let item in this.input['items'])
    {
      this.countItemTotalBerat();
      this.countItemTotalOngkos();
      this.countItemHargaPiece();
      this.countItemTotalHarga();
      this.countItemPajak();
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
    let ongkos_pieces = item['ongkos_pieces'];
  
    item['total_ongkos'] = parseFloat(pieces) * parseFloat(ongkos_pieces);
  }

  countItemTotalBerat(item? : any)
  {
    if(!item)
      item = this.Selected;
    let pieces = item['pieces'];
    let denom = item['product-denom']?.value;

    item['total_berat'] = Number((parseFloat(pieces) * parseFloat(denom)).toFixed(2));
  }

  countItemHargaPiece(item? : any)
  {
    if(!item)
      item = this.Selected;

    let harga_baku = this.input['harga_baku'];
    let denom = item['product-denom']?.value;
    let ongkos_pieces = item['ongkos_pieces'];
    let persenPajak = 2;

    item['harga_piece'] = ( (parseFloat(denom) * parseFloat(harga_baku)) +  parseFloat(ongkos_pieces) ) * ( (100 + persenPajak)/100 );
    console.log(item, 'item harga piece');
  }

  countItemTotalHarga(item? : any)
  {
    if(!item)
      item = this.Selected;

    let pieces = item['pieces'];
    let harga = item['harga_piece'];

    item['total_harga'] = parseInt(pieces) * parseInt(harga);
    console.log(item, 'item harga total', pieces, harga);
    this.countItemPajak(item);
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
    this.input['total_harga'] = value;

    return this.input['total_harga'];
  }

}
