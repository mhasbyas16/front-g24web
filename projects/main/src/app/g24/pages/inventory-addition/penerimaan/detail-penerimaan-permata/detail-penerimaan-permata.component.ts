import { Component, OnInit, ComponentFactoryResolver, ViewChild, ElementRef, AfterViewInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
import { DatePipe } from '@angular/common';
import { StringHelper } from '../../../../lib/helper/string-helper';
import { EPriviledge } from '../../../../lib/enums/epriviledge.enum';
import { OrderStatus } from '../../../../lib/enum/order-status';
import { DetailItemPenerimaanPermataComponent } from './detail-item-penerimaan-permata/detail-item-penerimaan-permata.component';
import { ServerDateTimeService } from '../../../../services/system/server-date-time.service';
import { ParameterLookupSearchDTO, ParameterLookupService } from '../../../../services/system/parameter-lookup.service';

@Component({
  selector: 'detail-penerimaan-permata',
  templateUrl: './detail-penerimaan-permata.component.html',
  styleUrls: ['./detail-penerimaan-permata.component.scss'],
  providers : [DatePipe]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPenerimaanPermataComponent extends BasePersistentFields implements OnInit, AfterViewInit
{
  @ViewChild('container', { read: ViewContainerRef}) container : ViewContainerRef;

  // @ViewChild('inisiasi', {static: false}) inisiasi : NgForm;
  @ViewChild('product') product : ElementRef;
  @ViewChild('item_terima') modalItemTerima : DetailItemPenerimaanPermataComponent;

  btoa = btoa;
  parseInt = parseInt;
  console = console;
  Object = Object;

  errorHappened : boolean = false;
  
  date : string = "";
  time : string = "";
  user : any = this.session.getUser();
  unit : any = this.session.getUnit();

  datas : any[] = [];

  products : any[] = [];
  vendors : any[] = [];
  jeniss : any[] = [];
  kadars : any[] = [];
  warnas : any[] = [];


  searchFG : FormGroup = this.initFormSearch();

  parentPage : number = 0;

  selected : any = {};
  get Selected()
  {
    // if(this.selected == null) this.selected = this.defaultItem();
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
    let date = this.date;

    return {
      nomor_nota : null, tgl_inisiasi : date,  harga_baku : 0, pajak : 0, 
      'product-category' : null, vendor : null, tipe_bayar : null,
      total_berat : 0, total_piece : 0, total_baku_tukar : 0, total_gram_tukar : 0,
      total_ongkos : 0, total_pajak : 0, total_harga : 0,
      items : []
    };
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
    // console.debug(typeof object)
    if(object == null) return "null";
    if(typeof object == 'string' || typeof object == 'number' || typeof object == 'undefined') return object.toString();

    return object.name;
  }

  constructor(
    private resolver : ComponentFactoryResolver,
    private dateService : ServerDateTimeService,

    // private unitService : UnitService,
    private jenisService : ProductJenisService,
    private kadarService : ProductPurityService,
    private gColorService : ProductGoldColorService,
    // private dColorService : ProductDiamondColorService,
    private vendorService : VendorService,
    // private denomService : ProductDenomService,
    // private shapeService : ShapeService,
    // private clarityService : ProductClarityService,
    private inisiasiService : InisiasiService,
    private productCatService : ProductCategoryService,
    // private logService : LogService,

    private lookup : ParameterLookupService,
    private toastr : ToastrService,
    private session : SessionService)
  {
    super();
  }

  ngAfterViewInit(): void {
  }

  initFormSearch() {
    let fg : FormGroup = new FormGroup({
      no_po : new FormControl(""),
      nomor_nota : new FormControl(""),
      create_date_start : new FormControl(""),
      create_date_end : new FormControl(""),
      tgl_bayar_start : new FormControl(""),
      tgl_bayar_end : new FormControl(""),
      order_status : new FormControl("")

    });
    this.searchFG = fg

    return fg;
  }

  async ngOnInit(): Promise<void>
  {
    this.lookup.loadByCode("order-status");
    this.input = this.defaultInput();
    this.user = this.session.getUser();
    window['slc'] = this.selected
    // console.debug("user",this.user);
    
    // window['perhiasan'] = this.perhiasanInput;

    await this.LoadAllParameter();

    this.initFormSearch();

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
    let products = await this.productCatService.list("?code=c03").toPromise();
    if(products == false)
    {
      this.errorHappened = true;
      let msg = this.vendorService.message();
      this.toastr.error("Gagal Loading 'Jenis Produk'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }
    console.debug(products);

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

    let jeniss = await this.jenisService.list("?").toPromise();
    if(jeniss == false)
    {
      this.errorHappened = true;
      let msg = this.vendorService.message();
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
    while(this.jeniss.length > 0)
    {
      this.jeniss.pop();
    }

    let kadars = await this.kadarService.list("?").toPromise();
    if(kadars == false)
    {
      this.errorHappened = true;
      let msg = this.vendorService.message();
      this.toastr.error("Gagal Loading 'Jenis Perhiasan'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
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
    while(this.warnas.length > 0)
    {
      this.warnas.pop();
    }

    let warnas = await this.gColorService.list("?").toPromise();
    if(warnas == false)
    {
      this.errorHappened = true;
      let msg = this.vendorService.message();
      this.toastr.error("Gagal Loading 'Warna Perhiasan'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }
    for(let i = 0; i < warnas.length; i++)
    {
      this.warnas.push(warnas[i]);
    }
    this.warnas.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }

  async LoadVendor()
  {
    while(this.vendors.length > 0)
    {
      this.vendors.pop();
    }

    let vendors = await this.vendorService.list("?product-category.code=c03").toPromise();
    if(vendors == false)
    {
      this.errorHappened = true;
      let msg = this.vendorService.message();
      this.toastr.error("Gagal Loading 'Vendor'. Harap Refresh halaman/Klik RESET di bawah, apabila kegagalan masih terjadi hubungi IT Support/Helpdesk. error:" + msg);
      return;
    }
    for(let i = 0; i < vendors.length; i++)
    {
      this.vendors.push(vendors[i]);
    }
    this.vendors.sort((a,b) => ('' + a.name).localeCompare(b.name))
  }

  async LoadDate()
  {
    this.date = "";
    this.time = "";
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

  async LoadAllParameter()
  {
    this.LoadProductCategory();
    this.LoadVendor();
    this.LoadJenis();
    this.LoadKadar();
    this.LoadGWarna();
    
    this.onProductChanged();
  }

  async ResetAll()
  {
    await this.LoadAllParameter();
    await this.LoadDate();
    this.input = this.defaultInput();
    // console.debug(form2reset, this.input)
  }

  onProductChanged()
  {
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

  loading = false;
  doSearch(form : FormGroup)
  {
    if(this.errorHappened)
    {
      this.toastr.error("Harap Refresh sebelumnya terjadi kesalahan.");
      return;
    }

    while(this.datas.length > 0) this.datas.pop(); // clear datas

    // console.dir(JSON.stringify(this.searchModel))
    window['fg'] = this.searchFG;
    window['ctrl'] = this.searchFG.controls;
    console.debug(this.searchFG.controls)
    if(!this.searchFG.get("order_status").valid || !this.searchFG.get("create_date_start").valid)
    {
      this.toastr.warning("Mohon isi semua data yang mandatory !!", "Form incomplete!");
      return;
    }

    let create_start = this.searchFG.get("create_date_start").value;
    create_start = StringHelper.StandardFormatDate("/", create_start, "MM/dd/yyyy");
    console.debug(create_start)

    let create_end = this.searchFG.get("create_date_end").value;
    
    if((create_end != "") && (create_start == null || create_start == ""))
    {
      this.toastr.warning("Tanggal Inisiasi akhir kosong");
      return;
    }

    let bayar_start = this.searchFG.get("tgl_bayar_start").value;

    let bayar_end = this.searchFG.get("tgl_bayar_end").value;
    if(((bayar_end != "" && bayar_end != null)) && (bayar_start == null && bayar_start == ""))
    {
      this.toastr.warning("Tanggal Bayar akhir kosong");
      return;
    }

    let create_p = "";
    if((create_start != "" && create_start != null) && (create_end != "" && create_end != null))
    {
      create_end = StringHelper.StandardFormatDate("/", create_end, "MM/dd/yyyy");
      create_p += "&_between=tgl_inisiasi&_start="+create_start+"&_end="+create_end;
    } 
    else if((create_start != "" || bayar_start != null))
    {
      create_p += "&tgl_inisiasi="+create_start;
    }

    let bayar_p = "";
    if((bayar_start != "" && bayar_start != null))
    {
      bayar_start = StringHelper.StandardFormatDate("/",bayar_start, "MM/dd/yyyy");
    }

    if((bayar_end != "" && bayar_end != null) && (bayar_start != "" && bayar_start != null))
    {
      bayar_end = StringHelper.StandardFormatDate("/", bayar_end, "MM/dd/yyyy");
      bayar_p += "&_between=tgl_bayar&_start="+bayar_start+"&_end="+bayar_end;
    }
    else if((bayar_start != "" && bayar_start != null))
    {
      bayar_p += "&tgl_bayar="+bayar_start;
    }

    let order_status = this.searchFG.get("order_status").value;
    console.debug(order_status);
    let order_status_p = "";
    switch(order_status)
    {
      case '0':
        order_status_p = "&order_status="+ OrderStatus.APPROVAL.code;
        break;

      case '1':
        order_status_p = "&order_status=" + OrderStatus.TERIMA_PARTIAL.code;
        break;

      case '2':
        order_status_p = "&order_status=" + OrderStatus.TERIMA_FULL.code;
        break;

      default:
        this.toastr.error("Status Order tidak diketahui", "Error");
        return;
    }

    if(this.unit == null)
    {
      this.toastr.error("Unit Kerja kosong Harap refresh screen, jika error masih terjadi mohon hubungi IT Helpdesk/Support.");
      return;
    }

    let unit_p = "&unit=" + this.unit['code'];

    let params = "?product-category.code=c03&status_bayar=1" + bayar_p + create_p + order_status_p + unit_p;
    // params += "&unit="+ this.unit.code;
    
    this.loading = true;
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

          this.toastr.success("Data Found " + output.length, "Search Inisiasi");
        } else if(output.length == 0) {

          this.toastr.show("Data not found.")
        
        } else {
          this.toastr.error("Terjadi kesalahan. Harap hubungi IT Support/Helpdesk. " + this.inisiasiService.message(), "Error")
        }

        this.loading = false;
    })

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

  Debug()
  {
    console.debug(this.input, "model", this.selected);
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
    if(this.selected.order_status == "0") return;
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
      console.debug(value, key, 'key')
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
    console.debug("event", event);
    // this.searchModel[key] = event.
  }

  OnSelectedChange(event : any)
  {
    // let target = event;
    // console.debug("tgt", target, target.value);
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
      console.debug(item)
    }

    // this.onResetItem();
  }

  onDeleteItem()
  {
    let i = this.input['items'].indexOf(this.selected);
    console.debug(i)
    this.input['items']?.splice(this.selectedId, 1);
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

    this.input['total_gram_tukar'] = value;
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
      console.debug(item)
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
    console.debug(pajakItem)
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

  onTerima()
  {
    if(this.selected.order_status == 'terima_full')
    {
      this.toastr.show("PO sudah di Terima Full.", "Terima says");
      return;
    }

    if(this.selected == null || Object.keys(this.selected).length === 0)
    {
      this.toastr.warning("Mohon pilih Item.");
      return;
    }

    this.toastr.info("Loading...");

    // harus nya cek dulu ke DB user punya Priviledge kah. TBD

    this.modalItemTerima.setMode(EPriviledge.UPDATE);
    let tis = this;
    this.modalItemTerima.setParentListener(tis);
    this.modalItemTerima.setId(this.selected.no_po);
  }

  onLihat()
  {
    console.debug(this.selected)
    if(this.selected == null || Object.keys(this.selected).length === 0)
    {
      this.toastr.warning("Mohon pilih Item.");
      return;
    }

    this.toastr.info("Loading...");

    this.modalItemTerima.setMode(EPriviledge.READ);
    let tis = this;
    this.modalItemTerima.setParentListener(tis);
    this.modalItemTerima.setId(this.selected.no_po);
  }

  async doReset()
  {
    while(this.datas.length > 0) this.datas.pop();
    this.LoadAllParameter();

    
  }

  public onAfterAdd(any: any) {
    this.doReset();
  }
  public onAfterUpdate(any: any) {
    this.doReset();
  }
  public onAfterRead() {
    
  }

  public onCancel() {

  }

  GetDisplayNameFromLookup(code : string) : string
  {
    if(!code)
    {
      return code;
    }

    let dto : ParameterLookupSearchDTO = new ParameterLookupSearchDTO();
    dto.code = "order-status";
    dto.value_code = code;
    let name = code;
    name = this.lookup.getName(dto);
    return name;
  }
}
