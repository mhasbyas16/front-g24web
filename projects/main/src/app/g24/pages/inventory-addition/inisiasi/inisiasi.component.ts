import { Component, OnInit, ComponentFactoryResolver, ViewChild, Input, ElementRef, AfterViewInit, TemplateRef, ChangeDetectionStrategy } from '@angular/core';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { NgForm, Form, FormGroup } from '@angular/forms';
import { InitiationType } from '../../../lib/enums/initiation-type';
import { stringify } from 'querystring';
import { PaymentType } from '../../../lib/enums/payment-type';
import { ModalErrorType } from '../../..//lib/enums/modal-error-type.enum';
import { IF_ACTIVE_ID } from '@clr/angular/utils/conditional/if-active.service';
import { DocumentStatus } from '../../../lib/enums/document-status.enum';

@Component({
  selector: 'app-inisiasi',
  templateUrl: './inisiasi.component.html',
  styleUrls: ['./inisiasi.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@DContent(InisiasiComponent.key)
export class InisiasiComponent implements OnInit, AfterViewInit
{
  @ViewChild('inisiasi') searchForm : any;
  // @ViewChild('inisiasi', {static: false}) inisiasi : NgForm;
  @ViewChild('product') product : ElementRef;

  @ViewChild('Perhiasans', {static:false}) perhiasanInput : TemplateRef<any>;
  @ViewChild('Mulia', {static:false}) muliaInput : TemplateRef<any>;
  @ViewChild('Berlian', {static: false}) berlianInput : TemplateRef<any>;
  @ViewChild('Adiratna', {static: false}) adiratnaInput : TemplateRef<any>;
  @ViewChild('Souvenir', {static: false}) souvenirInput : TemplateRef<any>;
  @ViewChild('Gift', {static: false}) giftInput : TemplateRef<any>;
  @ViewChild('Dinar', {static: false}) dinarInput : TemplateRef<any>;

  datas : any[] = [];

  products : any[] = [];
  jeniss : any[] = [];
  kadars : any[] = [];
  warnas : any[] = [];
  denoms : any[] = [];
  series : any[] = [];
  cuts : any[] = [];
  colors : any[] = [];
  claritys : any[] = [];


  selected : any[] = [];
  productSelected = "";
  formInput : TemplateRef<any> = null;

  searchModel : any = {};

  InitiationType = Object.values(InitiationType);
  PaymentType = Object.values(PaymentType);
  DocumentStatus = Object.values(DocumentStatus);
  ErrorType = ModalErrorType;

  modalOpen = false;
  errorTitle = "";
  errorType = "";
  errorMessage = "";

  static key = EMenuID.INISIASI;

  constructor(private resolver : ComponentFactoryResolver)
  { }

  ngOnInit(): void
  {
    this.products = 
    [
      {code: "00", name: "Perhiasans"},
      {code: "01", name: "Berlian"},
      {code: "02", name: "Souvenir"},
      {code: "03", name: "Adiratna"},
      {code: "04", name: "Gift"},
      {code: "05", name: "Mulia"},
      {code: "06", name: "Dinar"}
    ]
    window['perhiasan'] = this.perhiasanInput;
    this.onProductChanged();
  }

  ngAfterViewInit()
  {
    window['perhiasan'] = this.perhiasanInput;
    this.onProductChanged();
  }

  ResetSearch(form2reset : NgForm)
  {
    this.formInput = null;
    this.searchModel = {};
    form2reset.reset();
  }

  onProductChanged()
  {
    if(this.product == null) return;
    // console.log(this.product.nativeElement.value)

    switch(this.product.nativeElement.value)
    {
      case "00":
        this.formInput = this.perhiasanInput;
        break;

      case "01":
        this.formInput = this.berlianInput;
        break;

      case "02":
        this.formInput = this.souvenirInput
        break;

      case "03":
        this.formInput = this.adiratnaInput;
        break;

      case "04":
        this.formInput = this.giftInput;
        break;

      case "05":
        this.formInput = this.muliaInput;
        break;
      
      case "06":
        this.formInput = this.dinarInput;
        break;

      default:
        this.formInput = null;
        break;
    }

    if(this.searchModel['init_type'] != InitiationType.STOCK.code)
    {
      this.formInput = null;
    }
    // console.log(this.formInput)
  }

  doSearch()
  {
    for(let d in this.InitiationType)
    {
      console.log(d)
    }
    console.dir(JSON.stringify(this.searchModel))
    if(!this.searchValid(this.searchModel))
    {
      return;
    }
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

  onAdd()
  {
    let data = {init_no: "IN0000512345678", init_type: {code: "stock", name: "Stock"}, create_date: "20-02-2020", create_time: "10:51:22", create_by: "K24068", product: {code: "01", name: "Perhiasan"}, tipe_bayar: "E", vendor: {code: "UB", name:"PT. UBS"}, total_berat: 15.00, total_quantity: 20}
    this.datas.push(data);
    this.validateSelection();
  }

  onDelete()
  {

  }

  onEdit()
  {
    if(this.selected.length != 1) return;
  }

  onExportAll()
  {

  }

  onExportSelected()
  {

  }

  validateSelection()
  {

  }

  openMessageBox(type : string, title: string, message: string)
  {
    this.errorType = type
    this.errorTitle = title
    this.errorMessage = message
    this.modalOpen = true
  }

}
