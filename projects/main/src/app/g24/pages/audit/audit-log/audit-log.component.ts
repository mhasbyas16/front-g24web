import { query } from '@angular/animations';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { DContent } from '../../../decorators/content/pages';
import { EMenuID } from '../../../lib/enums/emenu-id.enum';
import { EPriviledge } from '../../../lib/enums/epriviledge.enum';
import { ModalErrorType } from '../../../lib/enums/modal-error-type.enum';
import { StringHelper } from '../../../lib/helper/string-helper';
import { AuditLogService } from '../../../services/audit/audit-log.service';
import { ParameterLookupSearchDTO, ParameterLookupService } from '../../../services/system/parameter-lookup.service';
import { ServerDateTimeService } from '../../../services/system/server-date-time.service';
import { DetailAuditLogComponent } from './detail-audit-log/detail-audit-log.component';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.scss']
})
@DContent(AuditLogComponent.key)
export class AuditLogComponent implements OnInit {

  static key = EMenuID.AUDIT_LOG;

  constructor
  (
    private auditLogService : AuditLogService,
    private lookup : ParameterLookupService,
    private session : SessionService,
    private toastr : ToastrService,
    private dateService : ServerDateTimeService,
  ) 
  {

  }

  
  @ViewChild('detail_screen') modalItemTerima : DetailAuditLogComponent;
  btoa = btoa;
  parseInt = parseInt;
  console = console;
  Object = Object;
  
  user : any = this.session.getUser();
  unit : any = this.session.getUnit();

  datas : any[] = [];

  isQuery : boolean = false;

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
  formInput : TemplateRef<any> = null;

  // searchModel : Map<string, any> = new Map<string, any>();
  // input : any = {items : []};
  // defaultInput() : any
  // {
  //   return {
  //     nomor_nota : null, tgl_inisiasi : new Date().toISOString().split("T")[0],  harga_baku : 0, pajak : 0, 
  //     'product-category' : null, vendor : null, tipe_bayar : null,
  //     total_berat : 0, total_piece : 0, total_baku_tukar : 0, total_gram_tukar : 0,
  //     total_ongkos : 0, total_pajak : 0, total_harga : 0,
  //     items : []
  //   };
  // }
  
  initFormSearch()
  {
    let fg : FormGroup = new FormGroup({
      _id : new FormControl(""),
      create_date_start : new FormControl("", Validators.required),
      create_date_end : new FormControl(""),
      custom : new FormControl(""),
      user : new FormControl(""),
      query : new FormControl(""),
      collection : new FormControl("")
    });
    this.searchFG = fg

    return fg;
  }

  ErrorType = ModalErrorType;

  modalOpen = false;
  errorTitle = "";
  errorType = "";
  errorMessage = "";

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

  GetDisplayValue(object : any) : string
  {
    // console.log(typeof object)
    if(object == null) return "null";
    if(typeof object == 'string' || typeof object == 'number' || typeof object == 'undefined') return object.toString();

    return object.name;
  }

  date : string = "";
  async ngOnInit(): Promise<void> {
    this.lookup.loadByCode("log-field-name");
    this.lookup.loadByCode("order-status");
    await this.lookup.loadByCode("order-status");
    this.user = this.session.getUser();
    window['slc'] = this.selected
    await this.LoadAllParameter();

    this.initFormSearch();
    this.ResetAll(null);
  }

  async loadDate()
  {
    this.date = await this.dateService.task().toPromise();
  }


  async LoadAllParameter()
  {
    await this.loadDate();
  }

  ResetAll(form2reset : FormGroup)
  {
    this.formInput = null;
    this.searchFG.reset();

    this.searchFG.get("create_date_start").setValue(this.formatDate(new Date(this.date)))
  }

  formatDate(date : Date) : string
  {
    let res = "";
    let d = date.getDate();
    let m = date.getMonth() + 1;
    let y = date.getFullYear();
    res = m + "/" + d + "/" + y;
    console.log(d, m ,y, date)
    return res;
  }

  loading = false;
  doSearch(form : FormGroup)
  {
    while(this.datas.length > 0) this.datas.pop(); // clear datas

    let query_p : string = this.searchFG.get("query").value;
    query_p = query_p == null ? "" : "&" + query_p;

    let coll_p : string = this.searchFG.get("collection").value;
    coll_p = coll_p == null ? "" : "&collection=" + coll_p;

    // let id_row_p : string = this.searchFG.get("id_row").value;
    // id_row_p = id_row_p == null ? "" : "&"

    let create_start = this.searchFG.get("create_date_start").value;
    create_start = StringHelper.StandardFormatDate("/", create_start, "MM/dd/yyyy");
    console.log(create_start)

    let create_end = this.searchFG.get("create_date_end").value;
    
    if((create_end != "") && (create_start == null || create_start == ""))
    {
      this.toastr.warning("Tanggal Inisiasi akhir kosong");
      return;
    }

    let create_p = "";
    if((create_start != "" && create_start != null) && (create_end != "" && create_end != null))
    {
      create_end = StringHelper.StandardFormatDate("/", create_end, "MM/dd/yyyy");
      create_p += "&_between=date&_start="+create_start+"&_end="+create_end;
    } 
    else if((create_start != "" || create_end != null))
    {
      create_p += "&date="+create_start;
    }

    let id_p = "";
    if(this.searchFG.get('_id').value != null && this.searchFG.get('_id').value != "")
    {
      id_p = "&_id=" + this.searchFG.get('_id').value;
    }

    let user_p = "";
    if(this.searchFG.get('user').value != null && this.searchFG.get('user').value != "")
    {
      id_p = "&user=" + this.searchFG.get('user').value;
    }

    let params = "?" + create_p + user_p + id_p + "&" + query_p + coll_p;
    // params += "&unit="+ this.unit.code;
    
    this.loading = true;
    this.auditLogService.list(params).subscribe(output =>
    {
        if(output != false)
        {
          this.datas = output
          window['datas'] = this.datas;

          this.toastr.success("Data Found " + output.length, "Search Logs");
        } else if(output.length == 0) {

          this.toastr.show("Data not found.")
        
        } else {
          this.toastr.error("Terjadi kesalahan. Harap hubungi IT Support/Helpdesk. " + this.auditLogService.message(), "Error")
        }

        this.loading = false;
    }, error => {
      this.toastr.error(error.message, "Error!");
      this.loading = false
      return;
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

  openMessageBox(type : string, title: string, message: string)
  {
    this.errorType = type
    this.errorTitle = title
    this.errorMessage = message
    this.modalOpen = true
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

  onLihat()
  {
    console.log(this.selected)
    if(this.selected == null || Object.keys(this.selected).length === 0)
    {
      this.toastr.warning("Mohon pilih Item.");
      return;
    }

    this.toastr.info("Loading...");
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
