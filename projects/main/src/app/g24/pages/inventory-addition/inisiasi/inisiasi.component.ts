import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, ElementRef, AfterViewInit, TemplateRef, ChangeDetectionStrategy, ViewContainerRef, Output } from '@angular/core';
import { DContent } from 'src/app/decorators/content/pages';
import { EMenuID } from 'src/app/lib/enums/emenu-id.enum';
import { NgForm } from '@angular/forms';
import { BasePersistentFields } from 'src/app/lib/base/base-persistent-fields';
import { ProductCategoryService } from 'src/app/services/resource/product-category.service';
import { JenisService } from 'src/app/services/resource/jenis.service';
import { KadarService } from 'src/app/services/resource/kadar.service';
import { GoldColorService } from 'src/app/services/resource/gold-color.service';
import { VendorService } from 'src/app/services/resource/vendor.service';
import { SessionService } from 'src/app/lib/common/session.service';
import { DenomService } from 'src/app/services/resource/denom.service';
import { ShapeService } from 'src/app/services/resource/shape.service';
import { DiamondColorService } from 'src/app/services/resource/diamond-color.service';
import { ClarityService } from 'src/app/services/resource/clarity.service';
import { ToastrService } from 'ngx-toastr';
import { LogService } from 'src/app/services/resource/log.service';
import { DateService } from 'src/app/services/resource/date.service';

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
    private jenisService : JenisService,
    private kadarService : KadarService,
    private gColorService : GoldColorService,
    private dColorService : DiamondColorService,
    private vendorService : VendorService,
    private denomService : DenomService,
    private shapeService : ShapeService,
    private clarityService : ClarityService,
    private productCatService : ProductCategoryService,
    private dateService : DateService,

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
    let vendors = await this.vendorService.list("?").toPromise();
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
    // this.LoadVendor();
    // this.LoadJenis();
    // this.LoadKadar();
    // this.LoadGWarna();
    // this.LoadColor()
    // this.LoadDenom();
    // this.LoadShape();
    // this.LoadClarity();

    
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
