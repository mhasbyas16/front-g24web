import { Component, OnInit } from '@angular/core';
import { InisiasiService } from 'projects/main/src/app/g24/services/stock/inisiasi.service';
import { ProductPurityService } from 'projects/main/src/app/g24/services/product/product-purity.service';
import { ProductJenisService } from 'projects/main/src/app/g24/services/product/product-jenis.service';
import { ProductGoldColorService } from 'projects/main/src/app/g24/services/product/product-gold-color.service';
import { ToastrService } from 'ngx-toastr';
import { FlagProduct, TipeStock, LocationProduct } from 'projects/main/src/app/g24/lib/enum/flag-product';
import { EPriviledge } from 'projects/main/src/app/g24/lib/enums/epriviledge.enum';
import { OrderStatus } from 'projects/main/src/app/g24/lib/enum/order-status';
import { ProductService } from 'projects/main/src/app/g24/services/product/product.service';
import { DataTypeUtil } from 'projects/main/src/app/g24/lib/helper/data-type-util';
import { SessionService } from 'projects/platform/src/app/core-services/session.service';
import { IDetailCallbackListener } from 'projects/main/src/app/g24/lib/base/idetail-callback-listener';
import { JurnalInisiasiService } from 'projects/main/src/app/g24/services/keuangan/jurnal/stock/jurnal-inisiasi.service';
import { ServerDateTimeService } from 'projects/main/src/app/g24/services/system/server-date-time.service';
import { PaymentType } from 'projects/main/src/app/g24/lib/enums/payment-type';

/**
 * Penerimaan permata baru isi ke stock/product
 */
@Component({
  selector: 'detail-item-penerimaan-permata',
  templateUrl: './detail-item-penerimaan-permata.component.html',
  styleUrls: ['./detail-item-penerimaan-permata.component.scss']
})
export class DetailItemPenerimaanPermataComponent implements OnInit {

  constructor
  (
    private toastr : ToastrService,
    private session : SessionService,
    private jurnalInisiasi : JurnalInisiasiService,
    private dateService : ServerDateTimeService,

    private inisiasiService : InisiasiService,
    private productService : ProductService
  ) { }

  parentListener : IDetailCallbackListener;
  
  user : any = this.session.getUser();
  unit : any = this.session.getUnit();

  EPriviledge = EPriviledge;

  jeniss : any[] = [];

  errorHappened : boolean = false;

  date : string = "";
  time : string = "";

  batu_empty : boolean = false;
  berlian_empty : boolean = false;

  LoadAllParameter()
  {
    this.LoadDate();
  }
  
  async LoadDate()
  {
    this.date = "";
    this.time = "";
    let dt = await this.dateService.task("").toPromise();
    if(dt == false)
    {
      this.errorHappened = true;
      this.doReset();
      this.Close();
      this.toastr.info("Gagal mengambil tanggal server.");
      return;
    }
    let dtarr = dt.split("T");
    this.date = dtarr[0];
    this.time = dtarr[1].split("Z")[0];
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

  private title : string = "Detail Penerimaan Permata";
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
    if(id == null || id == "")
    {
      this.toastr.error("No ID is set.");
      this.Close();
      return;
    }

    this.inisiasiService.list("?_or=product-category.code=c03&no_po="+id).subscribe(async output => 
    {
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

        await this.onContentFound(output[0]);

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
    console.log(listener);
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
    this.errorHappened = false;
  }

  async Reload()
  {
    await this.LoadAllParameter();
    await this.LoadDate();
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
      "product-jenis" : null, "product-category" : null, "product-purity" : null, "product-gold-color" : null,
      berat : 0.00, baku_tukar : 0.0, ongkos : 0.0, unit : null,
      tipe_stock : "stock", vendor : null, flag : "stock", location : "",
      no_po : "", no_item_po : 0, no_index_products : 0,
      hpp_inisiasi : 0, hpp : 0
    }
  }

  mode : EPriviledge = EPriviledge.READ;
  setMode(mode : EPriviledge)
  {
    this.mode = mode;
  }

  async onContentFound(content : any)
  {
    this.inisiasi = content;
    let input = this.inisiasi;

    this.batu_empty = (input['jenis_batu'] != "" ) ||
      input['warna_batu'] != "" ||
      ((input['carat_batu'] != 0)) ||
      (input['dimensi_batu'] != "0x0x0");

    this.berlian_empty = input['warna_berlian'] != "" ||
      input['clarity_berlian'] != "" ||
      input['cutting_berlian'] != "" ||
      (input['total_butir_berlian'] != 0) ||
      (input['total_carat_berlian'] != 0);

    if(this.inisiasi.order_status == OrderStatus.TERIMA_FULL.code && this.mode == EPriviledge.UPDATE)
    {
      this.doReset();
      this.Close();
      this.toastr.show("PO sudah di Terima Full.", "Terima says");
      return;
    }
    this.LoadAllParameter();
    this.LoadDate();

    // this.fillItemsWithProducts();
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
    this.hitungGramTukar(productIndex, itemIndex);
  }

  hitungGramTukar(productIndex, itemIndex)
  {
    let item = this.inisiasi.items[itemIndex];
    let product = item.products[productIndex];

    let baku_tukar = Math.round(Number(product.baku_tukar));
    let berat = Math.round(Number(product.berat));

    let gram_tukar = Math.round(berat * baku_tukar) / 100;
    product['gram_tukar'] = gram_tukar;
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

  onAddProduct(itemsIndex)
  {
    let item = this.inisiasi.items[itemsIndex];

    let def = this.defaultProduct();
    def.sku = item['sku'];
    def['product-category'] = this.inisiasi['product-category'];
    def['vendor'] = this.inisiasi['vendor'];
    def["product-purity"] = item['product-purity'];
    def["product-gold-color"] = item['product-gold-color'];
    def['product-jenis'] = item['product-jenis'];
    def.baku_tukar = item['baku_tukar'] / 10.0;
    def.no_po = this.inisiasi['no_po'];
    def.ongkos = item['ongkos'];
    def.flag = FlagProduct.STOCK.code;
    def.tipe_stock = TipeStock.STOCK.code;
    def.location = LocationProduct.PUSAT.code;
    def.no_item_po = item.products.length;

    if(!item['products'])
    {
      let array = [];

      array.push(def);
      item['products'] = array;
    }
    else
    {
      let products : any[] = item['products'];
      if(products.length >= item.pieces)
      {
        this.toastr.warning("Jumlah barang pada bulk tersebut sudah sesuai pesanan");
        return;
      }

      products.push(def);
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
        def.sku = item['sku'];
        def['product-category'] = this.inisiasi['product-category'];
        def['vendor'] = this.inisiasi['vendor'];
        def["product-purity"] = item['product-purity'];
        def["product-gold-color"] = item['product-gold-color'];
        def['product-jenis'] = item['product-jenis'];
        def.baku_tukar = item['baku_tukar'] / 10.0;
        def.no_po = this.inisiasi['no_po'];
        def.ongkos = item['ongkos'];
        def.flag = FlagProduct.STOCK.code;
        def.tipe_stock = TipeStock.STOCK.code;
        def.location = LocationProduct.PUSAT.code;
        def.no_item_po = i;
        def.no_index_products = p;
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

  getTotalBeratOfItem(item)
  {
    let berat : number = 0.0;
    let products = item['products'];

    for(let i = 0; i < products.length; i++)
    {
      let pBerat : number = (isNaN(Number(products[i].berat)) ? 0 : Number(products[i].berat));
      berat += pBerat;
    }

    return Number(berat.toFixed(2));
  }

  beratStyleValid(item)
  {
    let products = item?.products;
    let len = products == null ? 0 : products.length
    let berat : number = 0.0;

    for(let i = 0; i < len; i++)
    {
      let pBerat : number = (isNaN(Number(products[i].berat)) ? 0 : Number(products[i].berat));

      berat += Number(pBerat);
    }
    
    if(berat == Number(item.berat)) return {};

    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
  }
  
  getTotalGramTukarOfItem(item)
  {
    let gram_tukar : number = 0.0;
    let products = item['products'];

    for(let i = 0; i < products.length; i++)
    {
      let pGramTukar : number = (isNaN(Number(products[i].gram_tukar)) ? 0 : Number(products[i].gram_tukar));

      gram_tukar += pGramTukar;
    }

    return Number(gram_tukar.toFixed(2));
  }

  gramTukarStyleValid(item)
  {
    let products = item?.products;
    let len = products == null ? 0 : products.length
    let value : number = 0.0;

    for(let i = 0; i < len; i++)
    {
      let pGramTukar : number = (isNaN(Number(products[i].gram_tukar)) ? 0 : Number(products[i].gram_tukar));

      value += Number(pGramTukar);
    }
    
    if(Number(value.toFixed(2)) == item.gram_tukar) return {};

    return {'text-decoration': 'underline','text-decoration-color': 'red', 'color' : 'red'};
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
      if(!this.validateBeratItem(item, i))
      {
        return false;
      }

      // if(!this.validateGramTukarItem(item, i))
      // {
      //   return false;
      // }

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

  async doSave()
  {
    if(this.mode == EPriviledge.READ)
    {
      this.toastr.info("Mode 'READ' only.");
      return;
    }

    // if(!this.validateItems())
    // {
    //   return;
    // }

    if(!this.validateInisiasi())
    {
      return;
    }

    this.inisiasi.order_status = OrderStatus.TERIMA_FULL.code;
    this.inisiasi.update_time = this.time;
    this.inisiasi.update_date = this.date;
    this.inisiasi.update_by = this.user;
    this.inisiasi['tgl_terima'] = this.inisiasi.update_date;
    this.inisiasi.terima_by = this.user;

    let product = {
      tipe_stock : TipeStock.STOCK.code,
      unit : this.user.unit,
      flag : FlagProduct.STOCK.code,

      create_by : this.user,
      create_date : this.date,
      create_time : this.time,

      'product-category' : this.inisiasi['product-category'],
      'vendor' : this.inisiasi.vendor,
      no_po : this.inisiasi.no_po,

      no_item_po : 0,
      no_index_products : 0, // dua ini bisa berubah jika inisiasi multiple, sekarang single

      'product-purity' : this.inisiasi['product-purity'],
      'product-jenis' : this.inisiasi['product-jenis'],
      'product-gold-color' : this.inisiasi['product-gold-color'],
      'hpp_inisiasi' : this.inisiasi.hpp_emas,
      'hpp_inisiasi_encoded' : "double",
      'hpp' : this.inisiasi.hpp_emas,
      'hpp_encoded' : "double",

      'product-clarity' : this.inisiasi['clarity_berlian'],
      'product-diamond-color' : this.inisiasi['warna_berlian'],
      'jumlah_butir' : this.inisiasi.total_butir_berlian,
      'product-carat' : this.inisiasi.total_carat_berlian,
      'product-cut' : this.inisiasi.cutting_berlian,
      'hpp_berlian_inisiasi' : this.inisiasi.hpp_berlian,
      'hpp_berlian_inisiasi_encoded' : "double",
      'hpp_berlian' : this.inisiasi.hpp_berlian,
      'hpp_berlian_encoded' : "double",

      'product-stone' : this.inisiasi.jenis_batu,
      'product-stone-color' : this.inisiasi.warna_batu,
      'product-stone-carat' : this.inisiasi.carat_batu,
      'product-stone-dimension' : this.inisiasi.dimensi_batu,
      'hpp_batu_inisiasi' : this.inisiasi.hpp_batu,
      'hpp_batu_inisiasi_encoded' : "double",
      'hpp_batu' : this.inisiasi.hpp_batu,
      'hpp_batu_encoded' : "double",
    }
    DataTypeUtil.Encode(product);
    let result = await this.productService.add(product).toPromise();
    if(result == false)
    {
      this.toastr.error("Gagal Menambah Stock. Harap proses ulang, jika error masih terjadi harap hubungi IT Helpdesk/Support.");
      return;
    } 
    // else {
    //   let product = itemProduct.get(fail.itemIndex + "," + fail.productIndex);
    //   Object.assign(product, result);
    //   itemProduct.set(fail.itemIndex + "," + fail.productIndex, result);
    //   console.log(result);
    // }

    this.inisiasi.product = result;

    console.log(this.inisiasi);
    let tempInisiasi : any = {};
    tempInisiasi.order_status = OrderStatus.TERIMA_FULL.code;
    tempInisiasi.update_time = this.time;
    tempInisiasi.update_date = this.date;
    tempInisiasi.update_by = this.user;
    tempInisiasi['tgl_terima'] = this.date;
    tempInisiasi.terima_by = this.user;
    tempInisiasi.no_po = this.inisiasi.no_po;
    tempInisiasi._id = this.inisiasi._id;
    tempInisiasi.product = this.inisiasi.product;
    tempInisiasi._log = "1";
    // Object.assign(tempInisiasi, this.inisiasi);
    DataTypeUtil.Encode(tempInisiasi);

    let inisiasi = await this.inisiasiService.TerimaPermata(tempInisiasi).toPromise();
    if(inisiasi == false)
    {
      this.toastr.error("Update PO gagal. Harap hubungi IT Support/Helpdesk.");
      return;
    } else {
      Object.assign(this.inisiasi, tempInisiasi);
      await this.doAccounting(inisiasi._id);
      console.log(this.inisiasi);
      this.parentListener.onAfterUpdate(this.inisiasi._id);
      this.toastr.success("PO berhasil diterima.");
      this.doReset();
      this.Close();
    }

    // HERE BATCH_ADD
    // let counter : number = this.inisiasi.total_piece;
    // let enc = {batch_counter : counter};
    // for(let i = 0; i < counter; i++)
    // {
    //   delete productNoId[i]._id;
    //   enc[i+1] = productNoId[i];
    // }

    // DataTypeUtil.Encode(enc);
    // console.log('enc', enc);

    // let result = await this.productService.batchAdd(enc).toPromise();
    // console.log(result);
    
    // for(let i = 0; i < result.length; i++)
    // {
    //   let product = result[i];
      
    // }
  }

  async doAccounting(idInisiasi :string)
  {
    await this.jurnalInisiasi.terima(idInisiasi).subscribe(output => {
      if(output == false)
      {
        let msg = this.jurnalInisiasi.message();
        this.toastr.error("Inisiasi gagal. Harap hubungi IT Support/Helpdesk. Reason: " + msg);
        // console.log()
        return;
      } else {
        this.toastr.success("Jurnal berhasil.")
        return;
      }
    });
  }
}
