import { Component, OnInit, ViewChild } from '@angular/core';
import { InisiasiService } from 'projects/main/src/app/g24/services/stock/inisiasi.service';
import { ToastrService } from 'ngx-toastr';
import { FlagProduct, TipeStock, LocationProduct } from 'projects/main/src/app/g24/lib/enum/flag-product';
import { EPriviledge } from 'projects/main/src/app/g24/lib/enums/epriviledge.enum';
import { OrderStatus } from 'projects/main/src/app/g24/lib/enum/order-status';
import { ProductService } from 'projects/main/src/app/g24/services/product/product.service';
import { DataTypeUtil } from 'projects/main/src/app/g24/lib/helper/data-type-util';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { IDetailCallbackListener } from 'projects/main/src/app/g24/lib/base/idetail-callback-listener';
import { PaymentType } from 'projects/main/src/app/g24/lib/enums/payment-type';
import { LoadingSpinnerComponent } from 'projects/main/src/app/g24/nav/modal/loading-spinner/loading-spinner.component';
import { ServerDateTimeService } from 'projects/main/src/app/g24/services/system/server-date-time.service';
import { ParameterLookupSearchDTO, ParameterLookupService } from 'projects/main/src/app/g24/services/system/parameter-lookup.service';

/**
 * Penerimaan gift baru isi ke stock/product
 */
@Component({
  selector: 'detail-item-penerimaan-dinar',
  templateUrl: './detail-item-penerimaan-dinar.component.html',
  styleUrls: ['./detail-item-penerimaan-dinar.component.scss']
})
export class DetailItemPenerimaanDinarComponent implements OnInit {

  constructor
  (
    private toastr : ToastrService,
    private session : SessionService,
    private dateService : ServerDateTimeService,
    private lookup : ParameterLookupService,

    private inisiasiService : InisiasiService
  ) { }

  @ViewChild('spinner', {static: false}) spinner : LoadingSpinnerComponent;

  parentListener : IDetailCallbackListener;
  
  user : any = this.session.getUser();
  unit : any = this.session.getUnit();
  date : string = "";
  time : string = "";

  errorHappened : boolean = false;

  EPriviledge = EPriviledge;

  series : any[] = [];

  LoadAllParameter()
  {

  }
  
  async LoadDate()
  {
    let resp;
    let msg = "";
    try{
      resp = await this.dateService.task("").toPromise();
    } catch (err) {
      resp = false;
      msg = err.message;
    }

    if(resp == false)
    {
      this.errorHappened = true;
      if(msg == "") msg = this.dateService.message();
      this.doReset();
      this.Close();
      this.toastr.info("Gagal mengambil tanggal server. Error: " + msg);
      return;
    }

    let dtarr = resp.split("T");
    this.date = dtarr[0];
    this.time = dtarr[0].split("Z")[0];
  }

  isOpened : boolean = false;
  public get IsOpened()
  {
    return this.isOpened;
  }
  public set IsOpened(open : boolean)
  {
    this.isOpened = open
  }

  private title : string = "Detail Penerimaan Dinar";
  public get Title()
  {
    return this.title;
  }

  GetDisplayName(key : string) : string
  {
    let name = "";
    switch(key)
    {
      case PaymentType.UANG.code:
        name = PaymentType.UANG.name;
        break;

      case PaymentType.MAKLON.code:
        name = PaymentType.MAKLON.name;
        break;

        default:

    }
    return name;
  }

  // input
  inisiasi : any = null;
  public getItemsOfInisiasi() : any[]
  {
    return this.inisiasi == null ? [] : this.inisiasi.items;
  }
  // input

  public setId(id : string)
  {
    this.spinner.Open();
    if(id == null || id == "")
    {
      this.toastr.error("No ID is set.");
      this.Close();
      return;
    }

    this.inisiasiService.list("?_or=product-category.code=c06&no_po="+id).subscribe(output => 
    {
      this.spinner.Close();
      if(output != false)
      {
        if(output.length > 1)
        {
          this.toastr.error("Inisiasi dengan Nomor PO tersebut memiliki duplikat")
          this.Close();
          this.doReset();
          return;
        }
        else if(output.length === 0)
        {
          this.toastr.error("Nomor PO tidak ditemukan");
          this.Close();
          this.doReset();
          return;
        }

        this.onContentFound(output[0]);

        this.Open();
        this.toastr.info("Load success...!")
      } else {
        this.toastr.error("Search Inisiasi error. " + this.inisiasiService.message());
        this.Close();
        return;
      }
    })
  }

  public setParentListener(listener : IDetailCallbackListener)
  {
    this.parentListener = listener;
    console.debug(listener);
  }

  private Open() {
    this.isOpened = true;
  }

  Close()
  {
    this.isOpened = false;
  }

  doReset()
  {
    this.inisiasi = null;
    this.parentListener = null;
  }

  ngOnInit(): void {
    this.lookup.loadByCode("nama-bank");
  }
  
  GetDisplayValue(object : any) : string
  {
    // console.debug(typeof object)
    if(object == null) return "null";
    if(typeof object == 'string' || typeof object == 'number' || typeof object == 'undefined') return object.toString();

    return object.name;
  }

  // lanjut 
  defaultProduct()
  {
    return {
      _id : "", code : "", sku : "", nomor_nota : "",
      "product-category" : null, "product-denom" : null, "product-series" : null,
      berat : 0.00, ongkos_pieces : 0.0, unit : null,
      tipe_stock : "stock", vendor : null, flag : "stock", location : "",
      no_po : "", no_item_po : 0, no_index_products : 0,
      hpp_inisiasi : 0, hpp : 0, isTerima : false

    }
  }

  mode : EPriviledge = EPriviledge.READ;
  setMode(mode : EPriviledge)
  {
    this.mode = mode;
  }

  onContentFound(content : any)
  {
    this.inisiasi = content;

    if(this.inisiasi.order_status == OrderStatus.TERIMA_FULL.code && this.mode == EPriviledge.UPDATE)
    {
      this.doReset();
      this.Close();
      this.toastr.show("PO sudah di Terima Full.", "Terima says");
      return;
    }
    this.LoadAllParameter();

    this.fillItemsWithProducts();
    this.fillItemTerima();
  }

  fillItemTerima()
  {
    let items = this.inisiasi.items;
    for(let i = 0; i < items.length; i++)
    {
      let item = items[i];
      let products = item.products;
      for(let x = 0; x < products.length; x++)
      {
        let product = products[x];
        if(product.isTerima)
        {
          this.idTerima.set(product.no_item_po +"-"+ product.no_index_products, product);
        }
      }
    }
  }

  ts;
  onExpand(index)
  {
    this.toastr.info(index);
    this.ts = index
  }

  onBeratChanged(productIndex, itemIndex)
  {
    this.hitungHPP(productIndex, itemIndex);
  }

  onGramTukarChanged(productIndex, itemIndex)
  {
    this.hitungHPP(productIndex, itemIndex);
  }

  hitungHPP(productIndex, itemIndex)
  {
    let item = this.inisiasi.items[itemIndex];
    let product = item.products[productIndex];

    let hbaku = this.inisiasi.harga_baku;
    let berat = product.berat;
    let kadar = product['product-purity'].name;
    let ongkos = product.ongkos;
    let persenPPN = 2.00;

    let bahan_baku = Number(hbaku) * Number(berat) * (Number(kadar)/1000);
    let ongkos_desain = Number(hbaku) * (Number(ongkos)/1000) * berat;
    let ppn_desain = ongkos_desain * (persenPPN/100);
    ppn_desain = Math.trunc(ppn_desain);

    let hpp = bahan_baku + ongkos_desain + ppn_desain;

    product.hpp = hpp;
    product.hpp_inisiasi = hpp;

    if(isNaN(product.hpp))
    {
      this.toastr.error("HPP is NaN");
      return;
    }
  }

  fillItemsWithProducts()
  {
    let items = this.inisiasi.items;

    for(let i = 0; i < items.length; i++)
    {
      let item = items[i];
      item['products'] = item['products'] != null ? item['products'] : [];
      let products = item['products'];

      if(products.length == Number(item.pieces)) // kalau jumlah udah pas gausah generate item lagi
      {
        continue;
      }

      // generate all pieces if products empty or null
      let productLength : number = products.length;
      let init : number = productLength;
      
      for(let p = init; p < item.pieces; p++)
      {
        let def = this.defaultProduct();
        def.nomor_nota = this.inisiasi['nomor_nota'];
        def.sku = item['sku'];
        def['product-category'] = this.inisiasi['product-category'];
        def['vendor'] = this.inisiasi['vendor'];
        def["product-denom"] = item['product-denom'];
        def["product-series"] = item['product-series'];
        def.no_po = this.inisiasi['no_po'];
        def.ongkos_pieces = item['ongkos_pieces'];
        def.flag = FlagProduct.STOCK.code;
        def.tipe_stock = TipeStock.STOCK.code;
        def.location = LocationProduct.PUSAT.code;
        def.no_item_po = i;
        def.no_index_products = p;
        def.hpp_inisiasi = Number(item.total_harga) / item.pieces;
        def.hpp = def.hpp_inisiasi;
        def.unit = this.unit;

        products.push(def);
      }
    }
  }

  onDeleteProduct(itemsIndex, productIndex)
  {
    let product = this.inisiasi.items[itemsIndex][productIndex];

    if(product._id != null && product._id != "")
    {
      this.toastr.warning("Barang sudah masuk ke Stock", "Tidak dapat menghapus data.");
      return;
    }
  }

  /**
   * Validasi total berat pada `item` dengan jumlah field `berat` dari array `products` dari `item`
   * 
   * @param item - Bulk item dari Inisiasi yang akan diterima
   * @returns `true` if all fields are valid, `false` otherwise
   */
  validateBeratItem(item, index) : boolean
  {
    let total_berat = Number(item.berat);
    let products = item.products;
    let berat = 0.0;

    for(let i = 0; i < item.products.length; i++)
    {
      let pBerat : number = (isNaN(Number(products[i].berat)) ? 0 : Number(products[i].berat));
      berat += pBerat;
    }

    if(total_berat != berat)
    {
      this.toastr.warning("Total berat penerimaan Nomor item :" + index + " tidak sesuai.", "Berat not balanced");
      return false;
    }
    
    return true;
  }

  validateGramTukarItem(item, index)
  {
    let total_gram_tukar = Number(item.gram_tukar);
    let products = item.products;
    let gram_tukar = 0.0;

    for(let i = 0; i < item.products.length; i++)
    {
      let pGramTukar : number = (isNaN(Number(products[i].gram_tukar)) ? 0 : Number(products[i].gram_tukar));
      gram_tukar += pGramTukar;
    }

    if(total_gram_tukar != gram_tukar)
    {
      this.toastr.warning("Total Gram Tukar penerimaan Nomor item :" + index + " tidak sesuai.", "Gram Tukar not balanced");
      return false;
    }
    
    return true;
  }

  validateItems() : boolean
  {
    let items = this.inisiasi.items;
    for(let i = 0; i < items.length; i++)
    {
      let item = items[i];
      if(!this.validateBeratItem(item, i))
      {
        return false;
      }

      if(!this.validateGramTukarItem(item, i))
      {
        return false;
      }

      if(item.jenis == null || item.jenis == "")
      {
        this.toastr.warning("'Jenis' barang pada Bulk Item nomor :" + i + " belum diisi.");
        return false;
      }
    }

    return true;
  }

  validateInisiasi() : boolean
  {
    let items = this.inisiasi.items;
    for(let i = 0; i < items; i++)
    {
      let item = items[i];
      if(!this.validateBeratItem(item, i))
      {
        return false;
      }

      if(!this.validateGramTukarItem(item, i))
      {
        return false;
      }

      if(item.jenis == null || item.jenis == "")
      {
        this.toastr.warning("'Jenis' barang pada Bulk Item nomor :" + i + " belum diisi.");
        return false;
      }
    }

    return true;
  }

  async doTerima()
  {
    this.spinner.Open();
    if(this.mode == EPriviledge.READ)
    {
      this.toastr.info("Mode 'READ' only.");
      return;
    }

    // if(!this.validateItems())
    // {
    //   return;
    // }

    // if(!this.validateInisiasi())
    // {
    //   return;
    // }

    this.inisiasi.update_time = this.time;
    this.inisiasi.update_date = this.date;
    this.inisiasi.update_by = this.user;
    this.inisiasi['tgl_terima'] = this.date;
    this.inisiasi.terima_by = this.user;

    this.inisiasi.order_status = OrderStatus.TERIMA_FULL.code;

    console.debug(this.inisiasi);
    let tempInisiasi = {}
    Object.assign(tempInisiasi, this.inisiasi);
    DataTypeUtil.Encode(tempInisiasi);

    let msg = "";
    let inisiasi : any = false;
    try
    {
      inisiasi = await this.inisiasiService.TerimaDinar(tempInisiasi).toPromise();
    } catch (err) {
      msg = err.message;
      inisiasi = false;
    }

    this.spinner.Close();
    if(inisiasi == false)
    {
      if(msg == "") msg = this.inisiasiService.message();
      this.toastr.error("Update PO gagal. Harap hubungi IT Support/Helpdesk. Error : " + msg, "Error", {disableTimeOut : true, closeButton : true});
      this.parentListener.onAfterUpdate(this.inisiasi._id);
      this.doReset();
      this.Close();
      return;
    } else {
      Object.assign(this.inisiasi, tempInisiasi);
      console.debug(this.inisiasi);
      this.parentListener.onAfterUpdate(this.inisiasi._id);
      this.toastr.success("PO berhasil diterima.");
      this.doReset();
      this.Close();
    }
  }

  async doTolak(){
    if(this.mode == EPriviledge.READ)
    {
      this.toastr.info("Mode 'READ' only.");
      return;
    }

    if(!this.validateItems())
    {
      return;
    }

    if(!this.validateInisiasi())
    {
      return;
    }

    this.inisiasi.update_date = new Date().toISOString().split("T")[0];
    this.inisiasi.update_by = this.user.username;
    this.inisiasi['tgl_tolak'] = this.inisiasi.update_date;
    this.inisiasi.tolak_by = this.user.username;

    let tempInisiasi = {}
    Object.assign(tempInisiasi, this.inisiasi);
    DataTypeUtil.Encode(tempInisiasi);

    let inisiasi = await this.inisiasiService.update(tempInisiasi).toPromise();
    if(inisiasi == false)
    {
      this.toastr.error("Update PO gagal. Harap hubungi IT Support/Helpdesk.");
      return;
    } else {
      Object.assign(this.inisiasi, tempInisiasi);
      console.debug(this.inisiasi);
      this.parentListener.onAfterUpdate(this.inisiasi._id);
      this.toastr.success("PO berhasil ditolak");
      this.doReset();
      this.Close();
    }
  }

  checkNumber : number = 0;
  idTerima : Map<String,any>  = new Map<String,boolean>();
  onCheckAll(data)
  {
    console.debug(data)
    console.debug(this.idTerima)
    let products = data.products;
    let cekNum = this.checkNumber;
    let checked = 0;
    for(let i = 0; i < products.length; i++)
    {
      let product = products[i];
      let key = product.no_item_po + "-" + product.no_index_products;

      if(checked == cekNum && cekNum > 0 && data.checked) break;

      if(!this.idTerima.has(key))
      {
        if(!data.checked)
        {
          product.isTerima = data.checked;
          checked++;
          continue;
        }

        checked++;
        product.isTerima = data.checked;
      }
    }
  }

  isAlreadyTerima(product)
  {
    let key = product.no_item_po + "-" + product.no_index_products;

    if(this.mode == EPriviledge.READ) return true;

    if(this.idTerima.has(key))
    {
      console.debug(key, "key");
      return true;
    }

    return false;
  }

  GetDisplayNameFromLookupByCode(code : string, value_code : string) : string
  {
    if(!code)
    {
      return code;
    }

    let dto : ParameterLookupSearchDTO = new ParameterLookupSearchDTO();
    dto.code = code;
    dto.value_code = value_code;
    let name = code;
    name = this.lookup.getName(dto);
    return name;
  }
}
