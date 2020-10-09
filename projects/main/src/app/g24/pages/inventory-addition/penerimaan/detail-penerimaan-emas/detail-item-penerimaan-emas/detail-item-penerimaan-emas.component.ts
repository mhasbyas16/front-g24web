import { Component, OnInit, ViewChild } from '@angular/core';
import { InisiasiService } from 'projects/main/src/app/g24/services/stock/inisiasi.service';
import { ToastrService } from 'ngx-toastr';
import { TipeStock, LocationProduct } from 'projects/main/src/app/g24/lib/enum/flag-product';
import { EPriviledge } from 'projects/main/src/app/g24/lib/enums/epriviledge.enum';
import { OrderStatus } from 'projects/main/src/app/g24/lib/enum/order-status';
import { DataTypeUtil } from 'projects/main/src/app/g24/lib/helper/data-type-util';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { IDetailCallbackListener } from 'projects/main/src/app/g24/lib/base/idetail-callback-listener';
import { PaymentType } from 'projects/main/src/app/g24/lib/enums/payment-type';
import { LoadingSpinnerComponent } from 'projects/main/src/app/g24/nav/modal/loading-spinner/loading-spinner.component';
import { ServerDateTimeService } from 'projects/main/src/app/g24/services/system/server-date-time.service';

/**
 * Penerimaan gift baru isi ke stock/product
 */
@Component({
  selector: 'detail-item-penerimaan-emas',
  templateUrl: './detail-item-penerimaan-emas.component.html',
  styleUrls: ['./detail-item-penerimaan-emas.component.scss']
})
export class DetailItemPenerimaanEmasComponent implements OnInit {

  constructor
  (
    private toastr : ToastrService,
    private session : SessionService,
    private dateService : ServerDateTimeService,

    private inisiasiService : InisiasiService
  ) { }

  @ViewChild('spinner', {static: false}) spinner : LoadingSpinnerComponent;

  errorHappened : boolean = false;

  parentListener : IDetailCallbackListener;
  
  user : any = this.session.getUser();
  unit : any = this.session.getUnit();
  date : string = "";
  time : string = "";

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

  private title : string = "Detail Penerimaan Emas";
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
  items : any[] = [];
  public getItemsOfInisiasi() : any[]
  {
    if(this.items.length > 0)
    {
      return this.items;
    }

    this.items = this.inisiasi == null ? [] : this.inisiasi.items;
    if(this.items == null)
    {
      return null;
    }

    for(let i = 0; i < this.items.length; i++)
    {
      let item = this.items[i];

      item['last_terima'] = item.detail_terima;
      item['detail_terima'] = 0;
    }

    return this.items;
  }
  // input

  public setId(id : string)
  {
    this.inisiasi = null;
    this.items = [];

    if(id == null || id == "")
    {
      this.toastr.error("No ID is set.");
      this.Close();
      return;
    }

    this.spinner.Open();

    this.inisiasiService.list("?_or=product-category.code=c05&no_po="+id).subscribe(output => 
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
    }, error =>
    {
      this.toastr.error("jancuk");
      this.toastr.error(error.message);
      // throw error;
    })
  }

  public setParentListener(listener : IDetailCallbackListener)
  {
    this.parentListener = listener;
    console.log(listener);
    console.log(this.spinner)
  }

  private Open() {
    this.isOpened = true;
  }

  Close()
  {
    this.spinner.Close();
    this.isOpened = false;
  }

  doReset()
  {
    this.inisiasi = null;
    this.items = [];
    this.parentListener = null;
  }

  ngOnInit(): void {
  }
  
  GetDisplayValue(object : any) : string
  {
    // console.log(typeof object)
    if(object == null) return "null";
    if(typeof object == 'string' || typeof object == 'number' || typeof object == 'undefined') return object.toString();

    return object.name;
  }

  // lanjut 
  defaultProduct()
  {
    return {
      _id : "", code : "", sku : "",
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
    this.LoadDate();
    this.resetDetailTerima(this.inisiasi.items);

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

  resetDetailTerima(items : [])
  {
    for(let i = 0; i < items.length; i++)
    {
      let item : any = items[i];
      item['last_terima'] = item['detail_terima'];
      item['detail_terima'] = 0;
    }
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

  // onBeratChanged(productIndex, itemIndex)
  // {
  //   this.hitungHPP(productIndex, itemIndex);
  // }

  // onGramTukarChanged(productIndex, itemIndex)
  // {
  //   this.hitungHPP(productIndex, itemIndex);
  // }

  // hitungHPP(productIndex, itemIndex)
  // {
  //   let item = this.inisiasi.items[itemIndex];
  //   let product = item.products[productIndex];

  //   let hbaku = this.inisiasi.harga_baku;
  //   let berat = product.berat;
  //   let kadar = product['product-purity'].name;
  //   let ongkos = product.ongkos;
  //   let persenPPN = 2.00;

  //   let bahan_baku = Number(hbaku) * Number(berat) * (Number(kadar)/1000);
  //   let ongkos_desain = Number(hbaku) * (Number(ongkos)/1000) * berat;
  //   let ppn_desain = ongkos_desain * (persenPPN/100);
  //   ppn_desain = Math.trunc(ppn_desain);

  //   let hpp = bahan_baku + ongkos_desain + ppn_desain;

  //   product.hpp = hpp;
  //   product.hpp_inisiasi = hpp;

  //   if(isNaN(product.hpp))
  //   {
  //     this.toastr.error("HPP is NaN");
  //     return;
  //   }
  // }
  
  hargaBaku(){
    if(!this.inisiasi.harga_baku){
      return this.inisiasi["harga_baku"]=0;
    }
    return this.inisiasi["harga_baku"];
  }
  //   if(isNaN(product.hpp))
  //   {
  //     this.toastr.error("HPP is NaN");
  //     return;
  //   }
  // }

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
        def.sku = item['sku'];
        def['product-category'] = this.inisiasi['product-category'];
        def['vendor'] = this.inisiasi['vendor'];
        def["product-denom"] = item['product-denom'];
        def["product-series"] = item['product-series'];
        def.no_po = this.inisiasi['no_po'];
        def.ongkos_pieces = item['ongkos_pieces'];
        // def.flag = FlagProduct.STOCK.code;
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

  onDetailTerimaChanged(item, value, index)
  {
    // let it = this.inisiasi.items[index];
    // console.log(item, item.detail_terima, value.key, it, it == item)
    // if(item.detail_terima == null)
    // {
    //   item['detail_terima'] = 0;
    //   it['detail_terima'] = 0;
    // }
  }

  validateTotalTerima(item, index) : boolean
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
    for(let i = 0; i < items; i++)
    {
      let item = items[i];
      if(!this.validateTotalTerima(item, i))
      {
        return false;
      }

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

  validasiDetailTerima() : boolean
  {
    let items = this.inisiasi.items;

    let detailTerimaAllEmpty = true; // kalau detail_terima semua items 0 kena validasi

    for(let i = 0; i < items.length; i++)
    {
      let item = items[i];
      let detail_terima = Number(item.detail_terima);
      let total_terima = Number(item.total_terima);
      // let last_terima = Number(item.last_terima);
      let pieces = Number(item.pieces);
      console.log(detail_terima, detail_terima > 0, detailTerimaAllEmpty)
      console.log(item)

      if(detail_terima == null)
      {
        item.detail_terima = 0;
      }

      if(detail_terima > 0)
      {
        detailTerimaAllEmpty = false;
      }

      if(total_terima == pieces)
      {
        continue;
      }

      if((detail_terima + total_terima) > pieces)
      {
        this.toastr.warning("Total penerimaan melebihi jumlah yang dipesan pada nomor:" + (i + 1));
        return false;
      }
    }

    if(detailTerimaAllEmpty)
    {
      this.toastr.warning("Jumlah Diterima semua Order Item tidak boleh kosong. Setidaknya salah satu field 'Jumlah Diterima' Order harus terisi");
      return false;
    }

    return true;
  }

  verifyInisiasiPartial()
  {
    let items = this.inisiasi.items;

    let detailTerimaNotEmpty = true;
    let status_terima = OrderStatus.TERIMA_FULL.code;

    for(let i = 0; i < items.length; i++)
    {
      let item = items[i];
      let detail_terima = Number(item.detail_terima);
      let total_terima = Number(item.total_terima);
      // let last_terima = Number(item.last_terima);
      let pieces = Number(item.pieces);

      if((detail_terima + total_terima) < pieces) // cek kalau 'semua' items, jumlah diterima + total_terima = pieces, berarti terima_full
      {
        status_terima = OrderStatus.TERIMA_PARTIAL.code;
        break;
      }
    }

    this.inisiasi.order_status = status_terima;
  }

  async doSave()
  {
    this.spinner.Open();
    if(this.mode == EPriviledge.READ)
    {
      this.toastr.info("Mode 'READ' only.");
      this.doReset();
      this.Close();
      return;
    }

    if(!this.validateItems())
    {
      this.spinner.Close();
      return;
    }

    if(!this.validateInisiasi())
    {
      this.spinner.Close();
      return;
    }

    if(!this.validasiDetailTerima())
    {
      this.spinner.Close();
      return;
    }

    this.verifyInisiasiPartial();

    this.inisiasi.update_date = this.date;
    this.inisiasi.update_by = this.user.username;
    this.inisiasi['tgl_terima'] = this.inisiasi.update_date;
    this.inisiasi.terima_by = this.user.username;

    console.log(this.inisiasi);
    let tempInisiasi = {}
    Object.assign(tempInisiasi, this.inisiasi);
    
    DataTypeUtil.Encode(tempInisiasi);

    let inisiasi;
    let msg = "";
    try {
      inisiasi = await this.inisiasiService.TerimaEmas(tempInisiasi).toPromise();
    } catch (e) {
      inisiasi = false;
      msg = e.message
    }
      if(inisiasi == false)
      {
        if(msg == "") msg = this.inisiasiService.message();
        this.toastr.error("Update PO gagal. Harap hubungi IT Support/Helpdesk. Error:  " + msg);
        this.doReset();
        this.Close();
        return;
      } else {
        Object.assign(this.inisiasi, tempInisiasi);
        console.log(this.inisiasi);
        this.parentListener.onAfterUpdate(this.inisiasi._id);
        this.toastr.success("PO berhasil diterima.");
        this.doReset();
        this.Close();
        return;
      }
    // .subscribe(inisiasi => {
    //   if(inisiasi == false)
    //   {
    //     let msg = this.inisiasiService.message();
    //     this.toastr.error("Update PO gagal. Harap hubungi IT Support/Helpdesk. Error:  " + msg);
    //     this.doReset();
    //     this.Close();
    //     return;
    //   } else {
    //     Object.assign(this.inisiasi, tempInisiasi);
    //     console.log(this.inisiasi);
    //     this.parentListener.onAfterUpdate(this.inisiasi._id);
    //     this.toastr.success("PO berhasil diterima.");
    //     this.doReset();
    //     this.Close();
    //     return;
    //   }
    // }, error => {
    //   console.log(error);
    //   this.toastr.error("Error: " + error);
    //   this.doReset();
    //   this.Close();
    //   return;
    // }); // kalau semua diterima flag == "terima_full"
    
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
    this.inisiasi['tgl_terima'] = this.inisiasi.update_date;
    this.inisiasi.terima_by = this.user.username;

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
      console.log(this.inisiasi);
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
    console.log(data)
    console.log(this.idTerima)
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
      console.log(key, "key");
      return true;
    }

    return false;
  }
}
