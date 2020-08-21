import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, ElementRef, AfterViewInit, TemplateRef, ChangeDetectionStrategy, ViewContainerRef, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DContent } from '../../../decorators/content/pages';
import { BasePersistentFields } from '../../../lib/base/base-persistent-fields';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { ProductJenisService } from '../../../services/product/product-jenis.service';
import { ProductPurityService } from '../../../services/product/product-purity.service';
import { ProductGoldColorService } from '../../../services/product/product-gold-color.service';
import { ProductDiamondColorService } from '../../../services/product/product-diamond-color.service';
import { VendorService } from '../../../services/vendor.service';
import { ProductDenomService } from '../../../services/product/product-denom.service';
import { ProductClarityService } from '../../../services/product/product-clarity.service';
import { ProductCategoryService } from '../../../services/product/product-category.service';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { ServerDateTimeService } from '../../../services/system/server-date-time.service';

@Component({
  selector: 'app-inisiasi',
  templateUrl: './inisiasi.component.html',
  styleUrls: ['./inisiasi.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
@DContent(InisiasiComponent.key)
export class InisiasiComponent extends BasePersistentFields implements OnInit, AfterViewInit
{
  static key = EMenuID.INISIASI;

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

  selectedId : number;
  productSelected = "";

  // searchModel : Map<string, any> = new Map<string, any>();
  input : any = {items : []};
  defaultInput() : any
  {
    return {
      nomor_nota : null, tgl_inisiasi : this.current_date.split("T")[0],  harga_baku : 0, pajak : 0, 
      'product-category' : null, vendor : null, tipe_bayar : null,
      total_berat : 0, total_piece : 0, total_baku_tukar : 0, total_gram_tukar : 0,
      total_ongkos : 0, total_pajak : 0, total_harga : 0,
      items : []
    };
  }

  constructor(
    private resolver : ComponentFactoryResolver,
    // private unitService : UnitService,
    private jenisService : ProductJenisService,
    private kadarService : ProductPurityService,
    private gColorService : ProductGoldColorService,
    private dColorService : ProductDiamondColorService,
    private vendorService : VendorService,
    private denomService : ProductDenomService,
    // private shapeService : productsha,
    private clarityService : ProductClarityService,
    private productCatService : ProductCategoryService,
    private dateService : ServerDateTimeService,

    private session : SessionService)
  {
    super();
  }

  current_date : string;
  async ngOnInit(): Promise<void>
  {
    this.current_date = await this.dateService.task({}).toPromise();
    this.input = this.defaultInput();
    this.user = this.session.getUser();
    
    // window['perhiasan'] = this.perhiasanInput;

    await this.LoadAllParameter();

    this.onProductChanged();
  }

  async LoadProductCategory()
  {
    while(this.products.length > 0)
    {
      this.products.pop();
    }
    let products = await this.productCatService.list("?").toPromise();

    console.log(products);

    for(let i = 0; i < products.length; i++)
    {
      this.products.push(products[i]);
      if(this.products[i].code.includes('00'))
      {
        this.input['product-category'] = this.products[i];
        console.log(this.input);
      }
    }
    this.products.sort((a, b) => ('' + a.name).localeCompare(b.name));
  }

  async LoadAllParameter()
  {
    this.LoadProductCategory();

    
    this.onProductChanged();
  }

  ngAfterViewInit()
  {
    window['perhiasan'] = this.perhiasanInput;
  }

  ResetAll(form2reset : NgForm)
  {
    this.input = this.defaultInput();
    form2reset.reset();
    console.log(form2reset.valid, this.input)
  }

  onProductChanged()
  {
    this.input['create_date'] = this.current_date.split("T")[0];

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

}
