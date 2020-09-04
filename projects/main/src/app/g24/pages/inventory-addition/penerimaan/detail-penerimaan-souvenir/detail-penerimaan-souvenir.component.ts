import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, ElementRef, AfterViewInit, TemplateRef, ChangeDetectionStrategy, ViewContainerRef, Output } from '@angular/core';
import { NgForm, Form, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
import { DataTypeUtil } from '../../../../lib/helper/data-type-util';
import { ProductJenisService } from '../../../../services/product/product-jenis.service';
import { ProductPurityService } from '../../../../services/product/product-purity.service';
import { ProductGoldColorService } from '../../../../services/product/product-gold-color.service';
import { ProductDiamondColorService } from '../../../../services/product/product-diamond-color.service';
import { ProductDenomService } from '../../../../services/product/product-denom.service';
import { ProductClarityService } from '../../../../services/product/product-clarity.service';
import { DatePipe } from '@angular/common';
import { StringHelper } from '../../../../lib/helper/string-helper';
import { ModalOutlet } from '../../../../lib/helper/modal-outlet';
import { EPriviledge } from '../../../../lib/enums/epriviledge.enum';
import { OrderStatus } from '../../../../lib/enum/order-status';
import { OrdersModule } from '../../../orders/orders.module';
import { IDetailCallbackListener } from '../../../../lib/base/idetail-callback-listener';
import { DetailItemPenerimaanSouvenirComponent } from './detail-item-penerimaan-souvenir/detail-item-penerimaan-souvenir.component';
import { UnitService } from '../../../../services/system/unit.service';

@Component({
  selector: 'detail-penerimaan-souvenir',
  templateUrl: './detail-penerimaan-souvenir.component.html',
  styleUrls: ['./detail-penerimaan-souvenir.component.scss'],
  providers : [DatePipe]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPenerimaanSouvenirComponent extends BasePersistentFields implements OnInit, AfterViewInit
{
  @ViewChild('container', { read: ViewContainerRef}) container : ViewContainerRef;

  // @ViewChild('inisiasi', {static: false}) inisiasi : NgForm;
  @ViewChild('product') product : ElementRef;
  @ViewChild('item_terima') modalItemTerima : DetailItemPenerimaanSouvenirComponent;

  btoa = btoa;
  parseInt = parseInt;
  console = console;
  Object = Object;
  
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
    return {
      nomor_nota : null, tgl_inisiasi : new Date().toISOString().split("T")[0],  harga_baku : 0, pajak : 0, 
      'product-category' : null, vendor : null, tipe_bayar : null,
      total_berat : 0, total_piece : 0, total_baku_tukar : 0, total_gram_tukar : 0,
      total_ongkos : 0, total_pajak : 0, total_harga : 0,
      items : []
    };
  }

  defaultItem() :any
  {
    return {
      sku : null, 'product-denom' : null, 'product-series' : null,
      ongkos_pieces : 0, pajak : 0, vendor : null
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
    private inisiasiService : InisiasiService,
    private productCatService : ProductCategoryService,

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
    this.user = this.session.getUser();
    window['slc'] = this.selected
    // console.log("user",this.user);
    
    // window['perhiasan'] = this.perhiasanInput;

    await this.LoadAllParameter();

    this.initFormSearch();

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

  async LoadAllParameter()
  {
    this.LoadProductCategory();
    
    this.onProductChanged();
  }

  ResetAll(form2reset : FormGroup)
  {
    this.formInput = null;
    this.input = this.defaultInput();
    this.searchFG.reset();
    // form2reset.reset();
    console.log(form2reset, this.input)
  }

  onProductChanged()
  {
    for(let i = 0; i < this.products.length; i++)
    {
      let perhiasan = this.products[i];
      if(perhiasan.code == "c02")
      {
        this.input['product-category'] = perhiasan;
        break;
      }
    }
  }

  loading = false;
  doSearch(form : FormGroup)
  {
    while(this.datas.length > 0) this.datas.pop(); // clear datas

    // console.dir(JSON.stringify(this.searchModel))
    window['fg'] = this.searchFG;
    window['ctrl'] = this.searchFG.controls;
    console.log(this.searchFG.controls)
    if(!this.searchFG.get("order_status").valid || !this.searchFG.get("create_date_start").valid)
    {
      this.toastr.warning("Mohon isi semua data yang mandatory !!", "Form incomplete!");
      return;
    }

    let create_start = this.searchFG.get("create_date_start").value;
    create_start = StringHelper.StandardFormatDate("/", create_start, "MM/dd/yyyy");
    console.log(create_start)

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
    console.log(order_status);
    let order_status_p = "";
    switch(order_status)
    {
      case '0':
        order_status_p = "&order_status="+ OrderStatus.SUBMIT.code;
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

    let unit_p = this.unit['code'];

    let params = "?product-category.code=c02&status_bayar" + bayar_p + create_p + order_status_p + unit_p;
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
        value += parseFloat(this.input.items[i].gram_tukar);
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
        value += parseFloat(this.input.items[i].ongkos);
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
    console.log(this.selected)
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

  doReset()
  {
    while(this.datas.length > 0) this.datas.pop();
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
}
