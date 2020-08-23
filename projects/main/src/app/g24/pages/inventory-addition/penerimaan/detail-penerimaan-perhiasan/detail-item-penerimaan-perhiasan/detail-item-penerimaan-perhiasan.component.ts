import { Component, OnInit } from '@angular/core';
import { InisiasiService } from 'projects/main/src/app/g24/services/stock/inisiasi.service';
import { ProductPurityService } from 'projects/main/src/app/g24/services/product/product-purity.service';
import { ProductJenisService } from 'projects/main/src/app/g24/services/product/product-jenis.service';
import { ProductGoldColorService } from 'projects/main/src/app/g24/services/product/product-gold-color.service';
import { ToastrService } from 'ngx-toastr';
import { FlagProduct, TipeStock, LocationProduct } from 'projects/main/src/app/g24/lib/enum/flag-product';
import { VendorService } from 'projects/main/src/app/g24/services/vendor.service';
import { EPriviledge } from 'projects/main/src/app/g24/lib/enums/epriviledge.enum';

@Component({
  selector: 'detail-item-penerimaan-perhiasan',
  templateUrl: './detail-item-penerimaan-perhiasan.component.html',
  styleUrls: ['./detail-item-penerimaan-perhiasan.component.scss']
})
export class DetailItemPenerimaanPerhiasanComponent implements OnInit {

  constructor
  (
    private toastr : ToastrService,

    private inisiasiService : InisiasiService,
    private kadarService : ProductPurityService,
    private jenisService : ProductJenisService,
    private goldColorService : ProductGoldColorService
  ) { }

  EPriviledge = EPriviledge;

  jeniss : any[] = [];

  LoadAllParameter()
  {
    this.LoadJenis();
  }

  async LoadJenis()
  {
    this.jeniss = [];
    let jeniss = await this.jenisService.list("?product-category.code=c00").toPromise();
    if(jeniss)
    {
      if(jeniss.length <= 0)
      {
        this.toastr.error("Gagal loading Parameter Jenis. Harap coba proses lagi. Apabila kegagalan terjadi lagi, harap hubungi IT Support/Helpdesk", "Load Jenis Failed");
        this.doReset();
        this.Close();
        return;
      }

      this.toastr.success("Parameter 'Jenis Perhiasan' loaded...");
      this.jeniss.push(...jeniss);
      this.jeniss.sort((a, b) => ('' + a.name).localeCompare(b.name));
    } else {
      this.toastr.error("Gagal loading Parameter Jenis. Harap coba proses lagi. Apabila kegagalan terjadi lagi, harap hubungi IT Support/Helpdesk", "Load Jenis Failed")
      this.doReset();
      this.Close();
      return;
    }
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

  private title : string = "Detail Penerimaan Perhiasan";
  public get Title()
  {
    return this.title;
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

    this.inisiasiService.list("?product-category.code=c00&no_po="+id).subscribe(output => 
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
      berat : 0.00, baku_tukar : 0.0, ongkos : 0.0,
      tipe_stock : "stock", vendor : null, flag : "stock", location : "",
      no_po : "", no_item_po : 0,
      hpp_inisiasi : 0, hpp : 0

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
    this.LoadAllParameter();

    this.fillItemsWithProducts();
  }

  ts;
  onExpand(index)
  {
    this.toastr.info(index);
    this.ts = index
  }

  onBeratChanged(productIndex, itemsOfIndex)
  {
    console.log("pd", productIndex, "it", itemsOfIndex);
    console.log("berat", this.inisiasi.items[itemsOfIndex].products[productIndex].berat)
  }

  onGramTukarChanged(productIndex, itemsIndex)
  {
    console.log("gt", this.inisiasi.items[itemsIndex].products[productIndex]['gram_tukar']);
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
        def.baku_tukar = item['baku_tukar'] / 10.0;
        def.no_po = this.inisiasi['no_po'];
        def.ongkos = item['ongkos'];
        def.flag = FlagProduct.STOCK.code;
        def.tipe_stock = TipeStock.STOCK.code;
        def.location = LocationProduct.PUSAT.code;
        def.no_item_po = p;

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

    return berat;
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

    return gram_tukar;
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
    
    if(value == item.gram_tukar) return {};

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

  validateItems()
  {

  }

  doSave()
  {
    if(this.mode == EPriviledge.READ)
    {
      this.toastr.info("Mode 'READ' only.");
      return;
    }

    if(!validateItems())
    {
      return;
    }

    if(!validateInisiasi())
    {
      return;
    }

    this.inisiasi.order_status
  }
}
